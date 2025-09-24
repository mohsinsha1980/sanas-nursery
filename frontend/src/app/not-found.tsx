import { Button } from "@/components/ui/button";
import { HomeIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-orange-50 px-4 sm:px-6 lg:px-8"
      style={{ paddingTop: "var(--header-height)" }}
    >
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-orange-500 mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            The page you&apos;re looking for seems to have grown away like a
            plant in the wind.
          </p>
          <p className="text-gray-500">
            Don&apos;t worry, even the best gardeners sometimes lose their way!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/">
            <Button
              variant="orange"
              size="lg"
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <HomeIcon className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Link href="/plants">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto flex items-center gap-2 border-green-500 text-green-600 hover:bg-green-50"
            >
              <SearchIcon className="w-5 h-5" />
              Browse Plants
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
