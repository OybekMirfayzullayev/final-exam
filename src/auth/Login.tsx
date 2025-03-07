import { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import { Input, Button, message } from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/AuthSlice";
import { RootState } from "../store/store";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [user_pass, setUserPass] = useState({ username: "", password: "" });
  const isAuth = useSelector((state: RootState) => state.auth.is_auth);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  

  const handleLogin = async () => {
    try {
      const response = await login(user_pass).unwrap();
      console.log("Login response:", response);
      
      localStorage.setItem("token", response.access); 
      dispatch(setAuth({ is_auth: true }));
      message.success("Kirish tasdiqlandi");
      navigate("/");
    } catch (error) {
      message.error("Login yoki parol xato.");
    }
};

  return (
    <div className="login_page h-screen flex items-center justify-center">
      <div className="w-[550px] h-[640px] rounded-2xl bg-white flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <img src={Logo} alt="Logo" className="w-[270px]" />
          <h1 className="text-[#334d6e] text-[17px]">Welcome!</h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="p-8 w-96">
            <h2 className="text-[19px] font-normal mb-1">Username</h2>
            <Input
              size="large"
              placeholder="Username"
              prefix={<UserOutlined />}
              className="mb-5"
              value={user_pass.username}
              onChange={(e) => setUserPass({ ...user_pass, username: e.target.value })}
            />
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-[19px] font-normal">Password</h2>
              <Link to={""}>
                <span className="text-blue-500 text-sm cursor-pointer">Forgot Password?</span>
              </Link>
            </div>
            <Input.Password
              size="large"
              placeholder="Password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="mb-10"
              value={user_pass.password}
              onChange={(e) => setUserPass({ ...user_pass, password: e.target.value })}
            />
            <Button
              type="primary"
              block
              size="large"
              className="bg-blue-600"
              loading={isLoading}
              onClick={handleLogin}
            >
              Confirm
            </Button>
            <div className="text-center mt-4 text-gray-400 cursor-pointer">Sign up</div>
          </div>
        </div>
      </div>
    </div>
  );
}
