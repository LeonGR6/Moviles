import React, { useState } from 'react'
import { Box, CheckIcon, Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel, Heading, Text, VStack, View } from '@gluestack-ui/themed'
import OrderProducts from './order_products'

export default function ListOrders({ order }: { order: any }) {
    const { id } = order

    const [values, setValues] = useState(["Eng"])

    return (
        <CheckboxGroup
            value={values}
            onChange={(keys) => {
                setValues(keys)
            }}
            aria-label="My Component"
        >
            <VStack space="3xl" p={15}>
                <Box rounded={15} hardShadow="5" mt={10}>
                    <Checkbox value={id} aria-label="My Component">
                        <CheckboxIndicator mr="$2">
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel mt={10}>
                            <Heading>
                                Order: {id}
                            </Heading>
                        </CheckboxLabel>
                    </Checkbox>
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
                    </View>
                </Box>
            </VStack>
        </CheckboxGroup>
    )
}
