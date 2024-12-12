import React from "react";
import { Route, Routes } from "react-router-dom";

// import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Queries from "./pages/Queries";
import Layout from "./layout/index";
import SimpleAlert from "./components/Alert";

function App() {
  return (
    <Layout>
      <SimpleAlert />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Chat />} />
        <Route path="/query" element={<Queries />} />
      </Routes>
    </Layout>
  );
}

export default App;
