import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFaqAccrItems } from "@/lib/helper";
import { PlantDataType } from "@/lib/types/common-types";
import { ProductAccordion } from "../common/accordion";

export default function PlantDescTabs({ plant }: { plant: PlantDataType }) {
  return (
    <Tabs
      defaultValue="description"
      className="w-full mx-auto p-5 rounded-lg bg-green-50"
    >
      {/* Tabs List */}
      <TabsList className="flex w-full justify-start gap-4 lg:mb-0 mb-5">
        <TabsTrigger
          value="description"
          className="px-4 py-2 text-[18px] font-medium text-gray-800 data-[state=active]:bg-[#F37521] data-[state=active]:text-white hover:bg-orange-100 transition"
        >
          Description
        </TabsTrigger>

        {plant.faqs?.length ? (
          <TabsTrigger
            value="faqs"
            className="px-4 py-2 text-[18px] font-medium text-gray-800 data-[state=active]:bg-[#F37521] data-[state=active]:text-white hover:bg-orange-100 transition"
          >
            FAQs
          </TabsTrigger>
        ) : null}
      </TabsList>

      {/* Description Tab */}
      <TabsContent
        value="description"
        className=" text-[18px] font-semibold text-gray-800 leading-relaxed"
      >
        <div
          dangerouslySetInnerHTML={{ __html: plant.description }}
          className="prose max-w-none"
        />
      </TabsContent>

      {/* FAQs Tab */}
      {plant.faqs?.length ? (
        <TabsContent value="faqs" className="p-6">
          <ProductAccordion
            items={getFaqAccrItems(plant.faqs)}
            className="mt-2"
          />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
