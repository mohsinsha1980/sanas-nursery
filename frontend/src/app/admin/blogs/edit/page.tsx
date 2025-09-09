import EditBlogForm from "@/components/admin/blogs/edit-blog";
import Loading from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
        <div className="flex justify-between items-center pb-5">
          <h1 className="text-2xl font-bold text-gray-900">Edit Blog</h1>
          <Button variant="outline" type="button" size="md" className="h-fit">
            <Link href="/admin/blogs">Back</Link>
          </Button>
        </div>
        <EditBlogForm blogId={blog} />
      </Suspense>
    </>
  );
}
