import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TextAnalysis from './pages/text-analysis';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import SentimentVisualizationDashboard from './pages/sentiment-visualization-dashboard';
import Reports from './pages/reports';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/text-analysis" element={<TextAnalysis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sentiment-visualization-dashboard" element={<SentimentVisualizationDashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
