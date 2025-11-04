'use client';

import './AffiliateArea.css';

interface AffiliateLink {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
}

interface AffiliateAreaProps {
  links?: AffiliateLink[];
}

// Default affiliate links - replace with your actual affiliate links
const defaultAffiliateLinks: AffiliateLink[] = [
  {
    id: '1',
    title: 'Horror Book Collection',
    description: 'Discover chilling horror tales and dark fiction',
    url: '#',
    category: 'Books',
  },
  {
    id: '2',
    title: 'Atmospheric Sound Equipment',
    description: 'Create the perfect horror ambiance',
    url: '#',
    category: 'Electronics',
  },
  {
    id: '3',
    title: 'Dark Aesthetic Decor',
    description: 'Transform your space with gothic and horror-themed items',
    url: '#',
    category: 'Home & Living',
  },
];

export default function AffiliateArea({ links = defaultAffiliateLinks }: AffiliateAreaProps) {
  return (
    <section className="affiliate-area">
      <div className="affiliate-header">
        <h2>Recommended Products</h2>
        <p>Curated selections to enhance your midnight horror experience</p>
      </div>
      
      <div className="affiliate-grid">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="affiliate-card"
          >
            {link.image && (
              <div className="affiliate-image">
                <img src={link.image} alt={link.title} />
              </div>
            )}
            <div className="affiliate-content">
              {link.category && (
                <span className="affiliate-category">{link.category}</span>
              )}
              <h3>{link.title}</h3>
              <p>{link.description}</p>
              <span className="affiliate-link-text">Learn more →</span>
            </div>
          </a>
        ))}
      </div>
      
      <div className="affiliate-disclosure">
        <p>
          <small>
            * Some links are affiliate links. Purchases made through these links 
            may earn us a commission at no additional cost to you.
          </small>
        </p>
      </div>
    </section>
  );
}

