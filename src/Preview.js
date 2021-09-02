import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import { resetCameraImage, selectCmaeraImage } from "./features/cameraSlice";
import { v4 as uuid } from "uuid";
import firebaseExports from "./firebase";
import firebase from "firebase";
import { selectUser } from "./features/appSlice";

function Preview() {
  const cameraImage = useSelector(selectCmaeraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    // history.replace('/')
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = firebaseExports.storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        firebaseExports.storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            firebaseExports.db.collection("posts").add({
              imageURL: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <PreviewContainer>
      <CloseIcon onClick={closePreview} />
      <img src={cameraImage} alt="" />
      <PreviewFooter onClick={sendPost}>
        <h2>Send Now</h2>
        <SendIcon />
      </PreviewFooter>
    </PreviewContainer>
  );
}

export default Preview;

const PreviewContainer = styled.div`
  position: relative;

  > .MuiSvgIcon-root {
    position: absolute;
    top: 0;
    margin: 5px;
    cursor: pointer;
    color: white;
  }
`;

const PreviewFooter = styled.div`
  position: absolute;
  bottom: 0;
  right: -25px;
  transform: translate(-50%, -50%);
  background-color: yellow;
  color: black;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 30px;
  padding: 7px;
  cursor: pointer;

  > h2 {
    font-size: 8px;
    margin-right: 3px;
  }
  > .MuiSvgIcon-root {
    font-size: 10px !important;
  }
`;
