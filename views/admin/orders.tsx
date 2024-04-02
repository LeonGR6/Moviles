import React from 'react'
import useSWR from 'swr'
import clientAxios from '../../config/axios'
import { useAuth } from '../../auth/context';
import ListOrders from './components/list_orders'
import { ScrollView, StyleSheet, View } from 'react-native';
import useCategory from '../../hooks/useCategory';
import { Select, Text, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@gluestack-ui/themed';
import AlertOrders from './components/AlertOrders';



export default function Orders() {
  const { user } = useAuth();
  const accessToken = user?.accessToken;

  const { orderStates, handleClickOrderState, clearOrderState, actualOrderState, makeStatusCompleted, makeStatusShipped, deleteOrder } = useCategory();

  const fetcher = () => clientAxios('/api/orders', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });


  const orders = isLoading ? [] :
    actualOrderState ? data?.data.data.filter((order: { order_statuses_id: any; }) => order.order_statuses_id === actualOrderState.id) : data?.data.data;


  const handleStateChange = (value: string) => {
    const selectedStateId = orderStates?.find((state: { name: string }) => state.name === value)?.id;
    if (selectedStateId !== undefined) {
      handleClickOrderState(selectedStateId);
    } else {
      clearOrderState();
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.selectContainer}>
          <Text>Select a category:</Text>
          <Select defaultValue={'All states'} onValueChange={(value) => handleStateChange(value)} >
            <SelectTrigger>
              <SelectInput />
              <SelectIcon>
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem value='null' label='All states' />
                {orderStates.map((state: { id: string; name: string }) => (
                  <SelectItem key={state.id} value={state.name} label={state.name} />

                ))}
              </SelectContent>
            </SelectPortal>
          </Select>

        </View>
        <ScrollView>
          <View style={styles.rowContainer}>
            {orders?.map((order: { id: React.Key | null | undefined; }) => (
              <ListOrders key={order.id} order={order} />
            ))}
          </View>
        </ScrollView>
      </View>

      <AlertOrders />
    </>
  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,



  },
  rowContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  selectContainer: {
    marginTop: 20,
    marginBottom: 20,
  },

});
