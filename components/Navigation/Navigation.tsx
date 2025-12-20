'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './BoneNavigation.module.scss';

const NAV_ITEMS = [
  { label: 'Stories', route: '/', icon: '💀' },
  { label: 'Archive', route: '/stories', icon: '📖' },
  { label: 'Thoughts', route: '/thoughts', icon: '🧠' },
  { label: 'Affiliate', route: '/affiliate', icon: '🪙' },
  { label: 'Feedback', route: '/feedback', icon: '📝' },
];

export default function BoneNavigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.boneNav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <h1 className={styles.title}>🩸 Midnight Horror</h1>
        </div>

        {/* Desktop nav – single row, scrollable if needed */}
        <div className={styles.desktopNav}>
          {NAV_ITEMS.map((item, index) => (
            <div key={item.route} className={styles.navItemWrapper}>
              <Link
                href={item.route}
                className={`${styles.navLink} ${
                  pathname === item.route ? styles.active : ''
                }`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </Link>
              {index < NAV_ITEMS.length - 1 && (
                <div className={styles.boneConnector}>
                  <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M 10 10 L 90 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle cx="10" cy="10" r="5" fill="currentColor" />
                    <circle cx="90" cy="10" r="5" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileNav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.route}
              href={item.route}
              className={`${styles.mobileNavLink} ${
                pathname === item.route ? styles.active : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
