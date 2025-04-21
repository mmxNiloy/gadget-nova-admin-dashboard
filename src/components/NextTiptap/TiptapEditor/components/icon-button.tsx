'use client';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React, { HTMLAttributes, useCallback, useState } from 'react';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const IconToggleButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, onClick, title, ...props }, ref) => {
    const [isToggled, setIsToggled] = useState<boolean>(false);

    const handleToggle = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClick) onClick(e);
        setIsToggled((oldVal) => !oldVal);
      },
      [onClick]
    );

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-toggle={isToggled ? 'true' : 'false'}
              size={'icon'}
              variant={'ghost'}
              className={cn(
                'text-muted-foreground data-[toggle=true]:bg-muted/40 data-[toggle=true]:text-blue-500',
                className
              )}
              ref={ref}
              {...props}
              onClick={handleToggle}
            ></Button>
          </TooltipTrigger>

          <TooltipContent>{title ?? 'Button'}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

IconToggleButton.displayName = 'IconToggleButton';

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, title, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={'icon'}
              variant={'ghost'}
              className={className}
              ref={ref}
              {...props}
            ></Button>
          </TooltipTrigger>

          <TooltipContent>{title ?? 'Button'}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconToggleButton, IconButton };
