import { Tag } from "lucide-react";
import Link from "next/link";
import styles from "./blog-tags.module.css";

interface BlogTagsProps {
  tags: string[];
}

export default function BlogTags({ tags }: BlogTagsProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={styles.tagsSection}>
      <h3 className={styles.tagsTitle}>
        <Tag className="h-4 w-4 inline mr-2" />
        Tags
      </h3>
      <div className={styles.tagsList}>
        {tags.map((tag: string, index: number) => {
          const searchParams = new URLSearchParams();
          searchParams.set("search", tag);

          return (
            <Link
              key={index}
              href={`/blogs?${searchParams.toString()}`}
              className={styles.tag}
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
