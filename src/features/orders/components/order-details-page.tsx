import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { CurrencySymbols } from '@/constants/currency-symbol';
import { format } from 'date-fns';
import { Package, Truck } from 'lucide-react';
import React from 'react';
import { IOrder } from 'types/schema/order.schema';

interface IOrderViewPageProps {
  data: IOrder;
}

export default function OrderViewPage({ data }: IOrderViewPageProps) {
  return (
    <div className='flex h-[calc(100dvh-6rem)] flex-col md:flex-row'>
      {/* Sidebar */}
      <div className='w-full bg-gradient-to-b from-orange-50 to-white p-6 md:w-1/3'>
        <div className='space-y-6'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>
              Order #{data.id.slice(0, 8)}
            </h2>
            <p className='text-sm text-gray-500'>
              Placed on {format(new Date(data.created_at), 'PPP')}
            </p>
            <Badge
              variant={data.status === 'Delivered' ? 'default' : 'secondary'}
              className='mt-2'
            >
              {data.status}
            </Badge>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <CurrencySymbols.default className='h-5 w-5 text-orange-500' />

              <div>
                <p className='text-sm font-medium'>Total</p>
                <p className='text-lg font-semibold'>
                  <CurrencySymbols.default />
                  {parseFloat(data.totalPrice).toFixed(2)}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Package className='h-5 w-5 text-orange-500' />
              <div>
                <p className='text-sm font-medium'>Items</p>
                <p className='text-lg font-semibold'>
                  {data.cart.items.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className='w-full p-6 md:w-2/3'>
        <Card className='border-none shadow-none'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-2'>
              <Truck className='h-5 w-5 text-orange-500' />
              <h3 className='text-xl font-semibold'>Shipping Information</h3>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-12 w-12'>
                <AvatarFallback>
                  {data.shippingInfo.first_name[0]}
                  {data.shippingInfo.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium'>
                  {data.shippingInfo.first_name} {data.shippingInfo.last_name}
                </p>
                <p className='text-sm text-gray-500'>
                  {data.shippingInfo.email}
                </p>
                <p className='text-sm text-gray-500'>
                  {data.shippingInfo.phone}
                </p>
              </div>
            </div>
            <div>
              <p className='text-sm font-medium'>Address</p>
              <p className='text-sm text-gray-500'>
                {data.shippingInfo.address}
              </p>
              {data.shippingInfo.additional_info && (
                <p className='mt-1 text-sm text-gray-500'>
                  Notes: {data.shippingInfo.additional_info}
                </p>
              )}
            </div>

            <Separator />

            <div>
              <div className='mb-4 flex items-center gap-2'>
                <Package className='h-5 w-5 text-orange-500' />
                <h3 className='text-xl font-semibold'>Order Items</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className='text-center'>Quantity</TableHead>
                    <TableHead className='text-right'>Price</TableHead>
                    <TableHead className='text-right'>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.cart.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className='flex items-center gap-3'>
                          <Avatar className='h-10 w-10 rounded-md'>
                            <AvatarImage
                              src={item.product.thumbnail}
                              alt={item.product.title}
                            />
                            <AvatarFallback>
                              {item.product.title[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className='line-clamp-3 overflow-clip text-ellipsis font-medium'>
                              {item.product.title}
                            </p>
                            <p className='text-xs text-gray-500'>
                              {item.product.productCode}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        {item.quantity}
                      </TableCell>
                      <TableCell className='text-right'>
                        <CurrencySymbols.default />
                        {parseFloat(item.price).toFixed(2)}
                      </TableCell>
                      <TableCell className='text-right'>
                        <CurrencySymbols.default />
                        {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
}
