import { FC, useState } from "react";
import { Button, Divider, Flex, Input, Modal, Select, Spin } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  UserOutlined,
  TeamOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  useGetLeadListQuery,
  useGetSubjectsQuery,
  useGetTeachersQuery,
  useGetLessonTimeQuery,
} from "../api/ApiService";
import dayjs from "dayjs";
import ErrorPage from "./ErrorPage";
const { Option } = Select;

interface Lead {
  id: number;
  status: number;
  first_name: string;
  last_name: string;
  source_display: string;
  lesson_type: string;
  created_at: string;
  teacher: any;
  teacher_name: string;
  lesson_time: string;
  phone: string;
}

interface LeadListProps {
  status: number;
  title: string;
}

const LeadList: FC<LeadListProps> = ({ status, title }) => {
  const { data, isLoading, error } = useGetLeadListQuery(undefined);

  if (isLoading)
    return (
      <Flex>
        {" "}
        <Spin size="large" />{" "}
      </Flex>
    );
  if (error) return <ErrorPage />;

  const leads: Lead[] = data?.results || [];
  const filteredLeads = leads.filter((lead) => lead.status === status);

  return (
    <div className="w-1/2 bg-gray-100 p-3 rounded-xl flex flex-col gap-1.5">
      <div className="w-full h-[38px] text-[16px] flex items-center justify-center bg-[#005EEB] text-white rounded-[10px] font-bold mb-3">
        <h1>{title}</h1>
      </div>

      {filteredLeads.length > 0 ? (
        filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="shadow-md rounded-xl border bg-white p-2 border-gray-200"
          >
            <h2 className="font-semibold text-[14px] text-[#334D6E] text-lg">
              {lead.first_name} {lead.last_name}
            </h2>
            <div className="bg-[#33A9FF] text-white rounded-md w-[135px] h-[20px] mt-1 text-center text-[13px] font-medium">
              {lead.phone}
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2 text-gray-600">
              <p className="text-[14px]">
                <BookOutlined className="mr-0.5" /> Tanlanmagan
              </p>
              <p className="text-[14px]">
                <UsergroupAddOutlined className="mr-0.5" />{" "}
                {lead.source_display}
              </p>
              <p className="text-[14px]">
                <TeamOutlined className="mr-0.5" /> {lead.lesson_type}
              </p>
              <p className="text-[14px]">
                <CalendarOutlined className="mr-0.5" />
                {dayjs(lead.created_at).format("DD.MM.YYYY")}
              </p>

              <p className="text-[14px]">
                <UserOutlined className="mr-0.5" />
                {lead.teacher?.teacher_name}
              </p>

              <p className="text-[14px]">
                <ClockCircleOutlined className="mr-0.5" />
                {lead.lesson_time ? lead.lesson_time.slice(0, 5) : "Noma'lum"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">Hech qanday lead yo‘q</p>
      )}
    </div>
  );
};

export default function Leads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: subjects } = useGetSubjectsQuery(undefined);
  const { data: teachers } = useGetTeachersQuery(undefined);
  const { data: lessonTimes } = useGetLessonTimeQuery(undefined);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");

  const isFormValid = firstName && lastName && phone && subject;

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="w-full h-[50px] flex justify-end items-center">
          <Button
            type="primary"
            icon={<UserOutlined />}
            className="h-[40px] px-4 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            New lead
          </Button>

          <Modal
            title={null}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            closeIcon={<CloseOutlined className="text-gray-400 text-lg" />}
            centered
            bodyStyle={{ padding: 15 }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#334d6e]">
                Add new lead
              </h2>
              <p className="text-[#90a0b7] text-sm">
                By creating a new lead, you will also be adding a new customer
                to the customer base
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <label className="text-[#334d6e] text-[12px] font-semibold">
                  First name
                </label>
                <Input placeholder="First name" className="h-[40px]" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="text-[#334d6e] text-[12px] font-semibold">
                  Last name
                </label>
                <Input placeholder="Last name" className="h-[40px]" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </div>
              <div>
                <label className="text-[#334d6e] text-[12px] font-semibold">
                  Phone number
                </label>
                <Input
                  placeholder="Phone number"
                  className="h-[40px]"
                  prefix="+998"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[#334d6e] text-[12px] font-semibold">
                  Select subject
                </label>
                <Select
                  placeholder="Select subject"
                  className="w-full h-[40px]"
                  suffixIcon={<DownOutlined />}
                  size="large"
                  value={subject} onChange={(value) => setSubject(value)}
                >
                  {subjects?.map((data: any) => (
                    <Option key={data.id} value={data.id}>
                      {data.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <Divider />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#334d6e] text-[12px] font-semibold">
                  Select lesson type
                </label>
                <Select
                  placeholder="Select lesson type"
                  className="w-full h-[40px]"
                  suffixIcon={<DownOutlined />}
                  size="large"
                >
                  <Option value="individual">Individual</Option>
                  <Option value="group">Group</Option>
                </Select>
              </div>
              <div>
                <label className="text-[#334d6e] text-[12px] font-semibold">
                  Select teacher
                </label>
                <Select
                  placeholder="Select teacher"
                  className="w-full h-[40px]"
                  suffixIcon={<DownOutlined />}
                  size="large"
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
                  Select lesson time
                </label>
                <Select
                  placeholder="Select lesson time"
                  className="w-full h-[40px]"
                  suffixIcon={<DownOutlined />}
                  size="large"
                >
                  {lessonTimes?.map((data: any) => (
                    <Option key={data.id} value={data.id}>
                      {data.start_time}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="text-[#334d6e] text-[12px] font-semibold">
                  Select lead source
                </label>
                <Select
                  placeholder="Select lead source"
                  className="w-full h-[40px]"
                  suffixIcon={<DownOutlined />}
                  size="large"
                >
                  <Option value="website">Website</Option>
                  <Option value="referral">Referral</Option>
                </Select>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="h-[40px] w-[100px]"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className="h-[40px] w-[100px]"
                disabled={!isFormValid}
              >
                Confirm
              </Button>
            </div>
          </Modal>
        </div>

        <div className="w-full h-auto rounded-2xl bg-white p-3 flex gap-4">
          <LeadList status={0} title="New Leads" />
          <LeadList status={1} title="Contacted" />
          <LeadList status={2} title="Trial Lesson" />
          <LeadList status={3} title="Summary" />
        </div>
      </div>
    </>
  );
}
