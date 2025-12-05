import { AffiliatePage } from '@/components/Affiliates/AffiliatePage';

import { affiliateProductsUS } from '@/data/affiliates-us';

export default function AffiliateUSPage() {
  return <AffiliatePage products={affiliateProductsUS} region="US" />;
}
