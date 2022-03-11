import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();

  const { data, isError, isLoading } = useQuery("userProfile", async () => {
    // const token = await AsyncStorage.getItem("Bearer");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiMThmZTJmZDQwOTAwMTc4YTU4ZjkiLCJpYXQiOjE2NDY5OTE2MTR9.fs-evnn4zVJgpuVh1rl03Gw2qwKW4ue7KWd-vt87nL8";
    console.log("token", token);
    return axios.get("https://api-nodejs-todolist.herokuapp.com/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  const mutation = useMutation(
    async () => {
      const token = await AsyncStorage.getItem("Bearer");
      return axios.post(
        "https://api-nodejs-todolist.herokuapp.com/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      onSuccess: (data, variables, context) => {
        AsyncStorage.setItem("Bearer", "");
        navigation.navigate("Login");
      },
      onError: (error, variables, context) => {
        console.log("error", error);
      },
    }
  );

  const user = data && data.data;

  if (isLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>Error</Text>;
  const logout = {};
  return (
    <View>
      <Text>User Profile</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Age: {user.age}</Text>

      <Button onPress={() => mutation.mutate()}>Logout</Button>
    </View>
  );
};

export default Profile;
