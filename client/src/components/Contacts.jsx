import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { recieveMessageRoute, getAllMsg } from "../utils/APIRoutes";
import axios from "axios";
import moment from "moment";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [messages, setMessages] = useState([]);

  //get user
  const getUserFromLocal=async()=>{
    const data = await JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.profileImage);
  }
  useEffect(() => {
    getUserFromLocal()
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const getMessages=async()=>{
    try{
        console.log("try block running")
        const data = await JSON.parse(
            localStorage.getItem("chat-app-current-user")
          );
          const response = await axios.get(`${getAllMsg}/${data._id}`);
          setMessages(response.data);
    }
    catch(error){
        console.log("error in get messages")
    }
    
  }
  useEffect( () => {
  //  getMessages()
  }, []);

  function groupedDays(messages) {
    return messages.reduce((acc, el, i) => {
      const messageDay = moment(el.createdAt).format("YYYY-MM-DD");
      if (acc[messageDay]) {
        return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
      }
      return { ...acc, [messageDay]: [el] };
    }, {});
  }
  let f = groupedDays(messages);

  console.log(Object.keys(f));
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="current-user">
            <div className="avatar">
              <img
                src={currentUserImage}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              let allMes = messages.filter((e) => e.sender === contact._id);

              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={contact.profileImage}
                      alt=""
                    />
                  </div>
                  <div className="username" id="logout">
                    <h3
                      className={` ${
                        index === currentSelected ? "changeColor" : "h3"
                      }`}
                    >
                      {contact.username}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user logout">
            <Logout />
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
.logout{

  border-top:1px solid #beccf1;
}
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  // background-color: #def7fd;
  // border-radius: 0.8rem;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    padding-top: 25px;
    border-top-right-radius:0.8rem;
    background-color: #def7fd;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  
    .contact {
     
      background-color: #ffffff00;
      min-height: 4.5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          background:#fdba45;
          border: 3px solid#fdba45;
         border-radius: 50%;
         height: 2.5rem;
        }
      }
        .h3 {
          font-weight: 400;
          padding-bottom: 15px;
          font-size: 15px;
               color: black;
        }
    
    }
    .selected {
      background-color:  rgba(95,127,222,255);
    }
    .changeColor{
      padding-bottom: 15px;
      font-size: 15px;
      color: white;
    }
  }
  .current-user {
    background-color: #def7fd;
    display: inline-flex;
    border-bottom-right-radius:0.8rem;
}
  .current-user {
    padding:1rem;
    margin-bottom:10px;
    background-color: #def7fd
    display: flex;
    justify-content: flex-start;

    align-items: center;
    
    .avatar {   
      padding:1rem;
      img {
        background:#fdba45; 
         border: 3px solid#fdba45;
         border-radius: 50%;
         height: 2.5rem;
         max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        font-weight: 400;
        padding-bottom: 15px;
    font-size: 15px;
        color: black;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
