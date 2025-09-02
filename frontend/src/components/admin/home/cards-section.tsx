import { defultHomeCardsData, HOME_FIELDS } from "@/lib/constants";
import { HomeCardsTypes } from "@/lib/types/common-types";
import CardsForm from "./cards-form";

export default function CardsSection({ data }: { data?: HomeCardsTypes }) {
  return (
    <>
      <h2>Bottom section</h2>
      <div className="bl_home_bottom flex gap-4 ml-20 mr-20">
        <CardsForm
          field={HOME_FIELDS.CARDS.C1}
          data={data?.C1}
          defaultData={defultHomeCardsData.C1}
        />
        <CardsForm
          field={HOME_FIELDS.CARDS.C2}
          data={data?.C2}
          defaultData={defultHomeCardsData.C2}
        />
      </div>
    </>
  );
}
