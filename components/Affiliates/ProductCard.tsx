'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { AffiliateProduct } from '@/data/affiliate-common';

interface ProductCardProps {
  product: AffiliateProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.a
      href={product.affiliateLink}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.4,
        ease: 'easeInOut',
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(28, 28, 28, 0.6)',
        border: '1px solid #8B0000',
        borderRadius: '12px',
        overflow: 'hidden',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 12px 40px rgba(139, 0, 0, 0.7)',
        transition: { duration: 0.3 },
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '250px' }}>
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
  );
}
