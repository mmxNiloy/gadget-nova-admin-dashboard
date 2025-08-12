export const SitePaymentMethods = [
  { title: 'Apple Pay', link: '/payment/apple-pay.svg' },
  { title: 'Visa', link: '/payment/visa.svg' },
  { title: 'Discover', link: '/payment/discover.svg' },
  { title: 'Master Card', link: '/payment/master-card.svg' },
  { title: 'Secure Payment', link: '/payment/secure-payment.svg' }
];

export type PaymentMethod = 'COD' | 'SSL' | 'BKASH';

export const getPaymentMethodTitle = (method?: PaymentMethod) => {
  if (!method) return 'Unspecified';
  return AllowedPaymentMethods.find((pMethod) => pMethod.value === method)
    ?.title;
};

interface PaymentMethodMedia {
  alt: string;
  src: string;
}

export interface IPaymentMethod {
  title: string;
  value: PaymentMethod;
  images?: PaymentMethodMedia[];
}

export const AllowedPaymentMethods: IPaymentMethod[] = [
  {
    title: 'Cash on Delivery',
    value: 'COD'
  },
  // {
  //   title: 'SSLCommerz',
  //   value: 'SSL'
  // },
  {
    title: 'bKash',
    value: 'BKASH',
    images: [
      { src: '/payment/bkash.svg', alt: 'bKash' }
      // { src: '/payment/nagad.svg', alt: 'Nagad' }
    ]
  }
];
