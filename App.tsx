import { Navigts, ScreensNavig } from "./srcs/interface/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Homes from "./srcs/screen/Home";
import Detalle from "./srcs/screen/detalles";






export default function () {

  const Stack = createNativeStackNavigator<ScreensNavig>()


  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="homes" screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
        statusBarColor:"white",
        statusBarStyle:"dark",
        headerTintColor:"#FF8893"
      }}>
        <Stack.Screen name="homes" component={Homes} options={{
          headerShown: false
        }} />
        <Stack.Screen name="detalles" component={Detalle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
