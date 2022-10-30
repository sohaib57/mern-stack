import { Outlet } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar.js";

function App() {
  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;
