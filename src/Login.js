import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login } from "./features/appSlice";
import firebaseExports from "./firebase";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    firebaseExports.auth
      .signInWithPopup(firebaseExports.provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <LoginC>
      <LoginContainer>
        <img
          src="https://uploads-ssl.webflow.com/5dbfa12e9bf13e036e5438a3/5de4ecded41c9b591ed3bac8_Snapchat-logo.png"
          alt=""
        />
        <Button variant="outlined" onClick={signIn}>
          Sign In
        </Button>
      </LoginContainer>
    </LoginC>
  );
}

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  > img {
    height: 300px;
    object-fit: contain;
  }
`;

const LoginC = styled.div`
  background-color: #feff00;
  display: grid;
  place-content: center;
  height: 100vh;
  width: 100%;
`;
