import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { ADD_UPDATE_EXPENSE } from "../../store/action";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  CardBody,
  Card,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Heading,
  Button,
} from "@chakra-ui/react";

import { DELETE_EXPENSE, ADD_EXPENSE } from "../../store/action";
import { PATHS } from "../../paths";

const filterStyle = {
  width: "100%",
  height: "100%",
  background: "dodgerblue",
};

const UpdateExpense = () => {
  
  const store = useSelector((state)=>state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [updated,setUpdated]=useState({
  title:`${store.update.title}`,
  Description:`${store.update.Description}`,
  expenseType:`${store.update.expenseType}`,
  amount:`${store.update.amount}`,
  date:`${store.update.date}`,
});
  

  useEffect(()=>{
   setData(store.update);
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdated({ ...updated, [name]: value });
    console.log(updated)
  };

  const handleUpdate=(id)=>{
    dispatch({type:ADD_UPDATE_EXPENSE,payload:{updated,id:id}})
    navigate("/")
  }

  

  return (
    <div style={filterStyle}>
        <Nav  />
      <Card size="md" mr={60} ml={60} mb={30}>
        <CardBody>
          <Heading>Update Expense</Heading>
          <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              defaultValue={data.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Desc</FormLabel>
            <Input
              type="text"
              name="Description"
              defaultValue={data.Description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Expense Type</FormLabel>
            <Select
              name="expenseType"
              defaultValue={data.expenseType}
              onChange={handleChange}
            >
              <option value="noValue">Select</option>
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Amount</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="green"
                fontSize="0.9em"
                children="INR"
              />
              <Input
                type="number"
                name="amount"
                defaultValue={data.amount}
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Date</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              name="date"
              defaultValue={data.date}
              onChange={handleChange}
              type="date"
            />
          </FormControl>
          <FormControl mt={4}>
            <Button colorScheme="twitter" onClick={()=>{
                handleUpdate(data.id)
            }} >
              Update
            </Button>
          </FormControl>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateExpense;
