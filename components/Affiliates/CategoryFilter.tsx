'use client';

import { motion } from 'framer-motion';
import './CategoryFilter.css';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      marginBottom: '40px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="category-text">{category}</span>
          <div className="category-liquid" style={{ animationDelay: `${index * 0.15}s` }}></div>
        </motion.button>
      ))}
    </div>
  );
}
