'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { AffiliateProduct } from '@/data/affiliate-common';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: AffiliateProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.div
      layout
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '32px',
        marginBottom: '64px',
      }}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
