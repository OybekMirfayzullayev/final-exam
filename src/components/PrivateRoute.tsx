import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function PrivateRoute() {
  const isAuth = useSelector((state: RootState) => state.auth.is_auth);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
