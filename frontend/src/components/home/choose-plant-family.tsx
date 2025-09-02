import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Indoor Plants",
    image: "/site/home/categories/accessories.webp",
    slug: "indoor-plants",
  },
  {
    title: "Outdoor Plants",
    image: "/site/home/categories/gift.webp",
    slug: "outdoor-plants",
  },
  {
    title: "Office Desk Plants",
    image: "/site/home/categories/indoor.webp",
    slug: "office-desk-plants",
  },
  {
    title: "Pots & Accessories",
    image: "/site/home/categories/outdoor.webp",
    slug: "pots-accessories",
  },
  {
    title: "Gift Plants & Combos",
    image: "/site/home/categories/office.webp",
    slug: "gift-plants-combos",
  },
  {
    title: "Succulents",
    image: "/site/home/categories/office.webp",
    slug: "succulents",
  },
];

export default function ChoosePlantFamily() {
  return (
    <section className="w-full bg-white flex justify-center items-center py-12 px-4 md:px-8">
      {/* Inner Container */}
      <div className="w-full max-w-[1370px] flex flex-col items-center">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-center">
          Choose Your <span style={{ color: "rgba(0,97,31,1)" }}>Plant</span>{" "}
          Family
        </h2>

        <p className="text-gray-600 text-sm md:text-base mb-8 text-center max-w-2xl">
          Select from handpicked categories that suit your style and needs
        </p>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {categories.map((cat, index) => (
            <Link href={`/category/${cat.slug}`} key={index}>
              <article className="flex flex-col items-center cursor-pointer">
                {/* Circle Image (responsive) */}
                <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[204px] lg:h-[204px] rounded-full overflow-hidden border-2 border-gray-200 hover:shadow-lg transition">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Title */}
                <h3
                  className="mt-4 text-sm sm:text-base lg:text-lg font-semibold text-center"
                  style={{ color: "rgba(0,97,31,1)" }}
                >
                  {cat.title}
                </h3>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
