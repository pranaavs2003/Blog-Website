import "./app.scss";
import Topbar from "./components/topbar/Topbar.jsx";
import Home from "./pages/home/Home.jsx";
import Single from "./pages/single/Single.jsx";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <div className="app">
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route exact path="/">
            <Route index element={user ? <Home /> : <Login />} />
            <Route path="login" element={user ? <Home /> : <Login />} />
            <Route path="register" element={user ? <Home /> : <Register />} />
            <Route path="write" element={user ? <Write /> : <Login />} />
            <Route path="settings" element={user ? <Settings /> : <Login />} />
            <Route
              path="post/:postId"
              element={user ? <Single /> : <Login />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
