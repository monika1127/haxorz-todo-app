import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useMutation } from "react-query";
import { Button } from "native-base";
import axios from "axios";
import TaskRow from "../components/TaskRow";

const Home = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiMThmZTJmZDQwOTAwMTc4YTU4ZjkiLCJpYXQiOjE2NDY5OTE2MTR9.fs-evnn4zVJgpuVh1rl03Gw2qwKW4ue7KWd-vt87nL8";
  const newTask = { description: "new task" };

  // GET TASK LIST
  const { data, isError, isLoading, refetch } = useQuery(
    "getAllTasks",
    async () => {
      return axios.get("https://api-nodejs-todolist.herokuapp.com/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  );

  // ADD NEW TASK
  const mutation = useMutation(
    (task) => {
      return axios.post(
        "https://api-nodejs-todolist.herokuapp.com/task",
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    },
    {
      onSuccess: (data, variables, context) => {
        refetch;
      },
      onError: (error, variables, context) => {},
    }
  );

  // UPDATE TASK STATUS
  const updateStatusMutation = useMutation(
    ({ id, status }) => {
      console.log(id, status);
      return axios.put(
        `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
        { completed: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    },
    {
      onSuccess: (data, variables, context) => {
        refetch();
      },
      onError: (error, variables, context) => {},
    }
  );

  // DELETE TASK STATUS
  const deleteMutation = useMutation(
    (id) => {
      return axios.delete(
        `https://api-nodejs-todolist.herokuapp.com/task/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    },
    {
      onSuccess: (data, variables, context) => {
        refetch();
      },
      onError: (error, variables, context) => {},
    }
  );

  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    if (!data) return;
    setTasksList(data?.data?.data);
  }, [data]);

  const addNewTask = () => {
    mutation.mutate(newTask);
    setTasksList((prev) => [
      ...prev,
      { description: "new task", completed: false },
    ]);
  };

  const deleteTask = (id) => {
    if (!id) return;
    const updatedTaskList = tasksList.filter((task) => task._id !== id);
    setTasksList(updatedTaskList);
    deleteMutation.mutate(id);
  };

  const toggleTaskStatus = (id, oldStatus) => {
    if (!id) return;
    console.log("update status", id, oldStatus);
    updateStatusMutation.mutate({ id, status: !oldStatus });
    const updatedTaskList = tasksList.map((task) =>
      task._id === id ? { ...task, completed: !task.completed } : task
    );
    setTasksList(updatedTaskList);
  };

  return (
    <View>
      {tasksList.map((task, index) => (
        <TaskRow
          key={task._id || index}
          name={task.description}
          status={task.completed}
          id={task._id || index}
          toggleItemStatus={() => toggleTaskStatus(task._id, task.completed)}
          deleteItem={() => deleteTask(task._id)}
        />
      ))}
      <Button onPress={addNewTask}>ADD NEW TASK</Button>
    </View>
  );
};

export default Home;
