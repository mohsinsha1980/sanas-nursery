"use client";
import AddNew from "@/components/admin/action-buttons/add-new";
import TestimonialsList from "@/components/admin/testimonials/testimonials-list";
import { useRouter } from "next/navigation";

export default function TestimonialsPage() {
  const router = useRouter();
  return (
    <>
      <div className="h-fit w-full lg:space-y-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
          <h1 className="text-3xl font-bold text-gray-900 !px-0">
            Testimonials
          </h1>
          <AddNew
            label="Testimonial"
            onClick={() => router.push("/admin/testimonials/add")}
          />
        </div>

        <div>
          <TestimonialsList />
        </div>
      </div>
    </>
  );
}
