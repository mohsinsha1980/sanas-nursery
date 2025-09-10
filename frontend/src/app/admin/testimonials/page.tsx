"use client";
import TestimonialsList from "@/components/admin/testimonials/testimonials-list";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TestimonialsPage() {
  const router = useRouter();
  return (
    <>
      <div className="h-fit w-full lg:space-y-5  ">
        <div className="flex flex-row">
          <div className="basis-3/4  ">
            <h1 className="">Testimonials</h1>
          </div>
          <div className="basis-1/4 text-right  ">
            <Button
              type="button"
              variant="orange"
              size="lg"
              onClick={() => router.push("/admin/testimonials/add")}
            >
              <CirclePlusIcon /> Add New Testimonial
            </Button>
          </div>
        </div>
        <div className="">
          <TestimonialsList />
        </div>
      </div>
    </>
  );
}
