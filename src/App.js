import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext/UserContext";
import HomePage from "./components/HomePage";
import Reviews from "./components/Reviews";
import ReviewDetails from "./components/ReviewDetails";
function App() {
  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <nav>
          <Link to="/reviews"></Link>
          <Link to="/reviews/:id"></Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <HomePage />
              </div>
            }
          />
          <Route
            path="/reviews/:id"
            element={
              <div>
                <ReviewDetails />
              </div>
            }
          />
          <Route
            path="/reviews"
            element={
              <div>
                <Reviews />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
