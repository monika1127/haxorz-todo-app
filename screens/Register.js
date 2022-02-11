import { View, Text } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/form/InputField";
import { Button } from "native-base";

const Register = () => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <View>
      <Text>Register</Text>
      <Input name="name" control={control} />
      <Input name="password" control={control} />
      <Button onPress={handleSubmit(onSubmit)}>SUBMIT</Button>
    </View>
  );
};

export default Register;
