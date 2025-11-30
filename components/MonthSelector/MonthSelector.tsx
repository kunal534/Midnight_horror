'use client';

import { useState, useEffect } from 'react';
import { format, subMonths } from 'date-fns';
import styles from './MonthSelector.module.scss';

interface MonthSelectorProps {
  onMonthChange: (month: string) => void; // "yyyy-MM"
}

export default function MonthSelector({ onMonthChange }: MonthSelectorProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [months, setMonths] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const now = new Date();
    const initialMonth = format(now, 'yyyy-MM');

    const m = Array.from({ length: 12 }, (_, i) => {
      const date = subMonths(now, i);
      return {
        value: format(date, 'yyyy-MM'),
        label: format(date, 'MMMM yyyy'),
      };
    });

    setSelectedMonth(initialMonth);
    setMonths(m);
    onMonthChange(initialMonth);
  }, [onMonthChange]);

  if (!selectedMonth) {
    // nothing to hydrate yet, keep server and client markup the same
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedMonth(value);
    onMonthChange(value);
  };

  return (
    <div className={styles.monthSelector}>
      <label htmlFor="month-select" className={styles.label}>

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
