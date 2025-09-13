import EditBlogForm from "@/components/admin/blogs/edit-blog";
import Loading from "@/components/layout/Loading";
import { Suspense } from "react";

export default async function EditBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const blog = (await searchParams).blog;

  return (
    <>
      <Suspense fallback={<Loading />}>

        <EditBlogForm blogId={blog} />
      </Suspense>
    </>
  );
}
