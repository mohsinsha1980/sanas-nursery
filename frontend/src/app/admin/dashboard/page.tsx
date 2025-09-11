"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { getErrorMessage, showErrorToast } from "@/lib/helper";
import { AxiosError } from "axios";
import { getDashboardStats } from "@/lib/api-routes/api-admin";
import { DashboardStats } from "@/lib/types/admin-types";
import { ShoppingCartIcon, MessageSquareIcon } from "lucide-react";
import DashboardHeader from "@/components/admin/dashboard/dashboard-header";
import EnquiryStatsSection from "@/components/admin/dashboard/enquiry-stats-section";
import QuickActionsSection from "@/components/admin/dashboard/quick-actions-section";
import LoadingSpinner from "@/components/layout/loading-spinner";

const defaultData: DashboardStats = {
  orderEnquiries: {
    total: 0,
    pending: 0,
    contacted: 0,
    resolved: 0,
    closed: 0,
  },
  contactEnquiries: {
    total: 0,
    pending: 0,
    contacted: 0,
    resolved: 0,
    closed: 0,
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState<DashboardStats>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchDashboardData = async () => {
      try {
        dispatch(showLoader());
        setLoading(true);
        const response = await getDashboardStats(controller);
        setStats(response.data.data);
      } catch (error) {
        showErrorToast(getErrorMessage(error as AxiosError));
      } finally {
        setLoading(false);
        dispatch(hideLoader());
      }
    };

    fetchDashboardData();
    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <EnquiryStatsSection
        title="Order Enquiries"
        icon={ShoppingCartIcon}
        stats={stats?.orderEnquiries || defaultData.orderEnquiries}
        baseLink="/admin/order-enquiries"
      />

      <EnquiryStatsSection
        title="Contact Enquiries"
        icon={MessageSquareIcon}
        stats={stats?.contactEnquiries || defaultData.contactEnquiries}
        baseLink="/admin/contact-enquiries"
      />

      <QuickActionsSection />
    </div>
  );
};

export default Dashboard;
