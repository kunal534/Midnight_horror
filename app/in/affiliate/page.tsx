import { AffiliatePage } from '@/components/Affiliates/AffiliatePage';
import { affiliateProductsIN } from '@/data/affiliate-in';

export default function AffiliateINPage() {
  return <AffiliatePage products={affiliateProductsIN} region="IN" />;
}
