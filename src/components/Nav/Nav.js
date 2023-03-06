import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Button, Text, Flex } from "@chakra-ui/react";
import { PATHS } from "../../paths";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Card mb={50}>
        <CardBody>
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="dodgerblue" fontWeight="800" fontSize="2em">
              Money Movement Tracker
            </Text>
            <NavLink to={props.link}><Text color="#E53E3E" fontWeight="700" fontSize="22px">{props.text}</Text></NavLink>
            <Button
              colorScheme="red"
              onClick={() => {
                window.localStorage.clear();
                navigate(PATHS.LOGIN);
              }}
            >
              Logout
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </div>
  );
};

export default Nav;