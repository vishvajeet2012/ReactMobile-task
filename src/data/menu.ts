export const bestSellers = [
  { id: 'sushi', price: '$103.0', image: require('@/assets/images/fastor/best-sushi.png') },
  { id: 'bowl', price: '$50.0', image: require('@/assets/images/fastor/best-bowl.png') },
  { id: 'lasagna', price: '$12.99', image: require('@/assets/images/fastor/best-lasagna.png') },
  { id: 'cupcake', price: '$8.20', image: require('@/assets/images/fastor/best-cupcake.png') },
] as const;

export const popularItems = [
  {
    id: 'shake',
    name: 'Strawberry Shake',
    price: '₹20.00',
    date: '29 Nov, 01:20 pm',
    count: '2 items',
    cancelFilled: true,
    image: require('@/assets/images/fastor/shake.png'),
  },
  {
    id: 'burger',
    name: 'Chicken Burger',
    price: '₹20.00',
    date: '17 Oct, 01:20 pm',
    count: '1 item',
    cancelFilled: true,
    image: require('@/assets/images/fastor/burger.png'),
  },
  {
    id: 'sushi-wave',
    name: 'Sushi Wave',
    price: '$20.00',
    date: '22 Apr, 01:20 pm',
    count: '2 items',
    cancelFilled: false,
    image: require('@/assets/images/fastor/best-sushi.png'),
  },
  {
    id: 'shake-2',
    name: 'Strawberry Shake',
    price: '$20.00',
    date: '29 Nov, 01:20 pm',
    count: '1 items',
    cancelFilled: false,
    image: require('@/assets/images/fastor/shake-2.png'),
  },
] as const;

export const portions = [
  { id: 'personal', label: 'Personal (4 Slides)', price: '$0.00' },
  { id: 'medium', label: 'Medium (8 Slides)', price: '$3.00' },
  { id: 'familiar', label: 'Familiar (10 Slides)', price: '$6.00' },
  { id: 'jumbo', label: 'Jumbo (12 Slides)', price: '$10.00' },
] as const;
