import { defultHomeData, HOME_FIELDS } from "@/lib/constants";
import { HomeCardsTypes } from "@/lib/types/common-types";
import CardsForm from "./cards-form";

export default function CardsSection({ data }: { data?: HomeCardsTypes }) {
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-[1000px] h-[400px] flex items-center justify-center ">
          <div className="w-full flex flex-col md:flex-row gap-6 ">
            <CardsForm
              field={HOME_FIELDS.CARDS.C1}
              data={data?.C1}
              defaultData={defultHomeData.Cards.C1}
              className="h-100"
            />
            <CardsForm
              field={HOME_FIELDS.CARDS.C2}
              data={data?.C2}
              defaultData={defultHomeData.Cards.C2}
            />
          </div>
        </div>
      </div>
    </>
  );
}
