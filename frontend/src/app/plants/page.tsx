"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/plants/fruit-trees");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen   "  >
      <div className="text-center    ">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to collections...</p>
      </div>
    </div>
  );
}
