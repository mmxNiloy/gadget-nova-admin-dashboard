'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Icons from '@/components/ui/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import React, { HTMLAttributes, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface RangedDatePickerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  name?: string;
  required?: boolean;
  requireRangeEnd?: boolean;
  defaultStartDate?: string;
  defaultEndDate?: string;
  value?: DateRange;
  onValueChange?: (dateRange?: DateRange) => void;
  disabled?: boolean;
}

const RangedDatePicker = React.forwardRef<
  HTMLButtonElement,
  RangedDatePickerProps
>(
  (
    {
      className,
      name,
      required,
      requireRangeEnd,
      onValueChange,
      value,
      defaultStartDate,
      defaultEndDate,
      ...props
    },
    ref
  ) => {
    const [date, setDate] = useState<DateRange | undefined>(value);

    return (
      <>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              id='date'
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                className
              )}
              {...props}
            >
              <Icons.calendar className='mr-2 h-4 w-4' />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              initialFocus
              mode='range'
              captionLayout='dropdown-buttons'
              defaultMonth={date?.from}
              selected={date}
              onSelect={(mDate) => {
                if (onValueChange) {
                  onValueChange(mDate);
                }
                setDate(mDate);
              }}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </>
    );
  }
);
RangedDatePicker.displayName = 'RangedDatePicker';

export { RangedDatePicker };
