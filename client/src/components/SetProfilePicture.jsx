import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setProfilePictures } from "../utils/APIRoutes";
export default function SetProfilePicture() {
  const api = `https://randomuser.me/api/`;
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPicture, setSelectedPicture] = useState(undefined);
  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    
  };

 

  const setProfilePicture = async () => {
    if (selectedPicture === undefined) {
      toast.error("Please select a photo", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );

      const { data } = await axios.post(`${setProfilePictures}/${user._id}`, {
        image: pictures[selectedPicture],
      });

      if (data.isSet) {
        user.isProfileImageSet = true;
        user.profileImage = data.image;
        localStorage.setItem("chat-app-current-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting photo. Please try again.", toastOptions);
      }
    }
  };
  const getProfilePictureData = async () => {
    console.log("get profile picture calling=>")
    const data = [];
    for (let i = 0; i < 3; i++) {
      const image = await axios.get(`${api}`);
      console.log("user data===>", image.data.results[0].picture?.large);
      //   const buffer = new Buffer(image.data);

      data.push(image?.data?.results[0]?.picture?.large);
    }
    console.log("image===>", data);
    setTimeout(() => {
      setPictures(data);
      setIsLoading(false);
    }, 4000);
  };
  useEffect(() => {
    getProfilePictureData();
  },[]);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick a Photo as your profile picture</h1>
            <p style={{
              textAlign:'center',
              marginTop:5,
              backgroundColor:'blue',
              color:'white'
            }}>please reload if you want more options for profile picture</p>
          </div>
          <div className="avatars">
            {pictures.map((avatar, index) => {
              return (
                <div
                  key={avatar}
                  className={`avatar ${
                    selectedPicture === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    style={{ borderRadius: 20 }}
                    onClick={() => setSelectedPicture(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #def7fd;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: black;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: black;
    }
  }
`;
