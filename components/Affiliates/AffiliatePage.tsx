'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { AffiliateProduct } from '@/data/affiliate-common';
import '../../app/affiliate/page.css';

interface AffiliatePageProps {
  products: AffiliateProduct[];
  region: 'US' | 'IN';
}

export function AffiliatePage({ products, region }: AffiliatePageProps) {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px' }}>

      {/* Header */}
      <div className="page-header">
        <h1>Horror Recommendations</h1>
        <p className="page-subtitle">
          Curated products to enhance your horror experience {region === 'IN' ? '(India)' : '(Global)'}
        </p>
      </div>

      {/* Products grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '64px',
        }}
      >
        {products.map((product, index) => (
          <motion.a
            key={product.id}
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(28, 28, 28, 0.6)',
              border: '1px solid #8B0000',
              borderRadius: '12px',
              overflow: 'hidden',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            whileHover={{
              y: -4,
              boxShadow: '0 8px 32px rgba(139, 0, 0, 0.6)',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '250px' }}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(220, 20, 60, 0.9)',
                  color: '#E8E4D9',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {product.category}
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              <h3
                style={{
                  fontSize: '20px',
                  color: '#E8E4D9',
                  marginBottom: '12px',
                  fontFamily: 'Cinzel, serif',
                }}
              >
                {product.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: '#B8B8B8',
                  marginBottom: '16px',
                  lineHeight: '1.6',
                }}
              >
                {product.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #8B0000',
                }}
              >
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#DC143C',
                  }}
                >
                  {product.price}
                </span>
                <button
                  style={{
                    background: 'linear-gradient(135deg, #5C0000 0%, #8B0000 50%, #DC143C 100%)',
                    color: '#E8E4D9',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  View Deal →
                </button>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Single-line disclosure bar */}
      <div className="affiliate-info">
        <div className="disclosure-box">
          <p>
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate, I earn from qualifying
            purchases. These are products I personally recommend to enhance your horror experience.
            Prices and availability are subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}
