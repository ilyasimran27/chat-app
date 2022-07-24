import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import Header from "../components/Header";
export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-current-user")) {
      // navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    console.log("handle validation callling")
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handleValidation();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-app-current-user",
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <Header />
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h2>Sign Up</h2>
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Enter your confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Submit</button>
          <span>
            Alreday have account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  hight: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
  h2{
    padding-top:1rem;
   color:#000000ad;
   font-size:25px;
  }
  form {
    width: 38vw;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
  }
  input {
    padding: 0.5rem;
    border: 1px solid rgb(145 136 163 / 0.51);
    border-radius: 0.8rem;
    width: 100%;
    font-size: 12px;
    &:focus {
      border: 1px solid #009fff4d;
      outline:  #009fff4d;
    }
  }
  button{
    background-color:rgba(95,127,222,255);
    color:white;
    padding: 0.5rem;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius: 1.2rem;
    transition: 0.5s ease-in-out;
    &:hover{
      background-color:black
    }
  }
  span{
    align-self: center;
    a{
      color::#3d69e5;
     text-decoration:none;
    }
  }
`;
