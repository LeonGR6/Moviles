import React, { useState } from 'react'
import { Box, Button, ButtonText, CheckIcon, Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel, Heading, Text, VStack, View } from '@gluestack-ui/themed'
import OrderProducts from './order_products'
import useCategory from '../../../hooks/useCategory';

export default function ListOrders({ order }: { order: any }) {
    const { id } = order

    const { setShowAlertOrders, setOrderUpdate } = useCategory();

    return (

        <VStack space="3xl" p={15}>
            <Box rounded={15} hardShadow="5" mt={10} p={15}>
                <Heading>
                    Order: {id}
                </Heading>

                <Text size="lg" ml="$7">
                    Products:
                </Text>
                <View pl={35} pr={35} pb={35} pt={10}>
                    <View flexDirection='row' justifyContent='space-between' >
                        <Text fontWeight='$bold' fontSize='$xl'>ID</Text>
                        <Text fontWeight='$bold' fontSize='$xl'>Name</Text>
                        <Text fontWeight='$bold' fontSize='$xl'>Qty</Text>
                    </View>

                    {order.products.map((product: any) => (
                        <OrderProducts key={product.id} product={product} />
                    ))}
                </View>
                <View pl={35} pr={35} pb={5} pt={10}>
                    <View flexDirection='row'>
                        <Text size="lg">
                            Client:
                        </Text>
                        <Text size="lg" ml={10}>
                            {order.user.name}
                        </Text>
                    </View>
                    <View flexDirection='row'>
                        <Text size="lg">
                            Status:
                        </Text>
                        <Text size="lg" ml={10}>
                            {order.order_statuses_id === 1 ? (
                                <>In process</>
                            ) : order.order_statuses_id === 2 ? (
                                <>Shipped</>
                            ) : order.order_statuses_id === 3 ? (
                                <>Completed</>
                            ): null}
                        </Text>
                    </View>
                </View>
                <View pl={35} pr={35} pb={20} pt={5}>
                    <View flexDirection='row'>
                        <Text fontFamily='$heading' size="lg">
                            Total:
                        </Text>
                        <Text size="lg" ml={5}>
                            ${order.total}
                        </Text>
                    </View>
                    {order.order_statuses_id === 1 ? (
                        <Button
                            size="sm"
                            borderWidth="$0"
                            bg="$yellow500"
                            $active-bg="$yellow600"
                            onPress={() => {
                                setOrderUpdate(order)
                                setShowAlertOrders(true);
                            }}
                        >
                            <ButtonText>Mark as shipped</ButtonText>
                        </Button>
                    ) : order.order_statuses_id === 2 ? (
                        <Button
                            size="sm"
                            borderWidth="$0"
                            action="positive"
                            onPress={() => {
                                setOrderUpdate(order)
                                setShowAlertOrders(true);
                            }}
                        >
                            <ButtonText>Mark as completed</ButtonText>
                        </Button>
                    ) : order.order_statuses_id === 3 ? (
                        <Button
                            size="sm"
                            borderWidth="$0"
                            action="negative"
                            onPress={() => {
                                setOrderUpdate(order)
                                setShowAlertOrders(true);
                            }}
                        >
                            <ButtonText>Delete</ButtonText>
                        </Button>
                    ) : null}
                </View>
            </Box>
        </VStack>
    )
}
