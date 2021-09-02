import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { selectSelctedImage } from "./features/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function ChatView() {
  const selectedImage = useSelector(selectSelctedImage);
  const history = useHistory();

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);
  const exit = () => {
    history.replace("/chats");
  };

  return (
    <ChatViewContainer>
      <img src={selectedImage} onClick={exit} alt="" />
      <ChatViewtimer>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </ChatViewtimer>
    </ChatViewContainer>
  );
}

export default ChatView;

const ChatViewContainer = styled.div`
  position: relative;
  > img {
    cursor: pointer;
  }
`;

const ChatViewtimer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
`;
