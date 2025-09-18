import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFaqAccrItems } from "@/lib/helper";
import { PlantDataType } from "@/lib/types/common-types";
import { ProductAccordion } from "../common/accordion";

export default function PlantDescTabs({ plant }: { plant: PlantDataType }) {
  return (
    <>
      <Tabs defaultValue="description" className="tabs_plain">
        <TabsList>
          <TabsTrigger
            value="description"
            className="font-semibold mx-2 md:m-0"
          >
            Description
          </TabsTrigger>
          {plant.faqs?.length ? (
            <TabsTrigger value="faqs" className="font-semibold">
              FAQs
            </TabsTrigger>
          ) : null}
        </TabsList>

        <TabsContent
          value="description"
          className="m-2 md:m-0 !py-4 !pr-4 !pl-6 md:!p-4 md:!pl-6"
        >
          <div
            className="prose max-w-none text-gray-700 text-base md:text-lg leading-relaxed font-normal"
            dangerouslySetInnerHTML={{ __html: plant.description }}
          />
        </TabsContent>

        {plant.faqs?.length ? (
          <TabsContent value="faqs" className="m-2 md:m-0 !p-2 md:!p-4">
            <ProductAccordion
              items={getFaqAccrItems(plant.faqs)}
              className="mt-2"
              itemClassName="shadow-none border border-gray-200 rounded-md"
              triggerClassName="py-3"
              contentClassName="rounded-b-md"
            />
          </TabsContent>
        ) : null}
      </Tabs>
    </>
  );
}
