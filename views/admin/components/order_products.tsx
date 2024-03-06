import { Box, View, Text } from '@gluestack-ui/themed'
import React from 'react'

export default function OrderProducts({ product }: { product: any }) {
    const { id, name, pivot } = product;
    return (
            <View flexDirection='row' justifyContent='space-between' mt={5}>
                <Text fontSize="$lg">
                    {id}
                </Text>
                <Text fontSize="$lg">
                    {name}
                </Text>
                <Text fontSize="$lg">
                    {pivot.quantity}
                </Text>
            </View>
    )
}
