import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="text-green-600">Sana&apos;s Nursery</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the perfect plants for your home and garden. We offer a
            wide variety of healthy, beautiful plants to bring nature into your
            space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/plants">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                Shop Plants
              </Button>
            </Link>
            <Link href="/blogs">
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
              >
                Read Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
