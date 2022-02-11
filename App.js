import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";

export default function App() {
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Login} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
