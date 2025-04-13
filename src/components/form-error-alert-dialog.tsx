'use client';

import React from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { FieldErrors } from 'react-hook-form';

interface IFormErrorAlertDialogProps {
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FieldErrors;
}

export default function FormErrorAlertDialog({
  open,
  onOpenChange,
  errors
}: IFormErrorAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger className='hidden'>Show Error</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Invalid Form</AlertDialogTitle>
          <AlertDialogDescription>
            The form has errors. Please resolve them before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <p className='text-semibold'>Errors</p>
        <ScrollArea className='max-h-52'>
          <ul className='list-inside list-disc text-sm text-red-500'>
            {Object.entries(errors).map(([key, value]) => (
              <li key={key}>{`${value?.message}`}</li>
            ))}
          </ul>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button>OK</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
