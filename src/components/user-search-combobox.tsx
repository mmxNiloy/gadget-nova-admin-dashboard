'use client';

import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { LabelledComboBox, LabelledComboboxProps } from './ui/combobox';
import { useDebounceCallback } from 'usehooks-ts';
import { IUserBase } from 'types/schema/user.schema';
import getUsers from '@/app/(server)/actions/user/get-users.controller';

interface IUserSearchComboboxProps
  extends Omit<LabelledComboboxProps, 'items'> {
  defaultUser?: IUserBase;
}

const UserSearchCombobox = React.forwardRef<
  HTMLInputElement,
  IUserSearchComboboxProps
>(
  (
    { className, name, required, disabled, onValueChange, defaultUser, value },
    ref
  ) => {
    const [users, setUsers] = useState<IUserBase[]>(
      defaultUser ? [defaultUser] : []
    );
    const [loading, startSearch] = useTransition();

    const handleSearch = useCallback((search: string) => {
      startSearch(async () => {
        const result = await getUsers({
          page: 1,
          limit: 5,
          search
        });

        if (!result.ok) setUsers([]);
        else setUsers(result.data.payload);
      });
    }, []);

    const handleSearchChange = useDebounceCallback(
      (search: string) => handleSearch(search),
      300
    );

    useEffect(() => {
      handleSearch('');
      if (defaultUser) setUsers((oldVal) => [defaultUser, ...oldVal]);
    }, [defaultUser, handleSearch]);

    return (
      <LabelledComboBox
        ref={ref}
        shouldFilter={false}
        items={users.map((user) => ({
          value: user.id,
          label: user.name,
          image: user.image
        }))}
        onSearchChange={handleSearchChange}
        loading={loading}
        label='Search user...'
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
UserSearchCombobox.displayName = 'UserSearchCombobox';

export default UserSearchCombobox;
