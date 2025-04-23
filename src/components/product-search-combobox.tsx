'use client';

import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { IProduct } from 'types/schema/product.shema';
import { LabelledComboBox, LabelledComboboxProps } from './ui/combobox';
import getPaginatedProducts from '@/app/(server)/actions/product/get-paginated-product.controller';
import { useDebounceCallback } from 'usehooks-ts';

interface IProductSearchComboboxProps
  extends Omit<LabelledComboboxProps, 'items'> {
  defaultProduct?: IProduct;
}

const ProductSearchCombobox = React.forwardRef<
  HTMLInputElement,
  IProductSearchComboboxProps
>(
  (
    {
      className,
      name,
      required,
      disabled,
      onValueChange,
      defaultProduct,
      value
    },
    ref
  ) => {
    const [products, setProducts] = useState<IProduct[]>(
      defaultProduct ? [defaultProduct] : []
    );
    const [loading, startSearch] = useTransition();

    const handleSearch = useCallback((search: string) => {
      startSearch(async () => {
        const result = await getPaginatedProducts({
          page: 1,
          limit: 5,
          title: search
        });

        if (!result.ok) setProducts([]);
        else setProducts(result.data.payload);
      });
    }, []);

    const handleSearchChange = useDebounceCallback(
      (search: string) => handleSearch(search),
      300
    );

    useEffect(() => {
      handleSearch('');
      if (defaultProduct) setProducts((oldVal) => [defaultProduct, ...oldVal]);
    }, [defaultProduct, handleSearch]);

    return (
      <LabelledComboBox
        ref={ref}
        shouldFilter={false}
        items={products.map((prod) => ({
          value: prod.id,
          label: prod.title,
          image: prod.thumbnail
        }))}
        onSearchChange={handleSearchChange}
        loading={loading}
        label='Search product...'
        className={className}
        value={value}
        onValueChange={onValueChange}
        name={name}
        required={required}
        disabled={disabled}
      />
    );
  }
);
ProductSearchCombobox.displayName = 'ProductSearchCombobox';

export default ProductSearchCombobox;
