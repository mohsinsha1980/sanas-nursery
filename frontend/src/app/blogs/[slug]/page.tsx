import BlogCard from "@/components/blogs/blog-card";
import BlogShare from "@/components/blogs/blog-share";
import BlogTags from "@/components/blogs/blog-tags";
import config from "@/config/env-config";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/api-routes/api-public";
import { getCategoryLabel, getFormattedDate, getPicURL } from "@/lib/helper";
import { BlogDataType } from "@/lib/types/common-types";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  User,
  Link2,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./blog-details.module.css";

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await getBlogBySlug(slug);
    const blogData = await response.json();

    if (!blogData.data) {
      return {
        title: "Blog Not Found",
        description: "The blog you're looking for could not be found.",
      };
    }

    const blog = blogData.data;

    return {
      title: `${blog.metaTitle} | Sana's Nursery`,
      description: blog.metaDescription || blog.excerpt,
      keywords: blog.tags?.join(", "),
      authors: blog.author ? [{ name: blog.author }] : undefined,
      openGraph: {
        title: blog.metaTitle,
        description: blog.metaDescription || blog.excerpt,
        type: "article",
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: blog.author ? [blog.author] : undefined,
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
    };
  } catch (_error) {
    console.log(_error);
    return {
      title: "Blog Not Found",
      description: "The blog you're looking for could not be found.",
    };
  }
}

async function fetchBlogDetails(slug: string): Promise<{
  data: BlogDataType;
}> {
  const response = await getBlogBySlug(slug);
  const blogData = await response.json();
  return blogData;
}

async function fetchRelatedBlogs(blogId: string) {
  try {
    const response = await getRelatedBlogs(blogId);
    const relatedData = await response.json();
    return relatedData.data?.blogs || [];
  } catch (_error) {
    console.log(_error);
    return [];
  }
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;
  const blogResponse = await fetchBlogDetails(slug);
  if (!blogResponse.data) {
    notFound();
  }

  const blog: BlogDataType = blogResponse.data;
  const relatedBlogs: BlogDataType[] = await fetchRelatedBlogs(blog._id);

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <div className={styles.heroSection}>
        <div className="container mx-auto px-4 py-10">
          <div className={styles.heroContent}>
            <Link href="/blogs" className={styles.backLink}>
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>

            <div className="flex items-center gap-3 mb-6">
              {blog.category ? (
                <div className={styles.categoryBadge}>
                  <Tag className="h-3 w-3 mr-1" />
                  {getCategoryLabel(blog.category)}
                </div>
              ) : null}

              {blog.featured && (
                <div className={styles.featuredBadge}>Featured</div>
              )}
            </div>

            <h1 className={styles.blogTitle}>{blog.title}</h1>

            <p className={styles.blogExcerpt}>{blog.metaDescription}</p>

            <div className={styles.metaInfo}>
              {blog.author && (
                <div className={styles.metaItem}>
                  <div className={styles.authorAvatar}>
                    <User className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{blog.author}</span>
                </div>
              )}
              {blog.readingTime && (
                <div className={styles.metaItem}>
                  <Clock className="h-5 w-5" />
                  <span>{blog.readingTime} min read</span>
                </div>
              )}
              <div className={styles.metaItem}>
                <Calendar className="h-5 w-5" />
                <span>{getFormattedDate(blog.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className={styles.coverImage}>
              <Image
                src={getPicURL(blog.coverImage)}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <article className={styles.articleContent}>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>

            <BlogTags tags={blog.tags || []} />
            <BlogShare
              title={blog.title}
              url={`${config.WEBAPP_URL}/blogs/${blog.slug}`}
              excerpt={blog.excerpt}
            />
          </div>
        </div>
      </div>

      {relatedBlogs.length > 0 && (
        <div className={styles.relatedSection}>
          <div className="container mx-auto px-4">
            <div className={styles.relatedContainer}>
              <div className={styles.relatedHeader}>
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <Link2 className="h-6 w-6 text-white" />
                  </div>
                  <h2 className={styles.relatedTitle}>Related Articles</h2>
                </div>
                <p className={styles.relatedDescription}>
                  Discover more insights and tips from our blog
                </p>
              </div>

              <div className={styles.relatedGrid}>
                {relatedBlogs.map((relatedBlog: BlogDataType) => (
                  <BlogCard key={relatedBlog._id} blog={relatedBlog} />
                ))}
              </div>

              <div className={styles.ctaSection}>
                <Link href="/blogs" className={styles.ctaButton}>
                  <BookOpen className="h-5 w-5 mr-2" />
                  View All Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
