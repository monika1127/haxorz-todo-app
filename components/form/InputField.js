import { View, Text } from "react-native";
import React from "react";
import { useController } from "react-hook-form";
import { Input } from "native-base";

const InputField = ({ name, control }) => {
  const { field } = useController({ control, defaultValue: "", name });
  return <Input value={field.value} onChangeText={field.onChange} />;
};

export default InputField;
