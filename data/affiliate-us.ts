import type { AffiliateProduct } from './affiliate-common';

export const affiliateProductsUS: AffiliateProduct[] = [
  {
    title:`Skull Candy`,
    description:`Picks marked with quiet, detailed sugar skulls. They add a subtle dark edge to any setup nothing loud, just a small detail that changes the whole mood of the table.`,
    imageUrl: 'https://m.media-amazon.com/images/I/812R+IW57oL._AC_SX679_.jpg',
    affiliateLink: 'https://amzn.to/4pZMQlV',
    price: '$14.99/-',
    category: 'Dining',
  },
  {
    title:'Candle handler',
    description:'They grip candles or hang items, creating that unsettling somethings breaking through presence that makes guests freeze',
    imageUrl:'https://m.media-amazon.com/images/I/71jSayh9DqL._AC_SX679_.jpg',
    affiliateLink:'https://amzn.to/3KMbHLe',
    price:'$28.99/-',
    category:'Decoration'
  },
  {
    title:'Bookends',
    description:'Life sized skulls on dark wood bases that anchor your books with literary weight. Heavy duty resin with weathered detail quiet macabre that holds darkness in place without the gimmicks.',
    imageUrl:'https://m.media-amazon.com/images/I/714euVOldVL._AC_SX679_.jpg',
    affiliateLink:'https://amzn.to/49aKpHz',
    price:'$49.95/-',
    category:'Decoration'
  },
  {
    title:'Dragon Skeleton',
    description:'Desktop companion that shifts from memento mori to fidget piece, holding that eerie stillness between collectible and decor.',
    imageUrl:'https://m.media-amazon.com/images/I/61zsWzylJpL._AC_SL1500_.jpg',
    affiliateLink:'https://amzn.to/4aizMDJ',
    price:'$14.99/-',
    category:'Collectible'
  },
  {
    title:`Coffee Mugs`,
    description:`A midnight black skull-shaped coffee mug with spoon that brings gothic elegance to your morning ritual—dark, sleek, and unapologetically macabre.`,
    imageUrl:`https://m.media-amazon.com/images/I/71grJ5bgLNL._AC_SL1500_.jpg`,
    affiliateLink:`https://amzn.to/3N0ZmU1`,
    price:'$22.99',
    category:'Dining'
  },
  {
    title:'Black Rose Bouquet',
    description:`Black brick roses that never die, moody stems you assemble piece by piece, turning your shelf into a quiet little graveyard bouquet`,
    imageUrl:`https://m.media-amazon.com/images/I/719t6tikvkL._AC_SL1500_.jpg`,
    affiliateLink:`https://amzn.to/3Ycygf5`,
    price:`$29.99`,
    category:`Decoration`
  },
  {
    title:'Halloween Coffee Mug',
    description:`A heat reactive mug that stays black until you pour hot liquid then bloody zombie hands claw their way up from the darkness, reaching through the ceramic like they're trapped inside your morning coffee. `,
    imageUrl:`https://m.media-amazon.com/images/I/61e4+nbjsOL._AC_SL1001_.jpg`,
    affiliateLink:`https://amzn.to/499Vw2y`,
    price:`$19.99`,
    category:`Dining`
  },
  {
    title:'Skull Air Freshener',
    description:`A pair of resin sugar skulls with rose filled eyes that clip to your car vents one gold with turquoise shades, one silver with crimson blooms, breathing death into every drive.`,
    imageUrl:`https://m.media-amazon.com/images/I/71xjKt2sMuL._AC_SL1500_.jpg`,
    affiliateLink:`https://amzn.to/49pWCZ8`,
    price:`$8.99`,
    category:`Decoration`
  },
  {
    title:'Gothic Bag',
    description:`A compact black leather crossbody with a skull clasp and chain accent sleek enough for daily carry but dark enough to match the aesthetic, holds your phone and essentials while keeping both hands free for whatever trouble finds you.`,
    imageUrl:`https://m.media-amazon.com/images/I/61WZEi25zOL._AC_SY695_.jpg`,
    affiliateLink:`https://amzn.to/3MQPBrz`,
    price:`$15.99`,
    category:`Bag`
  },
  {
    title:'Witch Locket',
    description:`A black cameo locket with a raven perched on a graveyard scene bare trees, headstones, and fog trapped under glass in an ornate frame, hanging like a tiny window into somewhere the living don't belong`,
    imageUrl:`https://m.media-amazon.com/images/I/611Do77H3tL._AC_SY695_.jpg`,
    affiliateLink:`https://amzn.to/4ayD4D8`,
    price:'$8.99',
    category:'Jewelry'
  },
  {
    title:'Unscented Spine Candle',
    description:`A glossy black vertebrae column candle that burns like watching a spine slowly disintegrate—unscented soy wax molded into stacked bones, standing upright until the flame consumes it piece by piece`,
    imageUrl:'https://m.media-amazon.com/images/I/71WAHngIUXL._AC_SL1500_.jpg',
    affiliateLink:'https://amzn.to/4b7C9cT',
    price:'$14.99',
    category:'Decoration'
  }
].map((item, index) => ({ ...item, id: `${index + 1}` }));
