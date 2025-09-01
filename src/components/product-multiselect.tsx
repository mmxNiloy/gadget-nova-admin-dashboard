'use client';

import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { Button, ButtonProps } from './ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput
} from './ui/command';
import { IProduct } from 'types/schema/product.shema';
import getPaginatedProducts from '@/app/(server)/actions/product/get-paginated-product.controller';
import ProductPreviewCardSkeleton from './product-preview-card-skeleton';
import NoDataAnimation from './anim/no-data-anim';
import ProductPreviewCard from './product-preview-card';
import getProductsByIdList from '@/app/(server)/actions/product/get-products-by-id-list.controller';

interface ProductMultiselectProps extends ButtonProps {
  placeholder?: string;
  value?: string[];
  onValueChanged?: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductMultiselect = React.forwardRef<
  HTMLButtonElement,
  ProductMultiselectProps
>(
  (
    { className, value, onValueChanged, placeholder, onClick, ...props },
    ref
  ) => {
    const [open, setOpen] = useState<boolean>(false);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
    const [loading, startProductSearch] = useTransition();

    const handleToggle = useCallback(() => {
      setOpen((oldVal) => !oldVal);
    }, []);

    const handleSearchChange = useCallback((search: string) => {
      startProductSearch(async () => {
        const prods = await getPaginatedProducts({
          page: 1,
          limit: 5,
          title: search
        });

        if (!prods.ok) {
          setProducts([]);
        } else {
          setProducts(prods.data.payload);
        }
      });
    }, []);

    const handleItemSelect = useCallback(
      (id: string) => {
        if (!onValueChanged) return;
        onValueChanged((oldValues) => {
          return Array.from(new Set([...oldValues, id]));
        });
      },
      [onValueChanged]
    );

    const handleItemRemove = useCallback(
      (id: string) => {
        if (!onValueChanged) return;
        onValueChanged((oldValues) => {
          return oldValues.filter((val) => val !== id);
        });
      },
      [onValueChanged]
    );

    const [refetching, startRefetch] = useTransition();

    const refetchSelectedProducts = useCallback(() => {
      if (!value || value.length < 1) {
        setSelectedProducts([]);
        return;
      }

      startRefetch(async () => {
        const prods = await getProductsByIdList(value);
        if (!prods.ok) {
          setSelectedProducts([]);
        } else {
          setSelectedProducts(prods.data.payload);
        }
      });
    }, [value]);

    const handleClear = useCallback(() => {
      if (!onValueChanged) return;
      onValueChanged([]);
    }, [onValueChanged]);

    useEffect(() => {
      refetchSelectedProducts();
    }, [refetchSelectedProducts]);

    useEffect(() => {
      handleSearchChange('');
    }, [handleSearchChange]);

    return (
      <>
        <Button
          ref={ref}
          className={className}
          onClick={handleToggle}
          {...props}
        ></Button>

        {/* Show a list of selected products, max: 3 */}

        {selectedProducts.length > 0 && (
          <div className='flex flex-col gap-2'>
            <div className='flex h-40 w-full flex-col gap-2 overflow-y-scroll'>
              {selectedProducts.map((prod) => (
                <ProductPreviewCard
                  key={`prod-preview-${prod.id}`}
                  data={prod}
                  size='sm'
                  onRemove={handleItemRemove}
                  disabled={refetching}
                />
              ))}
            </div>

            {selectedProducts.length > 3 && (
              <div className='flex items-center gap-2'>
                <span className='text-sm'>
                  {selectedProducts.length} selected
                </span>
              </div>
            )}

            <Button size='sm' className='mt-2 w-full' onClick={handleClear}>
              Clear
            </Button>
          </div>
        )}

        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command
            shouldFilter={false}
            className='flex flex-col gap-4 rounded-lg border px-8 py-4 shadow-md md:min-w-[450px]'
          >
            <CommandInput
              onValueChange={handleSearchChange}
              placeholder='Search products...'
            />

            {loading && (
              <div className='flex h-[70vh] flex-col gap-2 overflow-x-clip overflow-y-scroll'>
                {Array.from({ length: 10 }, (_, idx) => idx).map((idx) => (
                  <ProductPreviewCardSkeleton
                    key={`prod-preview-skeleton-${idx}`}
                  />
                ))}
              </div>
            )}

            {/* Empty list */}
            {products.length < 1 && !loading && (
              <CommandEmpty className='h-[70vh] py-6 text-center text-sm text-gray-500'>
                <div className='flex h-full flex-col items-center justify-center gap-4'>
                  <NoDataAnimation className='aspect-square w-80' />
                  <p className='animate-pulse text-2xl'>No products found!</p>
                </div>
              </CommandEmpty>
            )}

            {/* Product list */}
            {products.length > 0 && !loading && (
              <div className='flex h-[70vh] flex-col gap-2 overflow-x-clip overflow-y-scroll'>
                {products.map((prod) => (
                  <ProductPreviewCard
                    onClick={handleItemSelect}
                    key={prod.id}
                    data={prod}
                  />
                ))}
              </div>
            )}
          </Command>
        </CommandDialog>
      </>
    );
  }
);

ProductMultiselect.displayName = 'ProductMultiselect';

export { ProductMultiselect };
