'use client';

import { useState } from 'react';
import { format, subMonths } from 'date-fns';
import styles from './MonthSelector.module.scss';

interface MonthSelectorProps {
  onMonthChange: (month: string) => void;
}

export default function MonthSelector({ onMonthChange }: MonthSelectorProps) {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      value: format(date, 'yyyy-MM'),
      label: format(date, 'MMMM yyyy'),
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedMonth(value);
    onMonthChange(value);
  };

  return (
    <div className={styles.monthSelector}>
      <label htmlFor="month-select" className={styles.label}>
        📅
      </label>
      <select
        id="month-select"
        value={selectedMonth}
        onChange={handleChange}
        className={styles.select}
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
}
