// import React from 'react'
import { Upload, Avatar, Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "../api/ApiService";

export default function MyProfile() {
  const [updateUser] = useUpdateUserMutation();
  const { data: userData, refetch } = useGetUserQuery({});
  const BASE_URL = "https://test.api.mydays.uz";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    imageUrl: null as string | null,
  });

  useEffect(() => {
    
    if (userData) {
        setFormData({
            firstName: userData.first_name || "",
            lastName: userData.last_name || "",
            phone: userData.phone_number_1 || "",
            role: userData.user?.user_role || "",
            imageUrl: userData.image_url || "",
    });
}

}, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = (info: any) => {
    const file = info.file;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, imageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData).unwrap();
      alert("Profile updated successfully!");
      await refetch();
      setFormData({ ...formData });
      console.log("After refetch:", userData);
    } catch (error) {
      alert("Failed to update profile!");
    }
  };

    
  return (
    <section className="w-[1200px] h-auto bg-white rounded-2xl p-5">
      <h1 className="text-[#192A3E] font-semibold">Profile</h1>

      <div className="w-full h-full">
        <div className="flex flex-col items-center pt-3">
          <Avatar
            size={85}
            src=""
            icon={<UserOutlined />}
            className="bg-blue-600 text-white text-lg"
          />
        </div>

        <div className="flex flex-col items-start mb-2">
          <Typography.Text className="mt-4 mb-2 text-gray-700 font-medium">
            File Upload Label Link
          </Typography.Text>

          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleUpload}
          >
            <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer bg-gray-50 hover:border-blue-500">
              <p className="text-gray-500">
                Drag and drop here or{" "}
                <span className="text-blue-600 font-medium">Browse Files</span>
              </p>
            </div>
          </Upload>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-[245px] h-[47px] border border-[#C2CFE0] outline-none p-2 rounded-lg"
              value={formData.firstName}
              onChange={handleChange}
              name="firstName"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              className="w-[245px] h-[47px] border border-[#C2CFE0] outline-none p-2 rounded-lg"
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Phone Number</label>
            <input
              type="text"
              placeholder="+998"
              className="w-[245px] h-[47px] border border-[#C2CFE0] outline-none p-2 rounded-lg"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">
              Who is the employee?
            </label>
            <input
              type="text"
              placeholder="Example: founder or marketer..."
              className="w-[245px] h-[47px] border border-[#C2CFE0] outline-none p-2 rounded-lg"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button >Cancel</Button>
            <Button type="primary"  htmlType="submit" className="bg-blue-600">
              Save
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
