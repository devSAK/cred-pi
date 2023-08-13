import React, { CSSProperties } from 'react';
import { Button } from '@mui/material';

interface Props {
  onSignIn: () => void;
  onModalClose: () => void;
}

const modalStyle: CSSProperties = {
  background: "white",
  position: "absolute",
  left: "15vw",
  top: "40%",
  width: "70vw",
  height: "25vh",
  border: "1px solid black",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const SignIn = (props: Props) => {
  return (
    <>
      <div style={modalStyle}>
        <p style={{ fontWeight: "bold" }}>You need to sign in first.</p>
        <div>
          <Button
            variant="outlined"
            onClick={props.onSignIn}
            style={{ marginRight: "1em" }}>
            Login
          </Button>
          <Button variant="outlined" onClick={props.onModalClose}>Close</Button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
