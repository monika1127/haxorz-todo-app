import { View } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/form/InputField";
import { Button, Text } from "native-base";
import { useMutation } from "react-query";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => mutation.mutate(data);
  const navigation = useNavigation();
  const mutation = useMutation(
    (loginUser) => {
      return axios.post(
        "https://api-nodejs-todolist.herokuapp.com/user/login",
        loginUser
      );
    },
    {
      onSuccess: (data, variables, context) => {
        onLogin(data.data.token);
      },
      onError: (error, variables, context) => {
        console.log(error);
      },
    }
  );

  const onLogin = async (token) => {
    try {
      AsyncStorage.setItem("Bearer", token);
      await AsyncStorage.setItem("Bearer", token);
      navigation.navigate("Profile");
    } catch (e) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <Input name="email" control={control} />

      <Text>Password</Text>
      <Input name="password" control={control} />
      <Button type="submit" onPress={handleSubmit(onSubmit)}>
        SUBMIT
      </Button>
      <Text>Are you a new user?</Text>
      <Button onPress={() => navigation.navigate("Register")}>Sign In</Button>
    </View>
  );
};

export default Login;
