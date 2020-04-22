import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Spinner } from "reactstrap";
import NavBar from "../Navbar/Navbar";

const Loading = () => {
  const { theme } = useContext(ThemeContext);
  const { userData, userLoading } = useContext(UserContext);

  // render
  // renders nothing when user logged in state is undetermined
  if (userLoading || !userData) {
    return null;
  } else {
    return (
      <div style={theme.background}>
        <NavBar />
        <div style={theme.loading}>
          <Spinner color={theme.spinnerColor} />
        </div>
      </div>
    );
  }
};

export default Loading;
