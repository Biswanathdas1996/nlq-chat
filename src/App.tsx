import React from "react";
import { Route, Routes } from "react-router-dom";

// import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Queries from "./pages/Queries";
import Layout from "./layout/index";
import SimpleAlert from "./components/Alert";
// -------------user stoty use case---------------
import UserStoryGeneration from "./pages/Code/UserStoryGeneration";
import Backlog from "./pages/Code/Backlog";

function App() {
  return (
    <Layout>
      <SimpleAlert />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Chat />} />
        <Route path="/query" element={<Queries />} />
        <Route path="/user-story" element={<UserStoryGeneration />} />
        <Route path="/backlog" element={<Backlog />} />
      </Routes>
    </Layout>
  );
}

export default App;
