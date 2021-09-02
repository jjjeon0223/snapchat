import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import { selectImage } from "./features/appSlice";
import { useDispatch } from "react-redux";
import firebaseExports from "./firebase";
import { useHistory } from "react-router-dom";

function Chat({ id, username, timestamp, read, imageURL, profilePic }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageURL));
      firebaseExports.db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );

      history.push("/chats/view");
    }
  };
  return (
    <ChatContainer onClick={open}>
      <Avatar src={profilePic} />
      <ChatInfo>
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view-"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </ChatInfo>

      {!read && <StopRoundedIcon />}
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid whitesmoke;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  > .MuiAvatar-root {
    height: 35px !important;
    width: 35px !important;
  }

  > .MuiSvgIcon-root {
    color: #ed3b55;
  }
`;

const ChatInfo = styled.div`
  padding-left: 5px;
  flex: 1;

  > h4 {
    font-size: 11px;
    font-weight: 500;
  }

  > p {
    font-size: 9px;
  }
`;
