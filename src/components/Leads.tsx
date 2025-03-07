import { FC } from "react";
import { Button, Flex, Spin } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useGetLeadListQuery } from "../api/ApiService";
import dayjs from "dayjs";
import ErrorPage from "./ErrorPage";


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



  if (isLoading) return <Flex> <Spin size="large"/> </Flex>;
  if (error) return <ErrorPage/> ;

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
                <UsergroupAddOutlined className="mr-0.5" /> {lead.source_display}
              </p>
              <p className="text-[14px]">
              <TeamOutlined className="mr-0.5" /> {lead.lesson_type}
              </p>
              <p className="text-[14px]">
                <CalendarOutlined className="mr-0.5" />
                {dayjs(lead.created_at).format("DD.MM.YYYY")}
              </p>

              <p className="text-[14px]">
              <UserOutlined className="mr-0.5"/>{lead.teacher?.teacher_name}
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
  return (
    <>
      {/* <div className="flex flex-col gap-3">
        <div className="w-full h-[50px] flex justify-end items-center">
          <Button
            type="primary"
            icon={<UserOutlined />}
            className="h-[40px] px-4 text-white"
          >
            New lead
          </Button>
        </div>

        <div className="w-full h-auto rounded-2xl bg-white p-3 flex gap-4">
          <div className="w-1/2 bg-gray-100 p-3 rounded-xl flex flex-col gap-1.5">
            <div className="w-full h-[38px] text-[16px] flex items-center justify-center bg-[#005EEB] text-white rounded-[10px] font-bold mb-3">
              <h1>New leads</h1>
            </div>
            <div className="shadow-md rounded-xl border bg-white p-2 border-gray-200">
              <h2 className="font-semibold text-[14px] text-[#334D6E] text-lg">
                Mirfayzullayev Oybek
              </h2>
              <div className="bg-[#33A9FF] text-white rounded-md w-[135px] h-[20px] mt-1 text-center text-[13px] font-medium">
                +998 88 688 80 31
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2.5 text-gray-600">
                <p>
                  <BookOutlined className="mr-0.5" /> Tanlanmagan
                </p>
                <p>
                  <UsergroupAddOutlined className="mr-0.5" /> Friend
                </p>
                <p>
                  <span className="mr-0.5">📺</span>Type: group
                </p>
                <p>
                  <CalendarOutlined className="mr-0.5" />
                  05.03.2025
                </p>
                <p>
                  <span className="mr-2"></span> Tanlanmagan
                </p>
                <p>
                  <ClockCircleOutlined className="mr-0.5" />
                  Tanlanmagan
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-gray-100 p-3 rounded-xl flex flex-col gap-1.5">
            <div className="w-full h-[38px] text-[16px] flex items-center justify-center bg-[#005EEB] text-white rounded-[10px] font-bold mb-3">
              <h1>Contacted</h1>
            </div>
            <div className="shadow-md rounded-xl border bg-white p-2 border-gray-200">
              <h2 className="font-semibold text-[14px] text-[#334D6E] text-lg">
                Mirfayzullayev Oybek
              </h2>
              <div className="bg-[#33A9FF] text-white rounded-md w-[135px] h-[20px] mt-1 text-center text-[13px] font-medium">
                +998 88 688 80 31
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2.5 text-gray-600">
                <p>
                  <BookOutlined className="mr-0.5" /> Tanlanmagan
                </p>
                <p>
                  <UsergroupAddOutlined className="mr-0.5" /> Friend
                </p>
                <p>
                  <span className="mr-0.5">📺</span>Type: group
                </p>
                <p>
                  <CalendarOutlined className="mr-0.5" />
                  05.03.2025
                </p>
                <p>
                  <span className="mr-2"></span> Tanlanmagan
                </p>
                <p>
                  <ClockCircleOutlined className="mr-0.5" />
                  Tanlanmagan
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-gray-100 p-3 rounded-xl flex flex-col gap-1.5">
            <div className="w-full h-[38px] text-[16px] flex items-center justify-center bg-[#005EEB] text-white rounded-[10px] font-bold mb-3">
              <h1>Trial lesson</h1>
            </div>
            <div className="shadow-md rounded-xl border bg-white p-2 border-gray-200">
              <h2 className="font-semibold text-[14px] text-[#334D6E] text-lg">
                Mirfayzullayev Oybek
              </h2>
              <div className="bg-[#33A9FF] text-white rounded-md w-[135px] h-[20px] mt-1 text-center text-[13px] font-medium">
                +998 88 688 80 31
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2.5 text-gray-600">
                <p>
                  <BookOutlined className="mr-0.5" /> Tanlanmagan
                </p>
                <p>
                  <UsergroupAddOutlined className="mr-0.5" /> Friend
                </p>
                <p>
                  <span className="mr-0.5">📺</span>Type: group
                </p>
                <p>
                  <CalendarOutlined className="mr-0.5" />
                  05.03.2025
                </p>
                <p>
                  <span className="mr-2"></span> Tanlanmagan
                </p>
                <p>
                  <ClockCircleOutlined className="mr-0.5" />
                  Tanlanmagan
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-gray-100 p-3 rounded-xl flex flex-col gap-1.5">
            <div className="w-full h-[38px] text-[16px] flex items-center justify-center bg-[#005EEB] text-white rounded-[10px] font-bold mb-3">
              <h1>Summary</h1>
            </div>
            <div className="shadow-md rounded-xl border bg-white p-2 border-gray-200">
              <h2 className="font-semibold text-[14px] text-[#334D6E] text-lg">
                Mirfayzullayev Oybek
              </h2>
              <div className="bg-[#33A9FF] text-white rounded-md w-[135px] h-[20px] mt-1 text-center text-[13px] font-medium">
                +998 88 688 80 31
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2.5 text-gray-600">
                <p>
                  <BookOutlined className="mr-0.5" /> Tanlanmagan
                </p>
                <p>
                  <UsergroupAddOutlined className="mr-0.5" /> Friend
                </p>
                <p>
                  <span className="mr-0.5">📺</span>Type: group
                </p>
                <p>
                  <CalendarOutlined className="mr-0.5" />
                  05.03.2025
                </p>
                <p>
                  <span className="mr-2"></span> Tanlanmagan
                </p>
                <p>
                  <ClockCircleOutlined className="mr-0.5" />
                  Tanlanmagan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col gap-3">
        <div className="w-full h-[50px] flex justify-end items-center">
          <Button
            type="primary"
            icon={<UserOutlined />}
            className="h-[40px] px-4 text-white"
          >
            New lead
          </Button>
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
