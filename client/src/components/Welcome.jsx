import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  const getUser=async()=>{
    setUserName(
        await JSON.parse(
          localStorage.getItem("chat-app-current-user")
        ).username
      );
  }
  useEffect( () => {
   getUser()
  }, []);
  return (
    <Container>
      
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3 style={{color:'black'}}>Please select a user to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
