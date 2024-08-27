import "./App.css";
import { useState } from "react";
import event1 from "./Admin/Events/event1.jpg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperAdmin from "./Super Admin/SuperAdmin";
import SuperAdminLogin from "./Super Admin/Login/SuperAdminLogin";
import SuperAdminMain from "./Super Admin/Super Admin Main/SuperAdminMain";
import SuperAdminDashboard from "./Super Admin/Dashboard/SuperAdminDashboard";
import Restaurant from "./Super Admin/Restaurants/Restaurants";
import SuperAdminEvent from "./Super Admin/Event/SuperAdminEvent";
import SuperAdminOffers from "./Super Admin/Offers/SuperAdminOffers";
import SuperAdminReports from "./Super Admin/Reports/SuperAdminReports";
import Admin from "./Admin/Admin";
import AdminLogin from "./Admin/Login/AdminLogin";
import AdminMain from "./Admin/Admin Main/AdminMain";
import AdminDashboard from "./Admin/Dashboard/AdminDashboard";
import AdminAppearance from "./Admin/Appearance/AdminAppearance";
import AdminAnalytics from "./Admin/Analytics/AdminAnalytics";
import AdminInfluencer from "./Admin/Influencer Marketing/AdminInfluencer";
import AdminOffers from "./Admin/Offers/AdminOffers";
import CaptainSettings from "./Admin/Captain Settings/CaptainSettings";
import AdminReviews from "./Admin/Reviews/AdminReviews";
import AdminOutletSettings from "./Admin/Outlet Settings/AdminOutletSettings";
import AdminEvent from "./Admin/Events/AdminEvent";
import AdminEventMain from "./Admin/Events/AdminEventMain";
import AdminCreateEvent from "./Admin/Events/AdminCreateEvent";
import AdminTicket from "./Admin/Events/AdminTicket";
import AdminDescription from "./Admin/Events/AdminDescription";
import AdminMainEvent from "./Admin/Events/AdminMainEvent";
import VisitorChart from "./Visitor/VisitorChart";
import VisitorForm from "./Visitor/VisitorForm";
import MenuManager from "./Super Admin/Menu/MenuManager";
import CategoryManager from "./Super Admin/Menu/CategoryManager";
import SubCategoryManager from "./Super Admin/Menu/SubCategoryManager";
import Visitor_main from "./Visitor/VisitorMain/Visitor_main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<Visitor_main />} />
          <Route path="/food" element={<VisitorForm />} />
          {/* Waiter Routes */}
          <Route path="/waiter" element={<div>Waiter Page</div>} />
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<AdminLogin />} />
            <Route path="main" element={<AdminMain />}>
              <Route path="" element={<AdminDashboard />} />
              <Route path="appearance" element={<AdminAppearance />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route
                path="influencer-marketing"
                element={<AdminInfluencer />}
              />
              <Route path="promotions" element={<AdminOffers />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="captain-settings" element={<CaptainSettings />} />
              <Route path="outlet-settings" element={<AdminOutletSettings />} />
              <Route path="manage-events/:pageId" element={<AdminMainEvent />}>
                {/* <Route path="" element={<AdminEvent />} /> */}
                {/* <Route path="create-event" element={<AdminCreateEvent />} />
                <Route
                  path="tickets"
                  element={<AdminTicket setEventDetails={setEventDetails} />}
                />
                <Route
                  path="description"
                  element={
                    <AdminDescription
                      eventDetails={eventDetails}
                      setEventDetails={setEventDetails}
                    />
                  }
                />
                <Route path="review" element={<AdminDashboard />} /> */}
              </Route>
            </Route>
          </Route>
          {/* Super Admin Routes */}
          <Route path="/super-admin" element={<SuperAdmin />}>
            <Route path="" element={<SuperAdminLogin />} />
            <Route path="main" element={<SuperAdminMain />}>
              <Route path="" element={<SuperAdminDashboard />} />
              <Route path="restaurants" element={<Restaurant />} />
              <Route path="reports" element={<SuperAdminReports />} />
              <Route path="events" element={<SuperAdminEvent />} />
              <Route path="offers" element={<SuperAdminOffers />} />
              <Route path="menu" element={<MenuManager />} />
              <Route path="categories" element={<CategoryManager />} />
              <Route path="subcategories" element={<SubCategoryManager />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
