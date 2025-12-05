// app/affiliate/page.tsx
import { headers } from 'next/headers';
import { AffiliatePage } from '@/components/Affiliates/AffiliatePage';
import { affiliateProductsIN } from '@/data/affiliate-in';
import { affiliateProductsUS } from '@/data/affiliate-us';

export default function Page() {
  const hdrs = headers();
  const country = hdrs.get('x-user-country') || 'US'; // set by middleware

  const region: 'US' | 'IN' = country === 'IN' ? 'IN' : 'US';
  const products = region === 'IN' ? affiliateProductsIN : affiliateProductsUS;

  return <AffiliatePage products={products} region={region} />;
}
