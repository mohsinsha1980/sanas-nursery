"use client";
import PendingContactEnquiries from "@/components/admin/contact-enquiries/pending";
import ResolvedContactEnquiries from "@/components/admin/contact-enquiries/resolved";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle } from "lucide-react";

export default function ContactEnquiriesPage() {
  return (
    <>
      <div className="h-fit w-full lg:space-y-6">
        <div className="flex flex-row pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 !px-2">
              Contact Enquiries
            </h1>
            <p className="text-gray-600 mt-2 px-2">
              Manage and track customer contact enquiries
            </p>
          </div>
        </div>

        <div>
          <Tabs defaultValue="incomplete">
            <TabsList className="inline-flex bg-gray-100 !p-0 rounded-lg shadow-sm w-full sm:w-auto">
              <TabsTrigger
                value="incomplete"
                className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 font-semibold px-3 md:px-4 py-2 flex-1 sm:flex-none"
              >
                <Clock className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Incomplete</span>
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 font-semibold px-3 md:px-4 py-2 flex-1 sm:flex-none"
              >
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Completed</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="incomplete"
              className="mt-4 md:mt-6 md:!p-0 md:!pt-2"
            >
              <PendingContactEnquiries />
            </TabsContent>
            <TabsContent
              value="completed"
              className="mt-4 md:mt-6 md:!p-0 md:!pt-2"
            >
              <ResolvedContactEnquiries />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
