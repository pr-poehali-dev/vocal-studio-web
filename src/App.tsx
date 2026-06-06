
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CoursePage from "./pages/CoursePage";
import CourseDownloadPage from "./pages/CourseDownloadPage";
import BookPage from "./pages/BookPage";
import BearCoursePage from "./pages/BearCoursePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/course/phonic-resonance" element={<CoursePage />} />
          <Route path="/course/phonic-resonance/download" element={<CourseDownloadPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/course/bear-ear" element={<BearCoursePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;