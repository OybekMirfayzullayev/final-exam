// import React from 'react'
import { Input, Avatar, Dropdown, Menu, Spin } from "antd";
import { useGetUserQuery } from "../api/ApiService";
import {
  CreditCardOutlined,
  LogoutOutlined,
  MessageOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/AuthSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserQuery("");

  if (isLoading) return <Spin />;

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setAuth({is_auth:false}))
    navigate("/login");

  };

  const menu = (
    <Menu className="w-48 shadow-lg rounded-lg">
      <Menu.Item icon={<UserOutlined />} key="profile" onClick={() => navigate("/my-profile")}>
        My profile
      </Menu.Item>
      <Menu.Item icon={<CreditCardOutlined />} key="billing">
        Billing
      </Menu.Item>
      <Menu.Item icon={<MessageOutlined />} key="support">
        Technique support
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />} key="settings" onClick={() => navigate("/my-profile")} >
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        icon={<LogoutOutlined />}
        key="logout"
        className="text-red-500"
        onClick={handleLogout}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <div className="w-10/12 h-[70px]  border-gray-100 flex items-center justify-between px-6 fixed top-0 right-0">
        <h2 className="text-lg font-bold text-[#334D6E]">Dashboard</h2>

        <div className="flex items-center mr-6">
          <Input
            placeholder="Global Search"
            prefix={<SearchOutlined />}
            className="w-[0px] bg-[#F3F4F7] rounded-lg"
          />

          <button className="cursor-pointer mx-10" onClick={handleFullScreen}>
            <svg
              width="21"
              height="21"
              color="#c2cfe0"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hover:text-blue-600 duration-200"
            >
              <path
                d="M14.037 6.62963L18.6667 2M18.6667 2H14.037M18.6667 2V6.62963M6.62963 6.62963L2 2M2 2L2 6.62963M2 2L6.62963 2M6.62963 14.037L2 18.6667M2 18.6667H6.62963M2 18.6667L2 14.037M14.037 14.037L18.6667 18.6667M18.6667 18.6667V14.037M18.6667 18.6667H14.037"
                stroke="currentcolor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>

          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <div className="flex items-center gap-2 px-5 py-[2px] rounded-lg hover:shadow-[0_0_5px_1px_#0000003e] cursor-pointer">
              <Avatar src={data?.profile_photo} size={40} />
              <div className="-space-y-1">
                <p className="font-semibold text-[#334D6E] text-[14px]">
                  {data?.last_name || "Unknown"}
                </p>
                <p className="text-[#90A0B7] text-[13px]">
                  {data?.user?.user_role || "User"}
                </p>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  );
}
