import React, { useCallback, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Icon from '../ui/Icon';
import Label from '../ui/Label';
import Input from '../ui/Input';
import ColorButton from './ColorButton';
import { MORE_COLORS, COLORS } from '../../constants/color';
import { PopoverClose } from '@radix-ui/react-popover';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  color: string;
  onChange?: (value: string) => void;
  onReset?: () => void;
}

const ColorPicker = (props: ColorPickerProps) => {
  const [activeTab, setActiveTab] = useState<'swatches' | 'custom'>('swatches');
  const [hexpickerColor, setHexpickerColor] = useState(props.color);

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

  const handleApply = useCallback(
    (color: string) => {
      const regex = /^#?[0-9A-F]{3,6}$/i;
      if (color && regex.test(color)) {
        props.onChange?.(normalizeColor(color));
      }
    },
    [normalizeColor, props]
  );

  const handleApplyHex = useCallback(() => {
    handleApply(hexpickerColor);
  }, [handleApply, hexpickerColor]);

  const handleColorChange = useCallback((color: string) => {
    setHexpickerColor(color);
  }, []);

  const renderColorList = (colors: string[], label: string) => (
    <div>
      <Label as='span'>{label}</Label>
      <div className='grid grid-cols-9 gap-2'>
        {colors.map((item) => (
          <ColorButton
            key={item}
            active={isColorEqual(item, hexpickerColor)}
            color={item}
            onClick={() => handleApply(item)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className='flex flex-col'>
      <div className='flex border-b'>
        {['swatches', 'custom'].map((tab) => (
          <Button
            key={tab}
            variant='ghost'
            data-active={activeTab === tab || undefined}
            onClick={() => setActiveTab(tab as 'swatches' | 'custom')}
            className={`relative w-full rounded-none text-sm data-[active=true]:border-b-2 data-[active=true]:border-b-blue-500`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      <div className='py-2'>
        {activeTab === 'swatches' && (
          <div className='flex flex-col gap-2.5'>
            {renderColorList(COLORS, 'Default Colors')}
            {renderColorList(MORE_COLORS, 'More Colors')}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className='flex flex-col gap-2.5'>
            <HexColorPicker
              style={{ width: '100%' }}
              onChange={handleColorChange}
            />
            <div className='flex items-center gap-2'>
              <ColorButton color={hexpickerColor} tooltip={false} />
              <Input
                value={hexpickerColor}
                style={{ textTransform: 'uppercase' }}
                onChange={(e) => handleColorChange(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      <PopoverClose asChild>
        <div className='mb-2 mt-0.5 flex gap-2 py-2'>
          <Button
            variant='ghost'
            onClick={props.onReset}
            className='flex-grow gap-1'
          >
            <Icon name='PaletteOff' /> Clear
          </Button>
          {activeTab === 'custom' && (
            <Button
              className='flex-grow bg-blue-500 text-white hover:bg-blue-600'
              onClick={handleApplyHex}
            >
              Apply
            </Button>
          )}
        </div>
      </PopoverClose>
    </div>
  );
};

export default ColorPicker;
