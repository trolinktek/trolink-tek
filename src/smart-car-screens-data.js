const source = [
  ['2524', 'Car Monitor：TAP01 CPU：V553 Screen size：10.26 inches'],
  ['2525', 'Car Monitor：TAP02 CPU：F133 Screen size：5 inches'],
  ['2618', 'Car Monitor：E5 CPU：Allwinner V851S Screen size：5 inches'],
  ['2617', 'Car Monitor：G7 CPU：Allwinner V553 Screen size：7 inches'],
  ['2616', 'Car Monitor：G5 CPU：Allwinner V851S Screen size：5 inches'],
  ['2531', 'Car Monitor：TAP03 CPU：LinYang2900 Screen size：7 inches'],
];

export const smartCarScreens = source.map(([id, title]) => ({
  id,
  title,
  category: 'Smart Car Screens',
  image: id === '2618'
    ? '/assets/products/smart-car-screens/2618-user.jpg'
    : id === '2617'
      ? '/assets/products/smart-car-screens/2617-front.jpg'
      : id === '2616'
        ? '/assets/products/smart-car-screens/2616-front.jpg'
    : `/assets/products/smart-car-screens/${id}.jpg`,
  source_url: `https://www.trolinktek.com/products/${id}.html`,
}));
