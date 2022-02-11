import { View, Text, AsyncStorage } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/form/InputField";
import { Button } from "native-base";
import { useMutation } from "react-query";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

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
        console.log("reg");
        console.log(data, variables, context);
        AsyncStorage.setItem("Bearer", data.token);
        navigation.navigate("Home");
      },
      onError: (error, variables, context) => {
        console.log(error);
      },
    }
  );

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
