import updateDeliveryCharge from '@/app/(server)/actions/order/district/update-delivery-charge.controller';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import makeErrorMessage from '@/lib/util/make-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Loader2, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DeliveryChargeSchema, IDistrict } from 'types/schema/order.schema';
import { z } from 'zod';

interface CellActionProps {
  data: IDistrict;
}

type FormType = z.infer<typeof DeliveryChargeSchema>;

export default function CellAction({ data }: CellActionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, startAction] = useTransition();

  const router = useRouter();

  const form = useForm<FormType>({
    defaultValues: {
      delivery_charge: data.delivery_charge
    },
    resolver: zodResolver(DeliveryChargeSchema),
    disabled: loading
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      startAction(async () => {
        try {
          const res = await updateDeliveryCharge(data.id, values);

          if (!res.ok) {
            toast.error(`Update Failed! Cause: ${makeErrorMessage(res.error)}`);
            return;
          }

          toast.success('Update Successful!');
          setOpen(false);
          router.refresh();
        } catch (err) {
          toast.error('Something went wrong!');
          console.log('Update District Dialog > onSubmit', err);
        }
      });
    },
    [data.id, router]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='icon' className='[&_svg]:size-4' variant={'ghost'}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update District</DialogTitle>
          <DialogDescription>
            Update the delivery charge for {data.name}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex flex-col gap-3'>
              <Label>District</Label>
              <Input readOnly value={data.name} />
            </div>
            <FormField
              control={form.control}
              name='delivery_charge'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Charge</FormLabel>
                  <FormControl>
                    <div className='relative flex'>
                      <Input
                        key={`${data.id}-${data.delivery_charge}`}
                        disabled={loading}
                        type='number'
                        step='0.01'
                        placeholder='Delivery Charge'
                        className='pl-10'
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                      <p className='absolute left-2 self-center justify-self-center text-xs lg:text-sm'>
                        BDT
                      </p>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className='gap-4'>
              <Button
                className='gap-1 bg-green-500 text-white hover:bg-green-500/90'
                type='submit'
                disabled={loading}
              >
                {loading ? <Loader2 className='animate-spin' /> : <Send />}
                {loading ? 'Updating...' : 'Update'}
              </Button>
              <DialogClose asChild>
                <Button
                  type='button'
                  className='bg-red-300 text-white hover:bg-red-300/90'
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
