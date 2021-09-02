import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useEffect } from "react";
import firebaseExports from "./firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useHistory } from "react-router-dom";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const takeSnap = () => {
    history.push("/");
  };

  useEffect(() => {
    firebaseExports.db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <ChatsContainer>
      <ChatsHeader>
        <Avatar
          src={user.profilePic}
          onClick={() => firebaseExports.auth.signOut()}
        />
        <ChatsSearch>
          <SearchIcon />
          <input placeholder="Friends" type="text" />
        </ChatsSearch>
        <ChatBubbleIcon />
      </ChatsHeader>

      <ChatPosts>
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageURL, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageURL={imageURL}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </ChatPosts>
      <RadioButtonUncheckedIcon onClick={takeSnap} fontSize="large" />
    </ChatsContainer>
  );
}

export default Chats;

const ChatsContainer = styled.div`
  position: relative;
  height: 400px;
  width: 250px;

  > .MuiSvgIcon-root {
    position: absolute;
    background-color: white;
    border-radius: 200px;
    color: gray;
    font-size: 40px !important;
    cursor: pointer;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  > .MuiSvgIcon-root:hover {
    opacity: 0.8;
  }
`;

const ChatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #059ee0;
  height: 50px;

  > .MuiAvatar-root {
    height: 25px !important;
    width: 25px !important;
    cursor: pointer;
  }
  > .MuiSvgIcon-root {
    color: white;
    font-size: 18px !important;
  }
`;

const ChatsSearch = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding-left: 8px;

  > input {
    outline: none;
    background-color: transparent;
    border: none;
    font-size: 12px;
    flex: 1;
    color: white;
  }

  > input::placeholder {
    color: white;
    opacity: 1;
  }

  > .MuiSvgIcon-root {
    color: white;
    font-size: 13px !important;
  }
`;

const ChatPosts = styled.div`
  box-shadow: 1px -7px 7px -6px rgba(0, 0, 0, 0.44);
  height: 359px;
  margin-top: -9px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
