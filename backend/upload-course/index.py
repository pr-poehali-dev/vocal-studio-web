import os
import json
import boto3
import requests

def handler(event: dict, context) -> dict:
    """Скачивает файлы курса с Яндекс.Диска и сохраняет в S3 хранилище сайта."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    YANDEX_FOLDER_KEY = "nclBNapgpIok6A"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    api_url = f"https://cloud-api.yandex.net/v1/disk/public/resources?public_key=https://disk.yandex.ru/d/{YANDEX_FOLDER_KEY}&limit=100"
    resp = requests.get(api_url)
    data = resp.json()

    items = data.get("_embedded", {}).get("items", [])
    uploaded = []
    errors = []

    for item in items:
        name = item.get("name", "")
        item_type = item.get("type", "")
        if item_type != "file":
            continue

        dl_resp = requests.get(
            "https://cloud-api.yandex.net/v1/disk/public/resources/download",
            params={"public_key": f"https://disk.yandex.ru/d/{YANDEX_FOLDER_KEY}", "path": f"/{name}"}
        )
        dl_data = dl_resp.json()
        download_url = dl_data.get("href")

        if not download_url:
            errors.append({"file": name, "error": "no download url"})
            continue

        file_resp = requests.get(download_url, stream=True)
        file_bytes = file_resp.content

        ext = name.rsplit(".", 1)[-1].lower() if "." in name else ""
        content_type_map = {
            "pdf": "application/pdf",
            "mp3": "audio/mpeg",
            "wav": "audio/wav",
            "m4a": "audio/mp4",
            "ogg": "audio/ogg",
            "flac": "audio/flac",
        }
        content_type = content_type_map.get(ext, "application/octet-stream")

        key = f"courses/phonic-resonance/{name}"
        s3.put_object(
            Bucket='files',
            Key=key,
            Body=file_bytes,
            ContentType=content_type
        )

        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
        uploaded.append({"name": name, "url": cdn_url, "type": content_type})

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({"uploaded": uploaded, "errors": errors, "total": len(uploaded)})
    }
