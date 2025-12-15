// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useState } from 'react';
// import type { AffiliateProduct } from '@/data/affiliate-common';
// import '../../app/affiliate/page.css';

// interface AffiliatePageProps {
//   products: AffiliateProduct[];
//   region: 'US' | 'IN';
// }

// export function AffiliatePage({ products, region }: AffiliatePageProps) {
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');

//   // Extract unique categories from products
//   const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))];

//   // Filter products based on selected category
//   const filteredProducts = selectedCategory === 'All' 
//     ? products 
//     : products.filter((product) => product.category === selectedCategory);

//   return (
//     <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px' }}>
//       {/* Header */}
//       <div className="page-header">
//         <h1>Horror Recommendations</h1>
//         <p className="page-subtitle">
//           Curated products to enhance your horror experience {region === 'IN' ? '(India)' : '(Global)'}
//         </p>
//       </div>
// {/* Category Filter with Smooth Curved Edges */}
// <div style={{ 
//   display: 'flex', 
//   gap: '16px', 
//   marginBottom: '40px',
//   flexWrap: 'wrap',
//   justifyContent: 'center',
//   perspective: '1000px',
// }}>
//   {categories.map((category) => (
//     <motion.button
//       key={category}
//       onClick={() => setSelectedCategory(category)}
//       whileHover={{ 
//         scale: 1.08,
//         boxShadow: selectedCategory === category 
//           ? '0 0 30px rgba(220, 20, 60, 1), 0 0 60px rgba(139, 0, 0, 0.8), inset 0 0 20px rgba(220, 20, 60, 0.3)'
//           : '0 0 20px rgba(139, 0, 0, 0.7), inset 0 0 15px rgba(220, 20, 60, 0.2)',
//         textShadow: '0 0 10px rgba(220, 20, 60, 0.8)',
//       }}
//       whileTap={{ 
//         scale: 0.92,
//         boxShadow: '0 0 40px rgba(220, 20, 60, 1), inset 0 0 30px rgba(220, 20, 60, 0.5)',
//       }}
//       style={{
//         padding: '14px 32px',
//         borderRadius: '8px',
//         border: selectedCategory === category 
//           ? '2px solid #DC143C' 
//           : '2px solid rgba(139, 0, 0, 0.6)',
//         background: selectedCategory === category 
//           ? 'linear-gradient(135deg, #4a0000 0%, #8B0000 50%, #DC143C 100%)'
//           : 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(40, 20, 20, 0.9) 100%)',
//         color: '#E8E4D9',
//         fontFamily: 'Cinzel, serif',
//         fontSize: '12px',
//         fontWeight: '600',
//         letterSpacing: '2px',
//         textTransform: 'uppercase',
//         cursor: 'pointer',
//         position: 'relative',
//         overflow: 'hidden',
//         boxShadow: selectedCategory === category
//           ? '0 0 20px rgba(220, 20, 60, 0.6), inset 0 0 15px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(139, 0, 0, 0.5)'
//           : '0 4px 15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(139, 0, 0, 0.4)',
//         transition: 'all 0.5s ease-in-out',
//         textShadow: selectedCategory === category 
//           ? '0 0 8px rgba(220, 20, 60, 0.6)'
//           : 'none',
//         backdropFilter: 'blur(4px)',
//       }}
//     >
//       {/* Smooth pulsing glow effect */}
//       <motion.div
//         animate={selectedCategory === category ? {
//           opacity: [0.2, 0.5, 0.2],
//           scale: [1, 1.1, 1],
//         } : {
//           opacity: 0,
//         }}
//         transition={{ 
//           duration: 3, 
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'radial-gradient(circle, rgba(220, 20, 60, 0.3) 0%, transparent 70%)',
//           borderRadius: '8px',
//           pointerEvents: 'none',
//         }}
//       />
      
//       <span style={{
//         position: 'relative',
//         zIndex: 1,
//       }}>
//         {category}
//       </span>
//     </motion.button>
//   ))}
// </div>


//       {/* Products grid */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//           gap: '32px',
//           marginBottom: '64px',
//         }}
//       >
//         {filteredProducts.map((product, index) => (
//           <motion.a
//             key={product.id}
//             href={product.affiliateLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ delay: index * 0.1 }}
//             layout
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               background: 'rgba(28, 28, 28, 0.6)',
//               border: '1px solid #8B0000',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               textDecoration: 'none',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease',
//             }}
//             whileHover={{
//               y: -4,
//               boxShadow: '0 8px 32px rgba(139, 0, 0, 0.6)',
//             }}
//           >
//             <div style={{ position: 'relative', width: '100%', height: '250px' }}>
//               <Image
//                 src={product.imageUrl}
//                 alt={product.title}
//                 fill
//                 priority={index === 0}
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 style={{ objectFit: 'cover' }}
//               />
//               <div
//                 style={{
//                   position: 'absolute',
//                   top: '16px',
//                   right: '16px',
//                   background: 'rgba(220, 20, 60, 0.9)',
//                   color: '#E8E4D9',
//                   padding: '4px 12px',
//                   borderRadius: '20px',
//                   fontSize: '12px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {product.category}
//               </div>
//             </div>

//             <div style={{ padding: '24px' }}>
//               <h3
//                 style={{
//                   fontSize: '20px',
//                   color: '#E8E4D9',
//                   marginBottom: '12px',
//                   fontFamily: 'Cinzel, serif',
//                 }}
//               >
//                 {product.title}
//               </h3>

//               <p
//                 style={{
//                   fontSize: '14px',
//                   color: '#B8B8B8',
//                   marginBottom: '16px',
//                   lineHeight: '1.6',
//                 }}
//               >
//                 {product.description}
//               </p>

//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   paddingTop: '16px',
//                   borderTop: '1px solid #8B0000',
//                 }}
//               >
//                 <span
//                   style={{
//                     fontSize: '24px',
//                     fontWeight: 'bold',
//                     color: '#DC143C',
//                   }}
//                 >
//                   {product.price}
//                 </span>
//                 <button
//                   style={{
//                     background: 'linear-gradient(135deg, #5C0000 0%, #8B0000 50%, #DC143C 100%)',
//                     color: '#E8E4D9',
//                     padding: '8px 20px',
//                     borderRadius: '8px',
//                     border: 'none',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   View Deal →
//                 </button>
//               </div>
//             </div>
//           </motion.a>
//         ))}
//       </div>

//       {/* Single-line disclosure bar */}
//       <div className="affiliate-info">
//         <div className="disclosure-box">
//           <p>
//             <strong>Affiliate Disclosure:</strong> As an Amazon Associate, I earn from qualifying
//             purchases. These are products I personally recommend to enhance your horror experience.
//             Prices and availability are subject to change.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import type { AffiliateProduct } from '@/data/affiliate-common';
import '../../app/affiliate/page.css'; // Move this BEFORE component imports
import { CategoryFilter } from './CategoryFilter';
import { ProductGrid } from './ProductGrid';
import { LiquidFilter } from './BloodDripEffect';

interface AffiliatePageProps {
  products: AffiliateProduct[];
  region: 'US' | 'IN';
}

export function AffiliatePage({ products, region }: AffiliatePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter((product) => product.category === selectedCategory);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px' }}>
      {/* SVG Filter for blood drip effect */}
      <LiquidFilter />
      
      {/* Header */}
      <div className="page-header">
        <h1>Horror Recommendations</h1>
        <p className="page-subtitle">
          Curated products to enhance your horror experience {region === 'IN' ? '(India)' : '(Global)'}
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} />

      {/* Disclosure */}
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
