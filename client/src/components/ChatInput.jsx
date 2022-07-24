import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container"></div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type a new message"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button style={{backgroundColor:'#5f7fde'}} type="submit">
          <span> Send </span> <IoMdSend className="sendIcon" />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: white;
  padding: 10px 20px 20px 20px ;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: black;
    gap: 1rem;  }
    }
  }
  .input-container {
    padding:0px;
    border: 1px solid rgb(145 136 163 / 0.51);
    width: 100%;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    .sendIcon{
      
      color:white;
      font-size: 1rem;
    }
    span{
      
      color:white;
      padding:0 10px;
    }
    button {
      padding: 6px 5px;
      border-radius: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #beccf1;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          color:white;
          font-size: 1rem;
        }
      }
    
    }
  }
`;
