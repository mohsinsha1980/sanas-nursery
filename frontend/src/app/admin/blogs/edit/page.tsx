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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
          <h1 className="!p-0">Edit Blog</h1>
          <Button variant="orange" type="button" size="sm">
            <Link href="/admin/blogs">Back</Link>
          </Button>
        </div>
        <EditBlogForm blogId={blog} />
      </Suspense>
    </>
  );
}
