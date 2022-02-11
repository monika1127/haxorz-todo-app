import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";
import axios from "axios";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();

  const { data, isError, isLoading, isFetching } = useQuery(
    "userProfile",
    async () => {
      const token = await AsyncStorage.getItem("Bearer");
      console.log("token", token);
      return axios.get("https://api-nodejs-todolist.herokuapp.com/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  );

  const user = data && data.data;

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Something went wrong</Text>;

  const logout = {};
  return (
    <View>
      <Text>User Profile</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Age: {user.age}</Text>

      {/* <Button onPress={() => mutation.mutate()} >Logout</Button> */}
    </View>
  );
};

export default Profile;
