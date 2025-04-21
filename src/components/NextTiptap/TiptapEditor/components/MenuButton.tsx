'use client';

import React, { HTMLAttributes, memo, useMemo } from 'react';

import TooltipWrapper from './ui/Tooltip';
import Icon, { type IconProps } from './ui/Icon';
import { getShortcutKey } from '../utils/shortcut';
import { useTiptapContext } from './Provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

interface MenuButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: IconProps['name'];
  type?: 'button' | 'dropdown' | 'popover';
  disabled?: boolean;
  text?: string;
  active?: boolean;
  shortcuts?: string[];
  hideText?: boolean;
  hideArrow?: boolean;
  tooltip?: string | boolean;
  buttonClass?: string;
  dropdownClass?: string;
}

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    {
      active,
      icon,
      text,
      shortcuts,
      className,
      children,
      type,
      hideText = true,
      hideArrow = false,
      tooltip = true,
      buttonClass,
      dropdownClass,
      disabled,
      ...props
    },
    ref
  ) => {
    const { editor, contentElement } = useTiptapContext();

    const hasArrowIcon =
      type === 'dropdown' || (type === 'popover' && !hideArrow);
    const hasIconOnly = hideText && !hasArrowIcon;

    const tooltipContent = useMemo(() => {
      if (tooltip === false) return null;
      const content = {
        title: typeof tooltip === 'string' ? tooltip : text,
        shortcuts: shortcuts
          ? `(${shortcuts.map(getShortcutKey).join(' + ')})`
          : ''
      };

      return `${content.title} ${content.shortcuts}`;
    }, [tooltip, text, shortcuts]);

    const renderIcon = useMemo(
      () => (icon ? <Icon name={icon} /> : null),
      [icon]
    );

    const renderButton = (
      <Button
        autoFocus={false}
        ref={ref}
        type={'button'}
        variant='ghost'
        className={cn(
          'relative gap-1 px-2 text-secondary-foreground',
          active && 'bg-muted/40 text-blue-500',
          buttonClass
        )}
        disabled={!editor.isEditable || disabled}
        {...props}
      >
        {!hasIconOnly && renderIcon}
        {hasIconOnly ? renderIcon : !hideText && text}
        {hasArrowIcon && (
          <span className='ml-0.5 flex items-center justify-center'>
            <Icon name='ChevronDown' size={16} />
          </span>
        )}
      </Button>
    );

    const renderContent = tooltipContent ? (
      <TooltipWrapper
        content={tooltipContent}
        options={{ collisionBoundary: contentElement.current?.parentElement }}
      >
        {renderButton}
      </TooltipWrapper>
    ) : (
      renderButton
    );

    if (type === 'dropdown') {
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{renderContent}</DropdownMenuTrigger>
          <DropdownMenuContent className={cn('w-fit', dropdownClass)}>
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (type === 'popover') {
      return (
        <Popover modal={false}>
          <PopoverTrigger asChild>{renderContent}</PopoverTrigger>
          <PopoverContent className={cn('w-fit', dropdownClass)}>
            {children}
          </PopoverContent>
        </Popover>
      );
    }

    return renderContent;
  }
);

MenuButton.displayName = 'MenuButton';

export default memo(MenuButton);
