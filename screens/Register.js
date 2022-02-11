import { View } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/form/InputField";
import { Button, Text } from "native-base";
import { useMutation } from "react-query";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => mutation.mutate(data);
  const navigation = useNavigation();
  const mutation = useMutation(
    (registUser) => {
      return axios.post(
        "https://api-nodejs-todolist.herokuapp.com/user/register",
        registUser
      );
    },
    {
      onSuccess: (data, variables, context) => {
        register(data.token);
      },
      onError: (error, variables, context) => {
        console.log(error);
      },
    }
  );

  const register = async (token) => {
    try {
      AsyncStorage.setItem("Bearer", token);
      await AsyncStorage.setItem("Bearer", token);
      navigation.navigate("Home");
    } catch (e) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Name</Text>
      <Input name="name" control={control} />
      <Text>Email</Text>
      <Input name="email" control={control} />
      <Text>Age</Text>
      <Input name="age" control={control} />
      <Text>Password</Text>
      <Input name="password" control={control} />
      <Button type="submit" onPress={handleSubmit(onSubmit)}>
        SUBMIT
      </Button>

      <Button onPress={() => navigation.navigate("Login")}>Log In</Button>
    </View>
  );
};

export default Register;
