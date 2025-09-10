import SkeletonCard from "@/components/admin/blogs/skeleton-card";
import BlogCard from "@/components/blogs/blog-card";
import BlogListHero from "@/components/blogs/blog-list-hero";
import BlogSearch from "@/components/blogs/blog-search";
import FeaturedBlogCard from "@/components/blogs/featured-blog-card";
import { ServerPagination } from "@/components/common/server-pagination";
import config from "@/config/env-config";
import { getPublishedBlogs } from "@/lib/api-routes/api-public";
import { BLOGS_PER_PAGE } from "@/lib/constants";
import {
  BlogDataType,
  BlogFilterType,
  BlogsHttpResDataType,
} from "@/lib/types/common-types";
import { BookOpen, Star } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Blogs | ${config.WEBAPP_TITLE}`,
  description:
    "Discover expert gardening tips, plant care guides, and nursery insights in our comprehensive blog collection.",
  openGraph: {
    title: `Blogs | ${config.WEBAPP_TITLE}`,
    description:
      "Discover expert gardening tips, plant care guides, and nursery insights in our comprehensive blog collection.",
    url: `${config.WEBAPP_URL}/blogs`,
  },
};

async function fetchBlogs(
  searchParamsData?: BlogFilterType
): Promise<BlogsHttpResDataType> {
  const response = await getPublishedBlogs(searchParamsData);
  const blogsData = await response.json();
  return blogsData;
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<BlogFilterType>;
}) {
  const searchParamsData = await searchParams;
  const currentPage = Number(searchParamsData.page) ?? 1;
  const blogsResponse = await fetchBlogs(searchParamsData);

  let blogs: BlogDataType[] = [];
  let total = 0;
  if (blogsResponse?.data) {
    blogs = blogsResponse.data.blogs;
    total = blogsResponse.data.total;
  }

  const featuredBlogs = blogs.filter((blog) => blog.featured);
  const regularBlogs = blogs.filter((blog) => !blog.featured);

  return (
    <Suspense
      fallback={
        <div className="mt-30">
          <SkeletonCard />
        </div>
      }
    >
      <div className="min-h-screen bg-gray-50 mt-30">
        <BlogListHero />

        <div className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <BlogSearch />
          </div>

          {blogs.length > 0 ? (
            <>
              {featuredBlogs.length > 0 && (
                <div className="mb-20">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        Featured Articles
                      </h2>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                      Discover our handpicked collection of expert gardening
                      guides and tips
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredBlogs.map((blog) => (
                      <FeaturedBlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                </div>
              )}

              {regularBlogs.length ? (
                <div className="mb-12">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        All Articles
                      </h2>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                      Explore our complete collection of gardening tips, plant
                      care guides, and nursery insights
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {regularBlogs.map((blog) => (
                      <BlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                </div>
              ) : null}

              {total && Math.ceil(total / BLOGS_PER_PAGE) > 1 && (
                <div className="mt-16">
                  <ServerPagination
                    total={total}
                    perPage={BLOGS_PER_PAGE}
                    currentPage={currentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 max-w-md mx-auto">
                <div className="text-gray-400 mb-6">
                  <BookOpen className="w-20 h-20 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No blogs found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or check back later for new content.
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-orange-500 rounded-full mx-auto"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
