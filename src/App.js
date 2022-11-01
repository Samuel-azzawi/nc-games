import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext/UserContext";
import HomePage from "./components/HomePage";
import Reviews from "./components/Reviews";
function App() {
  const [user, setUser] = useState("sam");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <nav>
          <Link to="/reviews"></Link>
        </nav>
        <Routes>
          <Route
            path="/reviews"
            element={
              <div>
                <Reviews />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div>
                <HomePage />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
