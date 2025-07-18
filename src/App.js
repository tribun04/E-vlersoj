// App.js

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // <-- BrowserRouter is removed from here
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useContext } from 'react';

// --- CONTEXT IMPORTS ---
import { AuthProvider, default as AuthContext } from './context/AuthContext';

// --- LAYOUT & COMPONENT IMPORTS ---
import MainLayout from './components/MainLayout';
// Importo layout-in dhe faqet
import TermsOfService from "./pages/TermsOfService"
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import LegacyProgram from './pages/LegacyProgram';
import RefundPolicy from './pages/RefundPolicy';
import FAQ from './pages/Faq';
import BrandIdentity from './pages/BrandIdentity';

import CompanyDashboard from './components/CompanyDashboard';

// --- PAGE IMPORTS ---
import ComingSoon from "./pages/ComingSoon"

import Home from './pages/Home';
import Login from './pages/Login';
import HowReviewsWorkPage from './pages/HowReviewsWork';
import Features from "./pages/Features"
import Register from './pages/Register';
import CompaniesPage from './pages/CompaniesPage';
import CompanyDetail from './pages/CompanyDetail';
import CompanyRegister from './pages/CompanyRegister';
import MyReviews from "./pages/MyReviews";
import HelpCenter from './pages/Helpcenter';
import Pricing from "./pages/pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BlogListPage from "./pages/Blog";
import BlogPostDetailPage from './pages/Blogdetails';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Settings from "./pages/SettingsPage"

// --- ADMIN IMPORTS ---
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageCompanies from './pages/Admin/ManageCompanies';
import ManageReviews from './pages/Admin/ManageReviews';
import AddBlogPost from './pages/Admin/AddBlogPost';
import Message from "./pages/Admin/Message";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Route 1: The "Coming Soon" page. It stands alone and does NOT use MainLayout. */}
      <Route path="/" element={<ComingSoon />} />

      {/* Route 2: A layout route. All nested routes will render inside MainLayout's <Outlet> */}
      <Route element={<MainLayout />}>
        {/* General Pages */}
        <Route path="/home-1" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/HelpCenter" element={<HelpCenter />} />
        <Route path="/features" element={<Features />} />

        {/* Authentication Pages */}
        <Route path="/login" element={user ? <Navigate to="/home-1" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/home-1" replace /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Company & Review Pages */}
        <Route path="/CompaniesPage" element={<CompaniesPage />} />
        <Route path="/companies/:id" element={<CompanyDetail />} />
        <Route path="/company/:id" element={<CompanyDashboard />} />
        <Route path="/CompanyRegister" element={<CompanyRegister />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/how-reviews-work" element={<HowReviewsWorkPage />} />
        <Route path="/settings" element={<Settings />} />

        {/* Kjo ridrejton nga /legal te faqja e parë, /legal/terms */}
        <Route path="terms" element={<TermsOfService />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="cookies" element={<CookiePolicy />} />
        <Route path="legacy" element={<LegacyProgram />} />
        <Route path="refund" element={<RefundPolicy />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="brand" element={<BrandIdentity />} />



        {/* Blog Pages */}
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostDetailPage />} />

        {/* Admin Section */}
        <Route path="/admin" element={<PrivateRoute adminOnly><AdminLayout /></PrivateRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-blog" element={<AddBlogPost />} />
          <Route path="message" element={<Message />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="companies" element={<ManageCompanies />} />
          <Route path="reviews" element={<ManageReviews />} />
        </Route>
      </Route>
    </Routes>
  );
};


function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        {/*
          THE FIX: <BrowserRouter> is removed from here.
          It should be in your src/index.js file wrapping the <App /> component.
        */}
        <AppRoutes />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;