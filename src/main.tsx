import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import Login from "./auth/Login.tsx";
import { store } from "./store/store.ts";
import MainPage from "./components/MainPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import MyProfile from "./components/MyProfile.tsx";
import Leads from "./components/Leads.tsx";
import Clients from "./components/Clients.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<App />}>
              <Route index element={<MainPage />} />
              <Route path="/my-profile" element={<MyProfile/>}/>
              <Route path="/leads" element={<Leads/>}/>
              <Route path="/clients" element={<Clients/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
