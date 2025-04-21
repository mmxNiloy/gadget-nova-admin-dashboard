import React from 'react';
import TooltipWrapper from '../ui/Tooltip';
import { cn } from '@/lib/utils';

interface ColorButtonProps {
  color: string;
  active?: boolean;
  tooltip?: boolean;
  onClick?: (color: string) => void;
}

const ColorButton = ({
  color,
  tooltip = true,
  active,
  onClick
}: ColorButtonProps) => {
  const content = (
    <button
      type='button'
      tabIndex={-1}
      data-active={active ? 'true' : undefined}
      className={cn(
        'size-5 rounded-sm ring-blue-500 ring-offset-1 transition-transform hover:scale-110 data-[active=true]:ring'
      )}
      style={{ background: color }}
      onClick={() => onClick?.(color)}
    />
  );
  return tooltip ? (
    <TooltipWrapper content={color}>{content}</TooltipWrapper>
  ) : (
    content
  );
};

export default ColorButton;
