// import React from 'react'
import Myday from "../img/myday.png";
import { Avatar, Dropdown, Menu, Typography } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  TeamOutlined,
  ReadOutlined,
  SolutionOutlined,
  BankOutlined,
  PieChartOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";


const menu = (
  <Menu>
    <Menu.Item key="1">Main Branch</Menu.Item>
  </Menu>
);

export default function () {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-2/12 h-screen fixed left-0">
        <div className="w-full h-[70px] flex justify-center items-center border-r border-b border-gray-100 ">
          <Link to={"/"}>
          <img src={Myday} alt="MyDay" className="w-[170px]" />
          </Link>
        </div>

        <div className="flex items-center pl-5 h-[70px] gap-3 border-r border-gray-100">
          <Avatar icon={<BankOutlined />} size="default" />
          <div className="flex flex-col">
            <Typography.Text strong className="text-2xl">
              Main branch
            </Typography.Text>
            <Dropdown overlay={menu} trigger={["click"]}> 
              <div className="flex items-center text-gray-500 cursor-pointer">
                <Typography.Text className="text-sm">
                  Main Branch
                </Typography.Text>
                <DownOutlined className="ml-1 text-xs" /> 
              </div>
            </Dropdown>
          </div>
        </div>

        <div className="w-[254px]">
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<AppstoreOutlined />} onClick={() => navigate("/")}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<SolutionOutlined />} onClick={() => navigate("/leads")}>
              Leads
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />} onClick={() => navigate("/clients")}>
              Clients
            </Menu.Item>
            <Menu.Item key="4" icon={<TeamOutlined />}>
              Groups
            </Menu.Item>
            <Menu.Item key="5" icon={<ReadOutlined />}>
              Course
            </Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />}>
              Personnel
            </Menu.Item>
            <Menu.Item key="7" icon={<BankOutlined />}>
              Finance
            </Menu.Item>
            <Menu.Item key="8" icon={<PieChartOutlined />}>
              Reports
            </Menu.Item>
            <Menu.Item key="9" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </>
  );
}
