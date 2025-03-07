// import React from 'react'
import { Button, Flex, Spin, Table, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetClientsQuery } from "../api/ApiService";
import ErrorPage from "./ErrorPage";

export default function Clients() {
  const { data, error, isLoading } = useGetClientsQuery(undefined);

  if (isLoading) return <Flex> <Spin size="large"/> </Flex>;
  if (error) return <ErrorPage/> ;

  const columns = [
    { title: "Name", dataIndex: "full_name", key: "full_name" },
    {
      title: "Points",
      dataIndex: "point",
      key: "point",
      render: (points: number) => `⭐ ${points} points`,
    },
    {
      title: "Lesson",
      dataIndex: "group_carts",
      key: "group_carts",
      render: (group_carts: { group_name: string }[]) =>
        group_carts.length > 0
          ? group_carts.map((g) => g.group_name).join(", ")
          : "No lessons",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color="green">{status}</Tag>,
    },
    {
      title: "Study Date",
      dataIndex: "group_carts",
      key: "study_date",
      render: (group_carts: { start_date: string }[]) =>
        group_carts.length > 0 ? group_carts[0].start_date : "N/A",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number_1",
      key: "phone_number_1",
    },
    { title: "Balance", dataIndex: "balance", key: "balance" },
  ];

  return (
    <>
      <div className="space-y-4">
        <div className="w-full h-[50px] flex justify-end items-center">
          <Button
            type="primary"
            icon={<UserOutlined />}
            className="h-[40px] px-4 text-white"
          >
            New Student
          </Button>
        </div>

        <div className="w-full h-400px bg-white rounded-2xl">
          <div className="p-3 max-h-[570px] overflow-y-auto">
            <Table columns={columns} dataSource={data?.results || []} pagination={false} />
          </div>
        </div>
      </div>
    </>
  );
}
