import React from "react";
import Routes from "./Routes";
import UserContextProvider from "./contexts/UserContext";
import { Layout } from "react-mdl";

function App() {
  return (
    <div className="App">
      <Layout>
        <UserContextProvider>
          <Routes />
        </UserContextProvider>
      </Layout>
    </div>
  );
}

export default App;
