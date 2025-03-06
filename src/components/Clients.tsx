// import React from 'react'

import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Clients() {
  return (
    <>
      <div className="space-y-4">
        <div className="w-full h-[50px] border flex justify-end items-center">
          <Button
            type="primary"
            icon={<UserOutlined />}
            className="h-[40px] px-4 text-white"
          >
            New Student
          </Button>
        </div>

        <div className="w-full h-[600px] bg-white rounded-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full border-none">
              <thead>
                <tr className="">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Points</th>
                  <th className="border px-4 py-2">Lesson</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Study date</th>
                  <th className="border px-4 py-2">Phone Number</th>
                  <th className="border px-4 py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border px-4 py-2">sheroz turdiyev</td>
                  <td className="border px-4 py-2">⭐ 0 points</td>
                  <td className="border px-4 py-2">Biologiya TTS 17.00</td>
                  <td className="border px-4 py-2 text-green-600">active</td>
                  <td className="border px-4 py-2">2024-09-05</td>
                  <td className="border px-4 py-2">+998939542111</td>
                  <td className="border px-4 py-2">0</td>
                </tr>
                <tr className="text-center">
                  <td className="border px-4 py-2">sheroz turdiyev</td>
                  <td className="border px-4 py-2">⭐ 0 points</td>
                  <td className="border px-4 py-2">
                    3 Uroven RUSSIAN TTS 14 00
                  </td>
                  <td className="border px-4 py-2 text-green-600">active</td>
                  <td className="border px-4 py-2">2024-12-14</td>
                  <td className="border px-4 py-2">+998939542111</td>
                  <td className="border px-4 py-2">0</td>
                </tr>
                <tr className="text-center">
                  <td className="border px-4 py-2">Oybek Mirfayzullayev</td>
                  <td className="border px-4 py-2">⭐ 0 points</td>
                  <td className="border px-4 py-2">
                    3 Uroven RUSSIAN TTS 14 00
                  </td>
                  <td className="border px-4 py-2 text-green-600">active</td>
                  <td className="border px-4 py-2">2024-12-14</td>
                  <td className="border px-4 py-2">+998939542111</td>
                  <td className="border px-4 py-2">0</td>
                </tr>
                <tr className="text-center">
                  <td className="border px-4 py-2">Oybek Mirfayzullayev</td>
                  <td className="border px-4 py-2">⭐ 0 points</td>
                  <td className="border px-4 py-2">3Ur Russian MWF 17:00</td>
                  <td className="border px-4 py-2 text-green-600">active</td>
                  <td className="border px-4 py-2">2025-01-10</td>
                  <td className="border px-4 py-2">+998939542111</td>
                  <td className="border px-4 py-2">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
