'use client';

import React from 'react';
import { type TooltipContentProps } from '@radix-ui/react-tooltip';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

type TooltipOptions = Pick<
  TooltipContentProps,
  | 'side'
  | 'align'
  | 'sideOffset'
  | 'alignOffset'
  | 'avoidCollisions'
  | 'collisionBoundary'
  | 'collisionPadding'
>;

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  options?: TooltipOptions;
}

const TooltipWrapper = React.forwardRef<HTMLButtonElement, TooltipProps>(
  ({ children, content, options, ...triggerProps }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger ref={ref} asChild {...triggerProps}>
            {children}
          </TooltipTrigger>

          <TooltipContent side={'top'} align={'center'} {...options}>
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

TooltipWrapper.displayName = 'Tooltip';

export default TooltipWrapper;
