import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from '@gluestack-ui/themed';
import Admin from '../views/admin/admin';
import Products from '../views/admin/products';
import Orders from '../views/admin/orders';



const Drawer = createDrawerNavigator();

export const AdminDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Admin">
            <Drawer.Screen name="Admin" component={Admin} />
            <Drawer.Screen name="Products" component={Products} />
            <Drawer.Screen name="Orders" component={Orders} />
        </Drawer.Navigator>
    );
}
