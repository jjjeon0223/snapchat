import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router-dom";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    history.push("/preview");
  }, [webcamRef]);

  return (
    <WebCamContainer>
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonUncheckedIcon onClick={capture} fontSize="large" />
    </WebCamContainer>
  );
}

export default WebcamCapture;

const WebCamContainer = styled.div`
  position: relative;

  > .MuiSvgIcon-root {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    color: white;
  }
`;
