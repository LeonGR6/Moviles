import React from 'react'
import useSWR from 'swr'
import clientAxios from '../../config/axios'
import { useAuth } from '../../auth/context';
import ListOrders from './components/list_orders'
import { ScrollView } from '@gluestack-ui/themed';



export default function Orders() {
  const { user } = useAuth();
  const accessToken = user?.accessToken;
  const fetcher = () => clientAxios('/api/orders', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });

  const orders = isLoading ? [] : data?.data.data;


  return (
    <>
      <ScrollView>
        {orders?.map((order: { id: React.Key | null | undefined; }) => (
          <ListOrders key={order.id} order={order} />
        ))}
      </ScrollView>
    </>
  )
}
