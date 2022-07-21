import {NavigationContainer} from "@react-navigation/native";
import CreateCarDataScreen from "./screens/CreateCarDataScreen";
import ListCarDataScreen from "./screens/ListCarDataScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="HomeScreen"
                    component={CreateCarDataScreen}
                    options={{
                        title: 'Create Car'
                    }}
                />
                <Tab.Screen
                    name="CarsScreen"
                    options={{
                        title: 'List Car',
                        unmountOnBlur: true
                    }}
                    component={ListCarDataScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}