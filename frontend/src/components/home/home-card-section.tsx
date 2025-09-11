import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HomeCard, HomeCards } from "@/lib/types/public-types";
import { getPicURL } from "@/lib/helper";
import Link from "next/link";
import { defultHomeData } from "@/lib/constants";

interface HomeCardsSectionProps {
  cards: HomeCards;
}

export default function HomeCardsSection({ cards }: HomeCardsSectionProps) {
  const cardEntries: HomeCard[] = [];

  if (cards.C1) {
    const card = cards.C1;
    card.picture = getPicURL(cards.C1.picture);
    cardEntries.push(card);
  } else {
    cardEntries.push(defultHomeData.Cards.C1);
  }

  if (cards.C2) {
    const card = cards.C2;
    card.picture = getPicURL(cards.C2.picture);
    cardEntries.push(card);
  } else {
    cardEntries.push(defultHomeData.Cards.C2);
  }

  if (cardEntries.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-full flex items-center justify-center lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 bg-[rgba(228,255,240,1)]">
      <div className="max-w-[1200px] w-full h-full flex flex-col md:flex-col lg:flex-row justify-between items-center gap-15 md:px-10">
        {cardEntries?.map((card, i) => {
          console.log(card);
          return (
            <div
              className="relative lg:w-full lg:h-[400px] md:w-[80%] md:h-[472px] h-[350px] w-[92%] rounded-2xl overflow-hidden group "
              key={card.large + i}
            >
              <Image
                src={card.picture}
                alt={card.large}
                fill
                priority
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div
                className="absolute bottom-0 left-0 w-full bg-transparent group-hover:bg-[rgba(255,255,255,0.5)] transition-all duration-400 ease-in-out text-white group-hover:text-black flex flex-col items-start justify-center text-left p-4 md:p-10"
                style={{ height: "230px" }}
              >
                <h2
                  className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-3 sm:mb-3"
                  style={{ color: card.largeColor }}
                >
                  {card.large}
                </h2>
                <p
                  className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed mb-4 sm:mb-3"
                  style={{ color: card.smallColor }}
                >
                  {card.small}
                </p>

                <Link href={card.link.address}>
                  <Button
                    variant="outline"
                    size="lg"
                    style={{
                      color: card.link.color,
                      borderColor: card.link.color,
                    }}
                  >
                    {card.link.label}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
