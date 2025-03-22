'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { Options } from 'nuqs';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../select';

interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FilterBoxProps {
  filterKey: string;
  title: string;
  options: FilterOption[];
  setFilterValue: (
    value: string | ((old: string) => string | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>;
  filterValue: string;
}

export function DataTableFilterSelect({
  filterKey,
  title,
  options,
  setFilterValue,
  filterValue
}: FilterBoxProps) {
  const selectedValue = React.useMemo(() => {
    if (!filterValue) return undefined;
    return filterValue;
  }, [filterValue]);

  const resetFilter = () => setFilterValue(null);

  return (
    <Select
      defaultValue={selectedValue}
      onValueChange={(val) => setFilterValue(val)}
    >
      <SelectTrigger>
        <SelectValue placeholder={`Select ${title}`} />
      </SelectTrigger>

      <SelectContent className='w-[200px] p-0' align='start'>
        <SelectGroup>
          <SelectLabel>Select an option</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
