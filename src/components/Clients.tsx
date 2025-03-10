import { useState } from "react";
import {
  Button,
  DatePicker,
  Flex,
  Input,
  Modal,
  Radio,
  Select,
  Spin,
  Table,
  Tag,
  message
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import ErrorPage from "./ErrorPage";
import {
  useGetClientsQuery,
  useGetSubjectsQuery,
  useGetTeachersQuery,
  useGetLevelQuery,
  useGetGroupListQuery,
  useAddStudentMutation
} from "../api/ApiService";
import moment from "moment";
import { Dayjs } from "dayjs";

const { Option } = Select;

export default function Clients() {
  const { data, error, isLoading, refetch } = useGetClientsQuery(undefined);
  const { data: teachers } = useGetTeachersQuery(undefined);
  const { data: subjects } = useGetSubjectsQuery(undefined);
  const { data: levels } = useGetLevelQuery(undefined);
  const { data: groups } = useGetGroupListQuery(undefined);
  const [addStudent] = useAddStudentMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState<number | null>(null);
  const [level, setLevel] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedLessonType, setSelectedLessonType] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthday: null,
    discount: 0,
    discountType: "UZS",
    startDate: null,
    days:null,
    firstMonthDiscount: false
  });

  if (isLoading)
    return (
      <Flex>
        {" "}
        <Spin size="large" />{" "}
      </Flex>
    );
  if (error) return <ErrorPage />;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Dayjs | null, field: string) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSelectChange = (value: any, field: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddStudent = async () => {
    try {
      await addStudent({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number_1: formData.phoneNumber,
        birthday: formData.birthday ? moment(formData.birthday).format('YYYY-MM-DD'): null,
        group_type: selectedLessonType,
        days: formData.days,
        discount_first_month: formData.firstMonthDiscount,
        finance_type: "cash",
        start_date: formData.startDate ? moment(formData.startDate).format('YYYY-MM-DD'): null,
        branch: 1,
        subject,
        level,
        teacher,
        monthly_discount: formData.discount,
        first_month_discount: formData.discount,
        group_id: selectedGroup,
        calculation_type: 6
      }).unwrap();
      message.success("Student added successfully");
      refetch();
      setIsSecondModalVisible(false);
    } catch (error) {
      message.error("Failed to add student");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "full_name", key: "full_name" },
    {
      title: "Points",
      dataIndex: "point",
      key: "point",
      render: (points: any) => `⭐ ${points} points`,
    },
    {
      title: "Lesson",
      dataIndex: "group_carts",
      key: "group_carts",
      render: (group_carts: any) =>
        group_carts.length > 0
          ? group_carts.map((g: any) => g.group_name).join(", ")
          : "No lessons",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => <Tag color="green">{status}</Tag>,
    },
    {
      title: "Study Date",
      dataIndex: "group_carts",
      key: "study_date",
      render: (group_carts: any) =>
        group_carts.length > 0 ? group_carts[0].start_date : "N/A",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number_1",
      key: "phone_number_1",
    },
    { title: "Balance", dataIndex: "balance", key: "balance" },
  ];

  const formattedGroups =
    groups?.map((group: any) => ({
      id: group.id,
      group_name: group.name,
      teacher: group.teacher || "N/A",
      time: group.start_date || "Unknown",
    })) || [];

  return (
    <>
      <div className="space-y-4">
        <div className="w-full h-[50px] flex justify-end items-center">
          <Button
            type="primary"
            icon={<UserOutlined />}
            className="h-[40px] px-4 text-white"
            onClick={() => setIsModalVisible(true)}
          >
            New Student
          </Button>
        </div>
        <div className="w-full h-400px bg-white rounded-2xl">
          <div className="p-3 max-h-[570px] overflow-y-auto">
            <Table
              columns={columns}
              dataSource={data?.results || []}
              pagination={false}
            />
          </div>
        </div>
      </div>

      {/* First modal */}
      <Modal
        title={
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#334d6e]">
              Add a new student
            </h1>
            <p className="text-[#90A0B7] text-[14px] font-normal">
              Fill in the requested information below
            </p>
          </div>
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto", padding: 15 }}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#334d6e] text-[12px] font-semibold">
                First name*
              </label>
              <Input
                placeholder="First name"
                name="firstName"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-[#334d6e] text-[12px] font-semibold">
                Last name*
              </label>
              <Input
                placeholder="Last name"
                name="lastName"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#334d6e] text-[12px] font-semibold">
                Phone number*
              </label>
              <Input
                placeholder="Phone number"
                prefix="+998"
                name="phoneNumber"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-[#334d6e] text-[12px] font-semibold">
                Birthday*
              </label>
              <DatePicker
                className="w-full"
                placeholder="Select date"
                onChange={(date) => handleDateChange(date, "birthday")}
              />
            </div>
          </div>
          <div>
            <label className="text-[#334d6e] text-[12px] font-semibold">
              Select type of lesson*
            </label>
            <Radio.Group
              className="w-full flex justify-start space-x-6"
              value={selectedLessonType}
              onChange={(e) => setSelectedLessonType(e.target.value)}>
              <Radio value="individual">Individual lesson</Radio>
              <Radio value="group">Group lesson</Radio>
            </Radio.Group>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="primary"
              onClick={() => {
                if (selectedLessonType) {
                  setIsModalVisible(false);
                  setIsSecondModalVisible(true);
                }
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>

      {/* Second modal */}
      <Modal
        title={
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#334d6e]">
              Add a new student
            </h1>
            <p className="text-[#90A0B7] text-[14px] font-normal">
              Fill in the requested information below
            </p>
          </div>
        }
        visible={isSecondModalVisible}
        onCancel={() => setIsSecondModalVisible(false)}
        footer={null}
        centered
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#334d6e] text-[12px] font-semibold">
                Select subject
              </label>
              <Select
                className="w-full"
                placeholder="Select"
                value={subject}
                onChange={(value) => setSubject(value)}
              >
                {subjects?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-[#334d6e] text-[12px] font-semibold">
                Select level
              </label>
              <Select
                className="w-full"
                placeholder="Select"
                value={level}
                onChange={(value) => setLevel(value)}
              >
                {levels?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-[#334d6e] text-[12px] font-semibold">
                Select teacher
              </label>
              <Select
                className="w-full"
                placeholder="Select"
                value={teacher}
                onChange={(value) => setTeacher(value)}
              >
                {teachers?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.teacher_name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-[#334d6e] text-[12px] font-semibold">
                Select days
              </label>
              <Select
                className="w-full"
                placeholder="Select"
                onChange={(value) => handleSelectChange(value, "days")}
              >
                <Option value={1}>Juft</Option>
                <Option value={2}>Toq</Option>
              </Select>
            </div>
          </div>

          <div className="w-full h-auto border-gray-300 border-[2px] rounded-lg overflow-hidden">
            <div className="max-h-[200px] overflow-y-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 sticky top-0 overflow-y-hidden z-30">
                  <tr className="">
                    <th className="w-10"></th>
                    <th className="text-[12px] p-1">Group Name</th>
                    <th className="text-[12px] p-1">Teacher</th>
                    <th className="text-[12px] p-1">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {formattedGroups.map((group: any) => (
                    <tr
                      onClick={() => setSelectedGroup(group.id)}
                      key={group.id}
                      className={`border-b border-b-gray-300 bg-white cursor-pointer ${
                        selectedGroup === group.id ? "bg-blue-100" : ""
                      }`}
                    >
                      <td className="text-center">
                        <Radio
                          className="scale-80"
                          checked={selectedGroup === group.id}
                          onChange={() => setSelectedGroup(group.id)}
                        />
                      </td>
                      <td className="text-[11px] w-[150px] max-w-[150px] truncate">
                        {group.group_name}
                      </td>
                      <td className="text-[11px] w-[130px] max-w-[130px] truncate">
                        {group.teacher}
                      </td>
                      <td className="text-[11px] w-[70px]">{group.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2">
              <div className="w-2/3">
                <label className="text-[#334d6e] text-[12px] font-semibold">
                  Monthly discount
                </label>
                <Input
                  type="number"
                  placeholder="Amount"
                  className="w-full"
                  name="discount"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/3">
                <label className="invisible">Currency</label>
                <Select
                  className=""
                  defaultValue="UZS"
                  onChange={(value) =>
                    handleSelectChange(value, "discountType")
                  }
                >
                  <Option value="UZS">So'm</Option>
                  <Option value="%">%</Option>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-[#334d6e] text-[12px] font-semibold">
                Select start day*
              </label>
              <DatePicker
                className="w-full"
                placeholder="Select date"
                onChange={(date) => handleDateChange(date, "startDate")}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Radio
                checked={formData.firstMonthDiscount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstMonthDiscount: e.target.checked,
                  })
                }
              >
                Discount for the first month
              </Radio>
            </div>
          </div>

          <div className="flex justify-end mt-7 gap-3">
            <Button
              onClick={() => {
                setIsSecondModalVisible(false);
                setIsModalVisible(true);
              }}
            >
              Go Back
            </Button>
            <Button
              type="primary"
              onClick={handleAddStudent}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}