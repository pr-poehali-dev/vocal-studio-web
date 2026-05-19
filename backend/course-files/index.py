import os
import json
import boto3

def handler(event: dict, context) -> dict:
    """Возвращает список файлов курса 'Фонический резонанс' из S3 хранилища."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    prefix = "courses/phonic-resonance/"
    response = s3.list_objects_v2(Bucket='files', Prefix=prefix)
    contents = response.get("Contents", [])

    files = []
    for obj in contents:
        key = obj["Key"]
        name = key.replace(prefix, "")
        if not name:
            continue
        ext = name.rsplit(".", 1)[-1].lower() if "." in name else ""
        file_type = "audio" if ext in ["mp3", "wav", "m4a", "ogg", "flac"] else "pdf" if ext == "pdf" else "other"
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
        files.append({
            "name": name,
            "url": cdn_url,
            "type": file_type,
            "size": obj.get("Size", 0)
        })

    files.sort(key=lambda x: (x["type"] != "pdf", x["name"]))

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({"files": files, "total": len(files)})
    }
