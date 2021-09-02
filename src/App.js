import React from "react";
import styled from "styled-components";
import WebcamCapture from "./WebcamCapture";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./Login";
import { useEffect } from "react";
import firebaseExports from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    firebaseExports.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <AppContainer>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              src="https://uploads-ssl.webflow.com/5dbfa12e9bf13e036e5438a3/5de4ecded41c9b591ed3bac8_Snapchat-logo.png"
              alt=""
            />
            <AppBody>
              <Switch>
                <Route path="/chats/view">
                  <ChatView />
                </Route>
                <Route path="/chats">
                  <Chats />
                </Route>
                <Route path="/preview">
                  <Preview />
                </Route>
                <Route exact path="/">
                  <WebcamCapture />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fefc01;
  height: 100vh;

  > img {
    object-fit: contain;
    height: 100px;
  }
`;

const AppBody = styled.div``;
