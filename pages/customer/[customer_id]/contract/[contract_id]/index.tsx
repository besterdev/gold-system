import React from 'react'
import _ from 'lodash'
import { toFormatString } from 'core/utils/format'

import { Button } from '@core/components/Buttons'

const ContractPage = () => {
  return (
    <div className="flex justify-center w-screen h-screen bg-grey-100">
      <div className="">
        <div className="flex items-center justify-between mt-24 print:hidden">
          <div className="flex space-x-4 text-grey-600">
            <i className="fa-solid fa-pen" />
            <i className="fa-solid fa-eye" />
            <i className="fa-solid fa-print" />
          </div>
          <Button color="primary" className="h-12 mt-6 print:hidden" onClick={() => null} size="large">
            <i className="mr-2 fa-solid fa-file-circle-check" />
            ปิดสัญญา
          </Button>
        </div>
        <div className="mt-6 w-full max-w-[800px] rounded-xl bg-white p-10 shadow-card print:mt-2 print:block">
          <div className="flex items-center justify-between">
            <p className="heading3 text-grey-800">สัญญา</p>
            <div className="flex flex-col items-end justify-center">
              <div className="rounded-md bg-green-100 px-2.5 text-center text-green-600">
                <p className="button2">เปิด</p>
              </div>
              <p className="mt-4 heading5 text-grey-800">INV-17052</p>
            </div>
          </div>
          <DetailLine label={'วันที่เริ่มสัญญา'} detail={'12 มกราคม 2562'} className="mt-10" />
          <DetailLine label={'ชื่อลูกค้า'} detail={'สุพิศ วิเศษชาติ'} className="mt-6" />
          <DetailLine label={'บัตรประจำตัวประชาชน'} detail={'6601674808682'} className="mt-6" />
          <DetailLine label={'เบอร์โทร'} detail={'0909796320'} className="mt-6" />
          <DetailLine label={'ที่อยู่'} detail={'หมู่บ้าน ดีเค ซอยพระยามนต์ธาตุฯ แยก 35-16-1 10150'} className="mt-6" />
          <DetailLine label={'ระยะเวลาฝาก'} detail={'3 เดือน'} className="mt-6" />
          <DetailLine label={'ครบกำหนด'} detail={'12 เมษายน 2562'} className="mt-6" />

          <ItemListTable />
          <p className="mt-6 heading6 text-start text-grey-800">
            ยอดทั้งหมด <span>{toFormatString(69000)} บาท</span>
          </p>

          <ul className="hidden mt-6 list-disc body2 text-grey-800 print:block">
            <li>
              ข้าพเจ้าขอรับรองแและให้สัญญาว่าของที่นำมาขายฝากนี้ เป็นของบริสุทธิ์และเป็นของข้าพเจ้าโดยแท้จริง ถ้าไม่ได้ถ่ายคืนภายในกำหนด
              ข้าพเจ้ายอมให้หลุดเป็นสิทธิ์แก่ผู้ซื้อฝาก และถ้าสัญญาขายฝากฉบับนี้หาย ถือว่าข้าพเจ้าสละสิทธิ์การไถ่ถอน
            </li>
            <li>เอกสาร 2 ฉบับไม่ตรงกัน ยินยอมให้ยืดถือฉบับผู้ชื้อฝากเป็นสำคัญ (ใบจริง)</li>
            <li>
              ผู้ขายฝากไม่ติดใจเรียกร้องค่าเสียหายหรือความสูญหายของทรัพย์ขายฝาก เว้นแต่เป็นความประมาทเลินเล่ออย่างร้ายแรง
              หรือผู้รับซื้อฝากมิได้รักษาทรัพย์ขายฝากที่มีมูลค่าทางจิตใจผู้ขายฝากยอมสละสิทธิ์เรียกร้อง เช่น เพชร, พลอย, พระหรือวัตถุบูชา, ลฯ
            </li>
          </ul>
          <div className="justify-between hidden mt-6 print:flex ">
            <p>ลงชื่อ....................................ผู้ขายฝาก</p>
            <p>ลงชื่อ....................................พยาน</p>
          </div>
          <div className="justify-between hidden mt-4 print:flex">
            <p>ลงชื่อ....................................ผู้ขายฝาก</p>
            <p>ลงชื่อ....................................พยาน</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractPage

interface DetailLineProps {
  label: string
  detail: string
  className?: string
}

export const DetailLine = ({ label, detail, className }: DetailLineProps) => (
  <div className={`body1 flex space-x-4 ${className}`}>
    <p className="w-40 text-grey-600">{label}</p>
    <p className="text-grey-800">{detail}</p>
  </div>
)

const ItemData = [
  { name: 'สร้อยคอ', weight: '10', price: 30000 },
  { name: 'สร้อยข้อมือ', weight: '4', price: 24000 },
  { name: 'กำไร', weight: '2', price: 15000 }
]

export const ItemListTable = () => (
  <table className="w-full">
    <thead>
      <tr className="border-b heading7 border-grey-300">
        <th className="py-4 text-start"></th>
        <th className="py-4 text-start">รายการ</th>
        <th className="py-4 text-start">น้ำหนัก</th>
        <th className="py-4 text-start">ราคา</th>
      </tr>
    </thead>
    <tbody className="body1">
      {_.map(ItemData, (item, i) => (
        <tr className="my-4" key={`item_${i}`}>
          <td className="py-4">{i + 1}</td>
          <td>{item.name}</td>
          <td>{item.weight}</td>
          <td>{toFormatString(item.price)}</td>
        </tr>
      ))}
    </tbody>
  </table>
)
