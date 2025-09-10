"use client";
import PendingOrderEnquiries from "@/components/admin/order-enquiries/pending";
import ResolvedOrderEnquiries from "@/components/admin/order-enquiries/resolved";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle } from "lucide-react";

export default function OrderEnquiriesPage() {
  return (
    <>
      <div className="h-fit w-full lg:space-y-6">
        <div className="flex flex-row">
          <div className="basis-3/4">
            <h1 className="text-3xl font-bold text-gray-900">
              Order Enquiries
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track customer order enquiries
            </p>
          </div>
        </div>
        <div className="">
          <Tabs defaultValue="incomplete">
            <TabsList className="inline-flex bg-gray-100 p-1 rounded-lg shadow-sm">
              <TabsTrigger
                value="incomplete"
                className="flex items-center space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 font-semibold px-4 py-2"
              >
                <Clock className="w-5 h-5" />
                <span>Incomplete</span>
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 font-semibold px-4 py-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Completed</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="incomplete" className="mt-6">
              <PendingOrderEnquiries />
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              <ResolvedOrderEnquiries />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
