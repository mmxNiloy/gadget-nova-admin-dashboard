import { NavItem } from 'types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    items: [
      {
        title: 'Product',
        url: '/dashboard/product',
        icon: 'product'
      },
      {
        title: 'Product Attribute',
        url: '/dashboard/product-attribute',
        icon: 'kanban'
      },
      {
        title: 'Promotional Discount',
        url: '/dashboard/promotional-discount',
        icon: 'tag'
      }
    ]
  },
  {
    title: 'Category',
    url: '/dashboard/category',
    icon: 'category',
    items: [
      {
        title: 'Category',
        url: '/dashboard/category',
        icon: 'category'
      },
      {
        title: 'Subcategory',
        url: '/dashboard/sub-category',
        icon: 'category'
      }
    ]
  },
  {
    title: 'Brand',
    url: '/dashboard/brand',
    icon: 'hexagon'
  },
  {
    title: 'Orders',
    url: '/dashboard/order',
    icon: 'package'
  },
  {
    title: 'Web',
    url: '/dashboard/web',
    icon: 'globe',
    items: [
      {
        title: 'Promotions',
        url: '/dashboard/web/promotion'
      }
    ]
  },
  {
    title: 'Users',
    url: '/dashboard/user',
    icon: 'user'
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
