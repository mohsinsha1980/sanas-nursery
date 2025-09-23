import { getBlogBySlug } from "@/lib/api-routes/api-public";
import { getPicURL } from "@/lib/helper";
import { BlogDataType } from "@/lib/types/common-types";
import type { Metadata } from "next";
import Script from "next/script";

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogLayoutProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await getBlogBySlug(slug);
    const blogData = await response.json();

    if (!blogData?.data) {
      return {
        title: "Blog Not Found",
        description: "The blog you're looking for could not be found.",
      };
    }

    const blog = blogData.data;

    return {
      title: `${blog.metaTitle || blog.title} | Sanas Nursery`,
      description: blog.metaDescription || blog.excerpt,
      keywords: [
        ...(blog.tags || []),
        "gardening tips",
        "plant care guide",
        "nursery blog",
        "gardening advice",
        "plant cultivation",
        "garden maintenance",
        "Sanas Nursery",
      ],
      authors: blog.author
        ? [{ name: blog.author }]
        : [{ name: "Sanas Nursery" }],
      creator: blog.author || "Sanas Nursery",
      publisher: "Sanas Nursery",
      category: "Gardening & Plant Care",
      alternates: {
        canonical: `https://sanasnursery.com/blogs/${blog.slug}`,
        languages: {
          "en-IN": `https://sanasnursery.com/blogs/${blog.slug}`,
        },
      },
      openGraph: {
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt,
        type: "article",
        url: `https://sanasnursery.com/blogs/${blog.slug}`,
        siteName: "Sanas Nursery",
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: blog.author ? [blog.author] : ["Sanas Nursery"],
        tags: blog.tags,
        images: [
          {
            url: getPicURL(blog.coverImage),
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt,
        images: [getPicURL(blog.coverImage)],
      },
    };
  } catch (_error) {
    return {
      title: "Blog Not Found",
      description: "The blog you're looking for could not be found.",
    };
  }
}

export default async function BlogLayout({
  children,
  params,
}: BlogLayoutProps) {
  const { slug } = await params;

  let blog: BlogDataType | null = null;
  try {
    const response = await getBlogBySlug(slug);
    const blogData = await response.json();
    blog = blogData?.data || null;
  } catch (_e) {
    blog = null;
  }

  return (
    <section>
      {blog ? (
        <Script
          id="breadcrumbs-article"
          type="application/ld+json"
          strategy="beforeInteractive"
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
              {
                "@type": "ListItem",
                position: 3,
                name: blog.title,
                item: `https://sanasnursery.com/blogs/${blog.slug}`,
              },
            ],
          })}
        </Script>
      ) : null}

      {blog ? (
        <Script
          id="article-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog.title,
            description: blog.metaDescription || blog.excerpt,
            image: [
              {
                "@type": "ImageObject",
                url: getPicURL(blog.coverImage),
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ],
            datePublished: blog.createdAt,
            dateModified: blog.updatedAt || blog.createdAt,
            author: {
              "@type": "Person",
              name: blog.author || "Sanas Nursery",
              url: "https://sanasnursery.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Sanas Nursery",
              url: "https://sanasnursery.com",
              logo: {
                "@type": "ImageObject",
                url: "https://sanasnursery.com/images/site/sanas-nursery.webp",
                width: 200,
                height: 200,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://sanasnursery.com/blogs/${blog.slug}`,
            },
            articleSection: blog.category || "Gardening",
            keywords: Array.isArray(blog.tags)
              ? blog.tags.join(", ")
              : "gardening, plant care",
            wordCount:
              typeof blog.content === "string"
                ? blog.content.replace(/<[^>]*>/g, "").split(/\s+/).length
                : undefined,
            timeRequired: blog.readingTime
              ? `PT${blog.readingTime}M`
              : undefined,
            inLanguage: "en-IN",
            isAccessibleForFree: true,
            genre: "Gardening & Plant Care",
          })}
        </Script>
      ) : null}

      {blog ? (
        <Script
          id="blog-faq"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `What is this article about: ${blog.title}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    blog.metaDescription ||
                    blog.excerpt ||
                    "This article provides expert gardening tips and plant care guidance from Sanas Nursery.",
                },
              },
              {
                "@type": "Question",
                name: "Who wrote this gardening article?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `This article was written by ${
                    blog.author || "Sanas Nursery"
                  }, a trusted source for gardening and plant care expertise.`,
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to read this article?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `This article takes approximately ${
                    blog.readingTime || "5"
                  } minutes to read and provides comprehensive gardening guidance.`,
                },
              },
            ],
          })}
        </Script>
      ) : null}

      {blog ? (
        <Script
          id="blog-category"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.metaDescription || blog.excerpt,
            image: getPicURL(blog.coverImage),
            datePublished: blog.createdAt,
            dateModified: blog.updatedAt || blog.createdAt,
            author: { "@type": "Person", name: blog.author || "Sanas Nursery" },
            publisher: {
              "@type": "Organization",
              name: "Sanas Nursery",
              url: "https://sanasnursery.com",
            },
            mainEntityOfPage: `https://sanasnursery.com/blogs/${blog.slug}`,
            articleSection: blog.category || "Gardening",
            keywords: Array.isArray(blog.tags)
              ? blog.tags.join(", ")
              : "gardening, plant care",
            wordCount:
              typeof blog.content === "string"
                ? blog.content.replace(/<[^>]*>/g, "").split(/\s+/).length
                : undefined,
            timeRequired: blog.readingTime
              ? `PT${blog.readingTime}M`
              : undefined,
            inLanguage: "en-IN",
            isPartOf: {
              "@type": "Blog",
              name: "Sanas Nursery Gardening Blog",
              url: "https://sanasnursery.com/blogs",
            },
          })}
        </Script>
      ) : null}

      {children}
    </section>
  );
}
