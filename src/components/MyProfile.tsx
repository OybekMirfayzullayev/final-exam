import { useEffect, useState } from "react";
import { Upload, Avatar, Button, Typography, Form, Input, message } from "antd";
import { useGetUserQuery, useUpdateUserMutation } from "../api/ApiService";

export default function MyProfile() {
  const { data, isLoading, refetch } = useGetUserQuery("");
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [form] = Form.useForm();
  const [profPhoto, setProfPhoto] = useState<File | null>(null);
  const [profileAvatar, setProfileAvatar] = useState<string>("");

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number_1: data.phone_number_1,
        user_role: data.user?.user_role,
      });
      setProfileAvatar(data.profile_photo || "/default-avatar.png");
    }
  }, [data, form]);

  const uploadProps = {
    beforeUpload: (file: File) => {
      setProfPhoto(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileAvatar(imageUrl);
      message.success("Image selected successfully!");
      return false;
    },
  };

  interface ProfileFormValues {
    first_name: string;
    last_name: string;
    phone_number_1: string;
    user_role: string;
  }

  const handleSave = async (values: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("phone_number_1", values.phone_number_1);
    formData.append("user_role", values.user_role);

    if (profPhoto) {
      formData.append("profile_photo", profPhoto);
    }

    try {
      await updateProfile(formData).unwrap();
      message.success("Profile updated successfully!");
      setProfPhoto(null);
      refetch();
    } catch (error) {
      message.error("Error while updating the profile.");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="w-[1200px] h-auto bg-white rounded-2xl p-5">
      <h1 className="text-[#192A3E] font-semibold">Profile</h1>

      <div className="w-full h-full">
        <div className="flex flex-col items-center pt-3">
          <Avatar
            size={85}
            src={profileAvatar}
            className="bg-blue-600 text-white text-lg"
          />
        </div>

        <div className="flex flex-col items-start mb-2">
          <Typography.Text className="mt-4 mb-2 text-gray-700 font-medium">
            File Upload Label Link
          </Typography.Text>
          <Upload {...uploadProps} showUploadList={false}>
            <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer bg-gray-50 hover:border-blue-500">
              <p className="text-gray-500">
                Drag and drop here or{" "}
                <span className="text-blue-600 font-medium">Browse Files</span>
              </p>
            </div>
          </Upload>
        </div>

        <Form className="mt-5 space-y-4" form={form} onFinish={handleSave} layout="vertical">
          <div className="w-[350px]">

          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: "Please enter your first name" }]}>
            <Input
              placeholder="First Name"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input
              placeholder="Last Name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="phone_number_1"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
              { pattern: /^\+998\d{9}$/, message: "The phone number entered is not valid." },
            ]}
          >
            <Input
              placeholder="+998"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="user_role"
            label="Who is the employee?"
          >
            <Input
              placeholder="Example: founder or marketer..."
              size="large"
            />
          </Form.Item>
          </div>

          <div className="flex justify-end gap-3">
            <Button onClick={() => form.resetFields()}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="bg-blue-600" loading={isUpdating}>
              Save
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}