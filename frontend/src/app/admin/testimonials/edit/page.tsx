import EditTestimonialForm from "@/components/admin/testimonials/edit-testimonial";
import Loading from "@/components/layout/Loading";
import { Suspense } from "react";

export default async function EditTestimonialPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const testimonial = (await searchParams).testimonial;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <EditTestimonialForm testimonialId={testimonial as string} />
      </Suspense>
    </>
  );
}
