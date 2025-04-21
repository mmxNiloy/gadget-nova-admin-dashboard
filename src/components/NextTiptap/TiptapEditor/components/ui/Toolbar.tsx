import React, { HTMLProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type ToolbarProps = {
  dense?: boolean;
  vertical?: boolean;
} & HTMLProps<HTMLDivElement>;

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ children, dense, vertical = false, className, ...rest }, ref) => {
    return (
      <div
        className={cn(
          'flex flex-wrap items-center gap-1 p-1',
          dense && 'p-0.5',
          vertical && 'flex-col',
          className
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Toolbar.displayName = 'Toolbar';

export type ToolbarDividerProps = {
  horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ horizontal, className, ...rest }, ref) => {
    return (
      <div
        className={cn(
          'mx-0 my-1 h-5 w-px flex-shrink-0 bg-neutral-200 dark:bg-neutral-800',
          horizontal && 'mx-1 my-0 h-px w-full',
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);

ToolbarDivider.displayName = 'Toolbar.Divider';

export { Toolbar, ToolbarDivider };
