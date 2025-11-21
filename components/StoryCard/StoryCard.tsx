import Link from 'next/link';
import Image from 'next/image';
import styles from './StoryCard.module.scss';

interface StoryCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
  tags: string[];
  publishedDate: string;
  
}

export default function StoryCard({
  title,
  excerpt,
  imageUrl,
  slug,
  tags,
  publishedDate,
}: StoryCardProps) {
  return (
    <Link href={`/stories/${slug}`}>
      <article className={styles.card}>
        <div className={styles.imageContainer}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={styles.image}
              priority={false}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          <div className={styles.overlay}>
            <span className={styles.readMore}>Read Story →</span>
          </div>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.excerpt}>{excerpt}</p>

          <div className={styles.meta}>
            <span className={styles.date}>{publishedDate}</span>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
