import React, { CSSProperties } from "react";
import { User } from "../";
import { Button } from "@mui/material";

interface Props {
  onSignIn: () => void;
  onSignOut: () => void;
  user: User | null;
}

const headerStyle: CSSProperties = {
  padding: 8,
  backgroundColor: "green",
  color: "white",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const Header = (props: Props) => {
  return (
    <>
      <header style={headerStyle}>
        <div style={{ fontWeight: "bold" }}>Cred Pi</div>

        <div>
          {props.user === null ? (
            <Button 
              size="small"
              variant="contained" 
              onClick={props.onSignIn}>
              Login
            </Button>
          ) : (
            <div>
              @{props.user.username}{" "}
              <Button
                size="small"
                variant="contained"
                onClick={props.onSignOut}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
