import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./components/signIn";
import { DashBoard } from "./components/dashboard";
import { useState } from "react";
import UserContext from "./context/userContext";
import { IUser, initialUserState } from "./common-utils/commonUtils";
import ProtectedRoute from "./route-config/protectedRoute";

function App() {
  const [userContext, setUserContext] = useState<IUser>(initialUserState);

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<SignInPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
