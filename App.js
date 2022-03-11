import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import { useEffect } from "react";

const TabNavogator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default function App() {
  const Stack = createNativeStackNavigator();

  const queryClient = new QueryClient();

  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} /> */}
            <Stack.Screen name="TabNavigotor" component={TabNavogator} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
