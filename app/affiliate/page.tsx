'use client';

import MusicPlayer from '@/components/MusicPlayer/MusicPlayer';
import AffiliateArea from '@/components/AffiliateArea/AffiliateArea';
import './page.css';

const affiliateLinks = [
  {
    id: '1',
    title: 'Horror Book Collection',
    description: 'Discover chilling horror tales and dark fiction from master storytellers',
    url: '#',
    category: 'Books',
    image: '',
  },
  {
    id: '2',
    title: 'Atmospheric Sound Equipment',
    description: 'Create the perfect horror ambiance with premium audio equipment',
    url: '#',
    category: 'Electronics',
    image: '',
  },
  {
    id: '3',
    title: 'Dark Aesthetic Decor',
    description: 'Transform your space with gothic and horror-themed items',
    url: '#',
    category: 'Home & Living',
    image: '',
  },
  {
    id: '4',
    title: 'Horror Movie Collection',
    description: 'Curated selection of classic and modern horror films',
    url: '#',
    category: 'Entertainment',
    image: '',
  },
  {
    id: '5',
    title: 'Writing Tools for Horror',
    description: 'Everything you need to craft your own dark tales',
    url: '#',
    category: 'Tools',
    image: '',
  },
];

export default function AffiliatePage() {
  return (
    <main className="main-container">
      <MusicPlayer />
      
      <div className="content-wrapper">
        <header className="page-header">
          <h1>Affiliate Recommendations</h1>
          <p className="page-subtitle">Curated products to enhance your midnight horror experience</p>
        </header>

        <AffiliateArea links={affiliateLinks} />

        <section className="affiliate-info">
          <h2>Why These Recommendations?</h2>
          <p>
            Each product has been carefully selected to complement the horror and dark aesthetic 
            experience. These are items I personally use or have thoroughly researched, ensuring 
            quality and relevance to the themes explored in Midnight Horror Tales.
          </p>
          <div className="disclosure-box">
            <h3>Affiliate Disclosure</h3>
            <p>
              Some links on this page are affiliate links. This means that if you make a purchase 
              through these links, I may earn a commission at no additional cost to you. This helps 
              support the creation of more content and stories. Thank you for your support!
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

