'use client';

import React from 'react';
import Lottie from 'lottie-react';
import NoItemInABoxAnim from '@/anim/no-item-in-box.json';
const NoDataAnimation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      <Lottie animationData={NoItemInABoxAnim} loop />
    </div>
  );
});

NoDataAnimation.displayName = 'NoDataAnimation';

export default NoDataAnimation;
