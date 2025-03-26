import React, { HTMLAttributes } from 'react';

const BDTSymbol = React.forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span className={className} {...props} ref={ref}>
    &#x09F3;
  </span>
));
BDTSymbol.displayName = 'BDTSymbol';

const USDSymbol = React.forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span className={className} {...props} ref={ref}>
    $
  </span>
));
USDSymbol.displayName = 'USDSymbol';

export const CurrencySymbols = {
  usd: USDSymbol,
  bdt: BDTSymbol,
  default: BDTSymbol
};
