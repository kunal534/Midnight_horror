'use client';

import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Section */}
          <div className={styles.section}>
            <h3 className={styles.siteTitle}>Midnight Horror Tales</h3>
            <p className={styles.tagline}>
              Curated stories for the witching hour
            </p>
          </div>

          {/* Middle Section - Links */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <nav className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/stories">Stories</Link>
              <Link href="/thoughts">Thoughts</Link>
              <Link href="/affiliate">Affiliate</Link>
            </nav>
          </div>

          {/* Right Section - Contact */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Connect</h4>
            <div className={styles.socialLinks}>
              <a 
                href="https://in.pinterest.com/midnighthorrortales/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span className={styles.icon}>📌</span>
                Pinterest
              </a>
              <a 
                href="mailto:midnight.horror.tales12@gmail.com"
                className={styles.socialLink}
              >
                <span className={styles.icon}>✉️</span>
                Email Me
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Midnight Horror Tales. All rights reserved.
          </p>
          <p className={styles.quote}>
              In the darkness, stories come alive
          </p>

        </div>
      </div>
    </footer>
  );
}
