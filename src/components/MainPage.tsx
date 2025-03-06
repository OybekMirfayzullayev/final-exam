// import React from 'react'
import { FaBookOpen, FaGraduationCap } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { GiCoins } from "react-icons/gi";
import Chart from "react-apexcharts";

export default function MainPage() {
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Paid", "Not paid"],
    colors: ["#0057FF", "#B0C4DE"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Payments",
            },
          },
        },
      },
    },
  };

  const series = [60, 40];

  const barOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AVG"],
    },
    colors: ["#0057FF"],
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val.toLocaleString()} so’m`,
      },
    },
  };

  const barSeries = [
    {
      name: "Amount",
      data: [
        25000000, 35000000, 50000000, 33000000, 44000000, 57000000, 31000000,
        45000000,
      ],
    },
  ];

  const progressRed = {
    chart: { type: "radialBar", sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        track: { background: "#FDEAE9", strokeWidth: "150%" },
        dataLabels: {
          show: true,
          name: { show: false },
          value: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
            offsetY: 6,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    stroke: { lineCap: "round" },
    colors: ["#F7685B"],
  };

  const progressSeriesRed = [67];

  const progressGreen = {
    chart: { type: "radialBar", sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        track: { background: "#E8FAF0", strokeWidth: "150%" },
        dataLabels: {
          show: true,
          name: { show: false },
          value: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
            offsetY: 6,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    stroke: { lineCap: "round" },
    colors: ["#2ED47A"],
  };

  const progressSeriesGreen = [35];

  const progressYellow = {
    chart: { type: "radialBar", sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        track: { background: "#FFF7EA", strokeWidth: "150%" },
        dataLabels: {
          show: true,
          name: { show: false },
          value: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
            offsetY: 6,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    stroke: { lineCap: "round" },
    colors: ["#FFB946"],
  };

  const progressSeriesYellow = [21];

  return (
    <main>
      <div className="bg-[#f3f4f7] flex justify-center items-center  flex-col gap-1">
          <div className=" w-full h-[130px] grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-white flex items-center pl-10 gap-3">
              <div className="w-[65px] h-[65px] bg-[#33A9FF] rounded-xl flex items-center justify-center text-white">
                <FiUser className=" text-3xl" />
              </div>
              <div className="">
                <h2 className="text-2xl font-bold">45</h2>
                <p className="text-gray-500 text-sm">New leads</p>
              </div>
            </div>

            <div className="rounded-lg bg-white flex items-center pl-10 gap-3">
              <div className="w-[65px] h-[65px] bg-[#33A9FF] rounded-xl flex items-center justify-center text-white">
                <FaGraduationCap className=" text-3xl" />
              </div>
              <div className="">
                <h2 className="text-2xl font-bold">45</h2>
                <p className="text-gray-500 text-sm">All students</p>
              </div>
            </div>

            <div className="rounded-lg bg-white flex items-center pl-10 gap-3">
              <div className="w-[65px] h-[65px] bg-[#33A9FF] rounded-xl flex items-center justify-center text-white">
                <FaUserGroup className=" text-3xl" />
              </div>
              <div className="">
                <h2 className="text-2xl font-bold">45</h2>
                <p className="text-gray-500 text-sm">Groups</p>
              </div>
            </div>

            <div className="rounded-lg bg-white flex items-center pl-10 gap-3">
              <div className="w-[65px] h-[65px] bg-[#33A9FF] rounded-xl flex items-center justify-center text-white">
                <GiCoins className=" text-3xl" />
              </div>
              <div className="">
                <h2 className="text-2xl font-bold">16</h2>
                <p className="text-gray-500 text-sm">Debtors</p>
              </div>
            </div>
          </div>

        <div className="w-full h-[320px] flex items-center justify-start gap-4">
          <div className="w-[295px] h-[305px] rounded-lg bg-white flex flex-col justify-center items-center relative">
          <h1 className="absolute top-2 left-4 text-[#334D6E] font-semibold">Payment status</h1>
            <Chart
              options={options}
              series={series}
              type="donut"
              height={250}
            />
          </div>
          
          <div className="w-[609px] h-[305px] rounded-lg bg-white flex items-center justify-center flex-col relative">
            {/* <h1 className="absolute top-0.5 left-3.5 text-[14px] font-semibold text-[#334D6E]">Monthly financial indicators</h1> */}
            <Chart
              options={barOptions}
              series={barSeries}
              type="bar"
              width={550}
              height={290}
            />
          </div>

          <div className="w-[292px] h-[305px] gird grid-rows-3 space-y-3.5 content-center">
            <div className="w-full h-[92px]  rounded-lg bg-white flex items-center justify-center gap-2">
              <div className="w-[90px]">
                <Chart
                  options={progressRed}
                  series={progressSeriesRed}
                  type="radialBar"
                  height={95}
                  width={95}
                />
              </div>

              <div className="flex flex-col">
                <p className="text-gray-500 text-sm">In this month</p>
                <h2 className="text-[18px] font-bold">
                  255 000 000{" "}
                  <span className="text-gray-500 text-sm">so’m</span>
                </h2>

                <div className="flex items-center gap-2 text-gray-600 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="rounded-full w-[24px] h-[24px] flex items-center justify-center bg-[#FEEEED]">
                      <FaBookOpen className="text-[#F7685B] text-[15px]" />
                    </div>
                    General English
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="rounded-full w-[24px] h-[24px] flex items-center justify-center bg-[#FEEEED]">
                      <FaGraduationCap className="text-[#F7685B] text-[15px]" />
                    </div>{" "}
                    1255
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full h-[92px]  rounded-lg bg-white flex items-center justify-center gap-2">
              <div className="w-[90px]">
                <Chart
                  options={progressGreen}
                  series={progressSeriesGreen}
                  type="radialBar"
                  height={95}
                  width={95}
                />
              </div>

              <div className="flex flex-col">
                <p className="text-gray-500 text-sm">In this month</p>
                <h2 className="text-[18px] font-bold">
                  255 000 000{" "}
                  <span className="text-gray-500 text-sm">so’m</span>
                </h2>

                <div className="flex items-center gap-2 text-gray-600 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="rounded-full w-[24px] h-[24px] flex items-center justify-center bg-[#E8FAF0]">
                      <FaBookOpen className="text-[#2ED47A] text-[15px]" />
                    </div>
                    General English
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="rounded-full w-[24px] h-[24px] flex items-center justify-center bg-[#E8FAF0]">
                      <FaGraduationCap className="text-[#2ED47A] text-[15px]" />
                    </div>{" "}
                    1255
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[92px]  rounded-lg bg-white flex items-center justify-center gap-2">
              <div className="w-[90px]">
                <Chart
                  options={progressYellow}
                  series={progressSeriesYellow}
                  type="radialBar"
                  height={95}
                  width={95}
                />
              </div>

              <div className="flex flex-col">
                <p className="text-gray-500 text-sm">In this month</p>
                <h2 className="text-[18px] font-bold">
                  255 000 000{" "}
                  <span className="text-gray-500 text-sm">so’m</span>
                </h2>

                <div className="flex items-center gap-2 text-gray-600 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="rounded-full w-[24px] h-[24px] flex items-center justify-center bg-[#FFF7EA]">
                      <FaBookOpen className="text-[#FFB946] text-[15px]" />
                    </div>
                    General English
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="rounded-full w-[24px] h-[24px] flex items-center justify-center bg-[#FFF7EA]">
                      <FaGraduationCap className="text-[#FFB946] text-[15px]" />
                    </div>{" "}
                    1255
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* <div className="w-full h-[500px]">

        </div> */}


      </div>
    </main>
  );
}
