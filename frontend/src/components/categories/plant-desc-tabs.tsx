import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFaqAccrItems } from "@/lib/helper";
import { PlantDataType } from "@/lib/types/common-types";
import { ProductAccordion } from "../common/accordion";

export default function PlantDescTabs({ plant }: { plant: PlantDataType }) {
  return (
    <Tabs defaultValue="description" className="tabs_plain">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        {plant.faqs?.length ? (
          <TabsTrigger value="faqs">FAQS</TabsTrigger>
        ) : null}
      </TabsList>

      <TabsContent value="description">
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: plant.description }}
        />
      </TabsContent>

      {plant.faqs?.length ? (
        <TabsContent value="faqs">
          <div className="col-span-4">
            <ProductAccordion
              items={getFaqAccrItems(plant.faqs)}
              className="mt-4"
            />
          </div>
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
