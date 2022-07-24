import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [check,setCheck]=useState(false)
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const recieveMessage = async () => {
    const data = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  };
  useEffect(() => {
    console.log("revive message")
    recieveMessage();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("chat-app-current-user"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
    console.log("data of user==>",data,currentChat)
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    console.log("arrival message useEffect running",socket.current)
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header"></div>
      <div className="chat-messages">
      
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div
                  className={`content ${
                    message.fromSelf ? "sendedContent" : "recievedContent"
                  }`}
                >
                  <p>{message.message}</p>
                  <span
                    className={`time ${
                      message.fromSelf ? "sendedTime" : "recievedTime"
                    }`}
                  >
                    {moment(message.createdAt).format("HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .recievedTime {
    justify-content: flex-start;
    padding-right: 10px;
    right: 0;
    color: rgba(95, 127, 222, 255);
  }
  .sendedTime {
    color: white;
  }
  .time {
    position: absolute;
    font-size: 11px;
    padding-top: 1px;
  }
  p {
    font-size: 14px;
    font-weight: 300;
    padding: 2px;
  }
  .avatar {
    img {
      height: 3rem;
    }
  }
  .username {
    h3 {
      color: black;
    }
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
  .chat-messages {
    background-color:black
    align-self: flex-end;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.9rem;
      &-thumb {
        background-color:#5f7fde;
        width: 100;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .sendedContent {
        border-top-left-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
      }

      .recievedContent {
        border-top-right-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
      }
      .content {
        position: relative;
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        color: white;
        background-color: #fdba45;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        color: black;
        background-color: #def7fd;
      }
    }
  }
`;
