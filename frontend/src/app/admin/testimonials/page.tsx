"use client";
import TestimonialsList from "@/components/admin/testimonials/testimonials-list";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TestimonialsPage() {
  const router = useRouter();
  return (
    <>
      <div className="h-fit w-full lg:space-y-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
          <h1>Testimonials</h1>
          <Button
            type="button"
            variant="orange"
            size="sm"
            onClick={() => router.push("/admin/testimonials/add")}
          >
            <CirclePlusIcon /> Add New Testimonial
          </Button>
        </div>

        <div>
          <TestimonialsList />
        </div>
      </div>
    </>
  );
}
