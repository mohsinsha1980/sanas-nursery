import { HERO, SITE } from "@/assets";
import SkeletonCard from "@/components/admin/blogs/skeleton-card";
import BlogCard from "@/components/blogs/blog-card";
import BlogListHero from "@/components/blogs/blog-list-hero";
import BlogSearch from "@/components/blogs/blog-search";
import FeaturedBlogCard from "@/components/blogs/featured-blog-card";
import { ServerPagination } from "@/components/common/server-pagination";
import { getPublishedBlogs } from "@/lib/api-routes/api-public";
import { BLOGS_PER_PAGE, SITE_DATA } from "@/lib/constants";
import { getPicURL } from "@/lib/helper";
import {
  BlogDataType,
  BlogFilterType,
  BlogsHttpResDataType,
} from "@/lib/types/common-types";
import { BookOpen, Star } from "lucide-react";
import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Gardening Tips & Plant Care Guides | Sanas Nursery Blogs",
  description:
    "Explore expert gardening tips, plant care guides, and nursery insights at Sanas Nursery. Learn how to grow fruit, flowering & shadow plants effectively.",
  keywords: [
    "gardening blog",
    "plant care tips",
    "gardening tips India",
    "fruit trees care guide",
    "flowering plants cultivation",
    "shadow trees growing",
    "nursery guides",
    "gardening blog Pune",
    "plant care blog",
    "gardening advice",
    "plant growing tips",
    "garden maintenance",
    "plant diseases treatment",
    "seasonal gardening",
    "indoor plants care",
    "outdoor gardening tips",
    "plant fertilizer guide",
    "gardening techniques",
  ],
  authors: [{ name: "Sanas Nursery" }],
  creator: "Sanas Nursery",
  publisher: "Sanas Nursery",
  category: "Gardening & Plant Care",
  alternates: {
    canonical: "https://sanasnursery.com/blogs",
    languages: {
      "en-IN": "https://sanasnursery.com/blogs",
    },
  },
  openGraph: {
    type: "website",
    url: "https://sanasnursery.com/blogs",
    title: "Gardening Blog | Plant Care Tips & Nursery Guides",
    description:
      "Expert gardening tips, plant care guides & nursery insights from Sanas Nursery. Learn fruit trees, flowering plants & shadow trees cultivation.",
    images: [
      {
        url: "https://sanasnursery.com/images/site/sanas-nursery.webp",
        width: 1200,
        height: 630,
        alt: "Sanas Nursery Gardening Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gardening Tips & Plant Care Guides | Sanas Nursery Blogs",
    description:
      "Expert gardening tips, plant care guides & nursery insights from Sanas Nursery. Learn fruit trees, flowering plants & shadow trees cultivation.",
    images: ["https://sanasnursery.com/images/site/sanas-nursery.webp"],
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

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Gardening Blogs - Sanas Nursery",
    url: "https://sanasnursery.com/blogs",
    headline: "Gardening Blogs, Plant Care Guides & Nursery Insights",
    description:
      "Discover expert gardening tips, plant care guides, and nursery insights in our comprehensive blog collection at Sanas Nursery.",
    mainEntity: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      image: getPicURL(blog.coverImage) || HERO.BLOGS,
      url: `/blogs/${blog.slug}`,
      datePublished: blog.createdAt,
      author: {
        "@type": "Organization",
        name: "Sanas Nursery",
      },
      publisher: {
        "@type": "Organization",
        name: "Sanas Nursery",
        url: "https://sanasnursery.com",
        logo: {
          "@type": "ImageObject",
          url: SITE.SEO_LOGO,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SITE_DATA.phone,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "mr"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Uruli Kanchan",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "412202",
          addressCountry: "IN",
        },
      },
      description: blog.metaDescription || blog.excerpt,
    })),
  };

  return (
    <>
      <Script
        id="blogs-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Script
        id="blogs-breadcrumbs"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://sanasnursery.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blogs",
              item: "https://sanasnursery.com/blogs",
            },
          ],
        })}
      </Script>

      <Script
        id="blogs-faq"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What gardening topics does Sanas Nursery blog cover?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our blog covers fruit trees care, flowering plants cultivation, shadow trees growing, plant diseases treatment, seasonal gardening tips, indoor plants care, outdoor gardening techniques, plant fertilizer guides, and general garden maintenance advice.",
              },
            },
            {
              "@type": "Question",
              name: "How often does Sanas Nursery publish new blog posts?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We regularly publish new gardening tips, plant care guides, and nursery insights. Check back frequently for the latest expert advice on growing and maintaining healthy plants.",
              },
            },
            {
              "@type": "Question",
              name: "Are the gardening tips suitable for beginners?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, our blog posts are designed for gardeners of all skill levels, from beginners to experts. We provide step-by-step guides and easy-to-follow tips for successful plant cultivation.",
              },
            },
            {
              "@type": "Question",
              name: "Do you cover specific plant types in your blog?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, we specialize in fruit trees, flowering plants, shadow trees, show trees, and masala plants. Our blog provides specific care instructions and growing tips for each plant category.",
              },
            },
          ],
        })}
      </Script>

      <Suspense
        fallback={
          <div className="mt-30">
            <SkeletonCard />
          </div>
        }
      >
        <div className="">
          <BlogListHero />

          <div className="container mx-auto px-4 py-16" id="blogSearch">
            <div className="mb-12">
              <BlogSearch />
            </div>

            {blogs.length > 0 ? (
              <>
                {featuredBlogs.length > 0 && (
                  <div className="mb-20 md:px-10" id="featured">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                      {featuredBlogs.map((blog) => (
                        <FeaturedBlogCard key={blog._id} blog={blog} />
                      ))}
                    </div>
                  </div>
                )}

                {regularBlogs.length ? (
                  <div className="mb-12 md:px-10">
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
                      {regularBlogs.map((blog, index) => (
                        <BlogCard key={blog._id} blog={blog} index={index} />
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
                    Try adjusting your search or check back later for new
                    content.
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-orange-500 rounded-full mx-auto"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </>
  );
}
