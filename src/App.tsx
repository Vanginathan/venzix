// src/App.tsx
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "./pages/Index";
import { cities, cityPath } from "./pages/cities/cityData";
import { costPages, COST_HUB_PATH } from "./pages/costPages/costPageData";

const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChennaiLanding = lazy(() => import("./pages/ChennaiLanding"));
const CityLanding = lazy(() => import("./pages/CityLanding"));
const CostGuide = lazy(() => import("./pages/CostGuide"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" richColors />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* SEO landing pages */}
              <Route path="/web-designer-chennai" element={<ChennaiLanding />} />
              {cities.map((c) => (
                <Route key={c.slug} path={cityPath(c.slug)} element={<CityLanding slug={c.slug} />} />
              ))}
              <Route path={COST_HUB_PATH} element={<CostGuide />} />
              {costPages.map((p) => (
                <Route key={p.slug} path={`/${p.slug}`} element={<CostGuide slug={p.slug} />} />
              ))}
              <Route path="/case-studies/:slug" element={<CaseStudy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />

              {/* App */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Navigate to="/auth" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
