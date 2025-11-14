'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { affiliateProducts } from '@/data/affiliates';  // ← Import affiliates

export default function AffiliatePage() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px' }}>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '48px', textAlign: 'center' }}
      >
        <h1 style={{
          fontSize: '48px',
          color: '#E8E4D9',
          marginBottom: '16px',
          textShadow: '0 0 15px rgba(220, 20, 60, 0.5)',
          fontFamily: 'Cinzel, serif',
        }}>
          🪙 Horror Recommendations
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#DC143C',
          fontFamily: 'Lora, serif',
        }}>
          Curated products to enhance your horror experience
        </p>
      </motion.header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '32px',
      }}>
        {affiliateProducts.map((product, index) => (
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
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 0, 0, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '250px' }}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(220, 20, 60, 0.9)',
                color: '#E8E4D9',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}>
                {product.category}
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              <h3 style={{
                fontSize: '20px',
                color: '#E8E4D9',
                marginBottom: '12px',
                fontFamily: 'Cinzel, serif',
              }}>
                {product.title}
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: '#B8B8B8',
                marginBottom: '16px',
                lineHeight: '1.6',
              }}>
                {product.description}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid #8B0000',
              }}>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#DC143C',
                }}>
                  {product.price}
                </span>
                <button style={{
                  background: 'linear-gradient(135deg, #5C0000 0%, #8B0000 50%, #DC143C 100%)',
                  color: '#E8E4D9',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}>
                  View Deal →
                </button>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div style={{
        marginTop: '64px',
        padding: '24px',
        background: 'rgba(28, 28, 28, 0.4)',
        border: '1px solid #8B0000',
        borderRadius: '12px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '14px', color: '#B8B8B8', lineHeight: '1.6' }}>
          <strong>Affiliate Disclosure:</strong> As an Amazon Associate and through other affiliate programs, 
          I earn from qualifying purchases. These are products I personally recommend to enhance your horror experience.
        </p>
      </div>
    </div>
  );
}
