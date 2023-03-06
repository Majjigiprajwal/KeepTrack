import React, { useState,useEffect } from "react";
import uniqid from "uniqid";
import { useSelector, useDispatch } from "react-redux";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardBody,
  Badge,
  Button,
  Stack,
  useToast
} from "@chakra-ui/react";

import Filters from "./Filters";
import { DELETE_EXPENSE, UPDATE_EXPENSE } from "../../store/action";
import Nav from "../Nav/Nav";

const filterStyle = {
  width: "100%",
  height: "auto",
  background: "dodgerblue",
};

const ManageExpense = () => {
  const store = useSelector((state) => state);
  const [filteredExpenses, setFilteredExpenses] = useState(store.expenses);
  const navigate=useNavigate();
  const toast = useToast();

  const dispatch = useDispatch();
  useEffect(()=>{
     setFilteredExpenses(store.expenses);
     if(store.expenses.length==0){
      toast({
        title: `No Expenses or Income`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:'center'
        
      })
     }
  },[store])

  const handleDelete = (id) => {
    dispatch({ type: DELETE_EXPENSE, id: id });
  };
  const handleUpdate =(id)=>{
    dispatch({type: UPDATE_EXPENSE,id:id})
     navigate("/update-expense");
  }

  return (
    <div style={filterStyle}>
      <Nav  link='/add-expense' text="AddExpense" />
      <Filters
        filteredExpenses={filteredExpenses}
        setFilteredExpenses={setFilteredExpenses}
      />

      <Card size="md" mr={12} ml={12} mb={30}>
        <CardBody>
          <TableContainer>
            <Table variant="striped" colorScheme="twitter">
              <Thead>
                <Tr>
                  <Th>S. No</Th>
                  <Th>Title</Th>
                  <Th>Amount</Th>
                  <Th>Expense Type</Th>
                  <Th>Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredExpenses.map((expenseobj, idx) => {
                  return (
                    <Tr key={uniqid()}>
                      <Td>{idx + 1}</Td>
                      <Td>{expenseobj.title}</Td>
                      <Td>INR {expenseobj.amount}</Td>
                      <Td>
                        <Badge
                          colorScheme={
                            expenseobj.expenseType === "EXPENSE"
                              ? "red"
                              : "green"
                          }
                        >
                          {" "}
                          {expenseobj.expenseType}
                        </Badge>
                      </Td>
                      <Td>{expenseobj.date}</Td>
                      <Td>
                        <Stack>
                        {" "}
                        <Button size='md'
                          height='48px'
                          width='100px'
                          leftIcon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => {
                            handleDelete(expenseobj.id);
                          }}
                        >
                          Delete
                        </Button>
                        {" "}
                        <Button
                          size='md'
                          height='48px'
                          width='100px'
                          colorScheme="green"
                          onClick={()=>{
                            handleUpdate(expenseobj.id)
                          }
                           
                          } 
                        >
                          Update
                        </Button>
                        </Stack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManageExpense;