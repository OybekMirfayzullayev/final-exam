import { useState, useEffect } from "react";
import { Form, Input, Button, Avatar, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useGetProfilQuery,
  useUpdateProfileMutation,
} from "../../store/service/apiClient";

export default function Profile() {
  const { data, isLoading, refetch } = useGetProfilQuery("");
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [form] = Form.useForm();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number_1: data.phone_number_1,
      });
      setPreviewImage(data.profile_photo || "/default-avatar.png");
    }
  }, [data, form]);

  const uploadProps = {
    beforeUpload: (file: File) => {
      setProfilePhoto(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      message.success("Image selected successfully!");
      return false;
    },
  };

  interface ProfileFormValues {
    first_name: string;
    last_name: string;
    phone_number_1: string;
  }

  const handleSave = async (values: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("phone_number_1", values.phone_number_1);

    if (profilePhoto) {
      formData.append("profile_photo", profilePhoto);
    }

    try {
      await updateProfile(formData).unwrap();
      message.success("Profile updated successfully!");
      setProfilePhoto(null);
      refetch();
    } catch (error) {
      message.error("An error occurred while updating the profile.");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>

      <div className="flex flex-col items-center">
        <Avatar src={previewImage} size={100} />
        <Upload {...uploadProps} showUploadList={false}>
          <Button icon={<UploadOutlined />} className="mt-2">
            Upload New
          </Button>
        </Upload>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className="mt-4"
      >
        <Form.Item
          label="First name"
          name="first_name"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="last_name"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phone_number_1"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>

        <div className="flex justify-end space-x-2">
          <Button onClick={() => form.resetFields()}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdating}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
