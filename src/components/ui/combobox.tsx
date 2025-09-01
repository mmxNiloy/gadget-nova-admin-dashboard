'use client';
import React, { useCallback, useState } from 'react';
import { Popover, PopoverTrigger } from './popover';
import { Button } from './button';
import Icons from './icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from './command';
import { cn } from '@/lib/utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { AvatarPicker } from './avatar-picker';
import { Skeleton } from './skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip';

export interface ComboboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  items: string[];
  onValueChange?: (value: string) => void;
  contentClassName?: string;
  shouldFilter?: boolean;
  onSearchChange?: (searchVal: string) => void;
  loading?: boolean;
}

const ComboBox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      className,
      type,
      shouldFilter = true,
      onSearchChange,
      loading,
      value,
      ...props
    },
    ref
  ) => {
    const { label, placeholder, items, onValueChange, contentClassName } =
      props;
    const [selectedValue, setSelectedValue] = useState<string>(
      ((props.defaultValue as string) ?? value ?? '').trim()
    );
    const [open, setOpen] = useState<boolean>(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={props.disabled || props.readOnly} asChild>
          <Button
            variant={'outline'}
            role='combobox'
            className={cn(className, 'justify-between')}
          >
            <input
              tabIndex={-1}
              readOnly
              type={type}
              value={selectedValue}
              placeholder={
                selectedValue.length > 0
                  ? selectedValue
                  : (label ?? 'Select an option')
              }
              className='flex-grow cursor-pointer border-none bg-transparent caret-transparent hover:bg-transparent focus:outline-none enabled:placeholder:text-foreground'
              ref={ref}
              {...props}
            />
            {/* {selectedValue.length > 0
                ? selectedValue
                : label ?? "Select an option"} */}
            <Icons.chevronsUpDown className='size-4 text-muted-foreground' />
          </Button>
        </PopoverTrigger>
        <PopoverPrimitive.Content
          align={'center'}
          sideOffset={4}
          className={cn(
            'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            contentClassName
          )}
        >
          <Command className='max-h-72' shouldFilter={shouldFilter}>
            <CommandInput
              placeholder={placeholder ?? 'Search...'}
              onValueChange={onSearchChange}
            />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup>
                {loading && (
                  <p className='py-2 text-center text-xs sm:text-sm'>
                    Searching...
                  </p>
                )}

                {items.map((item, index) => (
                  <CommandItem
                    onSelect={() => {
                      setSelectedValue(item);
                      setOpen(false);

                      if (onValueChange) onValueChange(item);
                    }}
                    key={`${item}-#${index}`}
                    value={item}
                  >
                    {selectedValue === item && (
                      <Icons.check className='mr-2 size-4' />
                    )}
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverPrimitive.Content>
      </Popover>
    );
  }
);
ComboBox.displayName = 'Combobox';

export interface LabelledComboboxProps extends Omit<ComboboxProps, 'items'> {
  items: {
    label: string;
    value: string;
    image?: string;
  }[];
}

const LabelledComboBox = React.forwardRef<
  HTMLInputElement,
  LabelledComboboxProps
>(
  (
    {
      className,
      type,
      shouldFilter = true,
      onSearchChange,
      loading,
      value,
      ...props
    },
    ref
  ) => {
    const { label, placeholder, items, onValueChange, contentClassName } =
      props;
    const [selectedValue, setSelectedValue] = useState<string>(
      ((props.defaultValue as string) ?? value ?? '').trim()
    );
    const [open, setOpen] = useState<boolean>(false);

    const filterByLabel = useCallback(
      (value: string, search: string) => {
        const item = items.find((i) => i.value === value);
        if (!item) return 0;
        return item.label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
      },
      [items]
    );

    return (
      <>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger disabled={props.disabled || props.readOnly} asChild>
            <Button
              variant={'outline'}
              role='combobox'
              className={cn(className, 'justify-between')}
            >
              <input
                readOnly
                className='flex-grow cursor-pointer border-none bg-transparent caret-transparent hover:bg-transparent focus:outline-none enabled:placeholder:text-foreground'
                required={props.required}
                tabIndex={-1}
                value={
                  items.find((item) => item.value === selectedValue)?.label ??
                  undefined
                }
                placeholder={
                  selectedValue.length > 0
                    ? (items.find((item) => item.value === selectedValue)
                        ?.label ?? label)
                    : (label ?? 'Select an option')
                }
              />
              <input
                tabIndex={-1}
                readOnly
                type={type}
                value={selectedValue}
                placeholder={
                  selectedValue.length > 0
                    ? (items.find((item) => item.value === selectedValue)
                        ?.label ?? label)
                    : (label ?? 'Select an option')
                }
                className='sr-only flex-grow cursor-pointer border-none bg-transparent caret-transparent hover:bg-transparent focus:outline-none'
                ref={ref}
                {...props}
              />
              {/* {selectedValue.length > 0
                ? selectedValue
                : label ?? "Select an option"} */}
              <Icons.chevronsUpDown className='size-4 text-muted-foreground' />
            </Button>
          </PopoverTrigger>
          <PopoverPrimitive.Content
            align={'center'}
            sideOffset={4}
            className={cn(
              'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              contentClassName
            )}
          >
            <Command
              filter={filterByLabel}
              shouldFilter={shouldFilter}
              className='max-h-72'
            >
              <CommandInput
                placeholder={placeholder ?? 'Search...'}
                onValueChange={onSearchChange}
              />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup>
                  {loading && (
                    <p className='py-2 text-center text-xs sm:text-sm'>
                      Searching...
                    </p>
                  )}

                  {items.map((item, index) => (
                    <CommandItem
                      onSelect={() => {
                        setSelectedValue(item.value);
                        setOpen(false);

                        if (onValueChange) onValueChange(item.value);
                      }}
                      key={`${item}-#${index}`}
                      value={item.value}
                      className={cn(
                        'cursor-pointer',
                        selectedValue === item.value &&
                          'bg-blue-300/40 hover:bg-blue-300/50'
                      )}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger type='button'>
                            <div className='flex items-center gap-1 text-start'>
                              {item.image && (
                                <AvatarPicker
                                  skeleton={<Skeleton className='size-full' />}
                                  variant='square'
                                  className='w-10 flex-shrink-0 p-0.5'
                                  src={item.image}
                                  readOnly
                                />
                              )}
                              <p className='line-clamp-2 overflow-clip text-ellipsis'>
                                {item.label}
                              </p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{item.label}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverPrimitive.Content>
        </Popover>
      </>
    );
  }
);
LabelledComboBox.displayName = 'LabelledCombobox';

export interface LabelledMultiselectComboBoxProps
  extends LabelledComboboxProps {
  value?: string[];
  defaultValue?: string[];
}

const LabelledMultiselectComboBox = React.forwardRef<
  HTMLInputElement,
  LabelledMultiselectComboBoxProps
>(
  (
    {
      className,
      type,
      shouldFilter = true,
      onSearchChange,
      loading,
      value,
      ...props
    },
    ref
  ) => {
    const { label, placeholder, items, onValueChange, contentClassName } =
      props;
    const [selectedValues, setSelectedValues] = useState<string[]>(
      value ?? props.defaultValue ?? []
    );
    const [open, setOpen] = useState<boolean>(false);

    const filterByLabel = useCallback(
      (value: string, search: string) => {
        const item = items.find((i) => i.value === value);
        if (!item) return 0;
        return item.label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
      },
      [items]
    );

    return (
      <>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger disabled={props.disabled || props.readOnly} asChild>
            <Button
              variant={'outline'}
              role='combobox'
              className={cn(className, 'justify-between')}
            >
              <input
                readOnly
                className='flex-grow cursor-pointer border-none bg-transparent caret-transparent hover:bg-transparent focus:outline-none enabled:placeholder:text-foreground'
                required={props.required}
                tabIndex={-1}
                value={
                  items.find((item) => selectedValues.includes(item.value))
                    ?.label ?? undefined
                }
                placeholder={
                  selectedValues.length > 0
                    ? (items.find((item) => selectedValues.includes(item.value))
                        ?.label ?? label)
                    : (label ?? 'Select an option')
                }
              />
              <input
                tabIndex={-1}
                readOnly
                type={type}
                value={selectedValues}
                placeholder={
                  selectedValues.length > 0
                    ? (items.find((item) => selectedValues.includes(item.value))
                        ?.label ?? label)
                    : (label ?? 'Select an option')
                }
                className='sr-only flex-grow cursor-pointer border-none bg-transparent caret-transparent hover:bg-transparent focus:outline-none'
                ref={ref}
                {...props}
              />
              {/* {selectedValue.length > 0
                ? selectedValue
                : label ?? "Select an option"} */}
              <Icons.chevronsUpDown className='size-4 text-muted-foreground' />
            </Button>
          </PopoverTrigger>
          <PopoverPrimitive.Content
            align={'center'}
            sideOffset={4}
            className={cn(
              'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              contentClassName
            )}
          >
            <Command
              filter={filterByLabel}
              shouldFilter={shouldFilter}
              className='max-h-72'
            >
              <CommandInput
                placeholder={placeholder ?? 'Search...'}
                onValueChange={onSearchChange}
              />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup>
                  {loading && (
                    <p className='py-2 text-center text-xs sm:text-sm'>
                      Searching...
                    </p>
                  )}

                  {items.map((item, index) => (
                    <CommandItem
                      onSelect={() => {
                        setSelectedValues((oldValues) => [
                          ...oldValues,
                          item.value
                        ]);
                        setOpen(false);

                        if (onValueChange) onValueChange(item.value);
                      }}
                      key={`${item}-#${index}`}
                      value={item.value}
                      className={cn(
                        'cursor-pointer',
                        selectedValues.includes(item.value) &&
                          'bg-blue-300/40 hover:bg-blue-300/50'
                      )}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger type='button'>
                            <div className='flex items-center gap-1 text-start'>
                              {item.image && (
                                <AvatarPicker
                                  skeleton={<Skeleton className='size-full' />}
                                  variant='square'
                                  className='w-10 flex-shrink-0 p-0.5'
                                  src={item.image}
                                  readOnly
                                />
                              )}
                              <p className='line-clamp-2 overflow-clip text-ellipsis'>
                                {item.label}
                              </p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{item.label}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverPrimitive.Content>
        </Popover>
      </>
    );
  }
);
LabelledMultiselectComboBox.displayName = 'LabelledMultiselectCombobox';

export { ComboBox, LabelledComboBox, LabelledMultiselectComboBox };
