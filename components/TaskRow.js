import React from "react";
import { Box, Checkbox, Flex, Icon, IconButton, Pressable } from "native-base";
import { Entypo } from "@native-base/icons";

const TaskRow = ({ name, status, toggleItemStatus, id, deleteItem }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      flexDirection={"row"}
      mx="10"
      my="2"
    >
      <Checkbox isChecked={status} onChange={toggleItemStatus}>
        <Box
          alignSelf="center"
          _text={{
            fontSize: "md",
            fontWeight: "medium",
            letterSpacing: "lg",
          }}
        >
          {name}
        </Box>
      </Checkbox>

      <IconButton
        icon={<Icon as={Entypo} name="squared-cross" onPress={deleteItem} />}
      ></IconButton>
    </Flex>
  );
};

export default TaskRow;
