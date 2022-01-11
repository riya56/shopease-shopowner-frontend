import React, { Suspense, lazy } from "react";
import "antd/dist/antd.css";

import Routes from "./routes/publicRoutes"
// window.addEventListener("beforeunload", (ev) => {
//   ev.preventDefault();
//   localStorage.removeItem("userInfo");
//   return ev.returnValue = 'Are you sure you want to close?';
// });
function App() {
  return (
    <div>
        <Routes />
    </div>
  );
}

export default App;
