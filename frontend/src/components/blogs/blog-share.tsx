"use client";

import { Button } from "@/components/ui/button";
import {
  Check,
  Copy,
  Facebook,
  Linkedin,
  Mail,
  Share2,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./blog-share.module.css";

interface BlogShareProps {
  title: string;
  url: string;
  excerpt?: string;
}

export default function BlogShare({ title, url, excerpt }: BlogShareProps) {
  const [copied, setCopied] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);

  useEffect(() => {
    setHasNativeShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedinUrl, "_blank", "width=600,height=400");
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out this article: ${title}`);
    const body = encodeURIComponent(
      `${title}\n\n${excerpt || ""}\n\nRead more: ${url}`
    );
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  };

  const shareViaWebAPI = async () => {
    if (hasNativeShare) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className={styles.shareSection}>
      <h3 className={styles.shareTitle}>Share this article</h3>

      <div className={styles.shareButtons}>
        {hasNativeShare && (
          <Button
            onClick={shareViaWebAPI}
            className={styles.shareButton}
            variant="outline"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}

        {/* {!hasNativeShare && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={styles.shareButton} variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={styles.dropdownContent}>
              <DropdownMenuItem
                onClick={handleCopyLink}
                className={styles.dropdownItem}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={shareToFacebook}
                className={styles.dropdownItem}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={shareToTwitter}
                className={styles.dropdownItem}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={shareToLinkedIn}
                className={styles.dropdownItem}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={shareViaEmail}
                className={styles.dropdownItem}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )} */}

        {!hasNativeShare && (
          <div className={styles.individualButtons}>
            <Button
              onClick={handleCopyLink}
              className={styles.iconButton}
              variant="outline"
              size="sm"
              title="Copy Link"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>

            <Button
              onClick={shareToFacebook}
              className={styles.iconButton}
              variant="outline"
              size="sm"
              title="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </Button>

            <Button
              onClick={shareToTwitter}
              className={styles.iconButton}
              variant="outline"
              size="sm"
              title="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </Button>

            <Button
              onClick={shareToLinkedIn}
              className={styles.iconButton}
              variant="outline"
              size="sm"
              title="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Button>

            <Button
              onClick={shareViaEmail}
              className={styles.iconButton}
              variant="outline"
              size="sm"
              title="Share via Email"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
