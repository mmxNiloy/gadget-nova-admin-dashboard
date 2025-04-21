import { Label } from '@/components/ui/label';
import React, { useCallback, useState } from 'react';
import ColorButton from './ColorButton';

interface IColorListProps {
  label: string;
  colors: string[];
  onColorChange?: (color: string) => void;
}

export default function ColorList({
  label,
  colors,
  onColorChange
}: IColorListProps) {
  const [currentColor, setCurrentColor] = useState<string>('#000000');

  const normalizeColor = useCallback((color: string): string => {
    const normalized = color.startsWith('#') ? color : `#${color}`;
    return normalized.length === 4
      ? `${normalized}${normalized.slice(1)}`
      : normalized;
  }, []);

  const isColorEqual = useCallback(
    (a: string, b: string): boolean =>
      normalizeColor(a).toUpperCase() === normalizeColor(b).toUpperCase(),
    [normalizeColor]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      if (onColorChange) onColorChange(color);
      setCurrentColor(color);
    },
    [onColorChange]
  );

  return (
    <>
      <Label>{label}</Label>
      <div className='grid grid-cols-9 gap-2'>
        {colors.map((item) => (
          <ColorButton
            key={item}
            active={isColorEqual(item, currentColor)}
            color={item}
            onClick={() => handleColorChange(item)}
          />
        ))}
      </div>
    </>
  );
}
