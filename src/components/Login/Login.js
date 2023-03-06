import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  Input,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";

import { client } from "../../client";
import { PATHS } from "../../paths";
import { centeredStyle } from "../../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] =useState(false);
  const toast = useToast();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    name === "email" ? setEmail(value) : setPassword(value);
  };

  const handleLogin = () => {
    const body = { email, password };
    client.post("/login", body).then((resp) => {
      window.localStorage.setItem("token", resp.data.token);
      toast({
        title: `Successfully Logged-In`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:'top'
        
      })
      navigate(PATHS.MANAGE_EXPENSE);
    })
    .catch((err)=>{
        if(err.message){
            toast({
                title: `Email or Password is Incorrect`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                
              })
        }
    })
  };

  return (
    <div style={centeredStyle}>
      <Card variant="elevated" size="lg" maxW="md" width="100%">
        <CardHeader>
          <Heading size="md">Login</Heading>
        </CardHeader>

        <CardBody>
          <>
            <Text mb="8px">Email</Text>
            <Input
              value={email}
              name="email"
              onChange={handleChange}
              size="md"
            />
          </>
          <>
            <Text mt={4} mb="8px">
              Password
            </Text>
            <Input
              // type="password"
              value={password}
              name="password"
              onChange={handleChange}
              size="md"
            />
          </>
          <Button mt={4} ml={40} colorScheme="twitter" onClick={handleLogin}>
            Log In
          </Button>
        </CardBody>

      </Card>
    </div>
  );
};

export default Login;