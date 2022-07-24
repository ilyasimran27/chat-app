import React from "react";
import styled from "styled-components";
export default function Header() {
  return (
    <FormContainer>
      <nav>
        <h1>Gain Impact Chat</h1>
      </nav>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  padding: 1.5rem;
  hight: 100vh;
  width: 100vw;
  display: flex;
  background-color: #def7fd;
  justify-content: center;
  h1 {
    font-size: 35px;
    justify-content: center;
    align-items: center;
    color: #000000ad;
    padding: 1rem;
  }
`;
