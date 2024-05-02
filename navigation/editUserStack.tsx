import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoggedUser from "../views/LoggedUser";
import userInformation from "../views/userInformation";

const Stack = createStackNavigator();

export default function EditUserStack() {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="LoggedUser" component={LoggedUser} options={{
               headerShown: false, 
            }}  />
                <Stack.Screen name="EditInformation" component={userInformation} options={{
               headerShown: false,
            }}  />
            </Stack.Navigator>
        </>
    )
}
