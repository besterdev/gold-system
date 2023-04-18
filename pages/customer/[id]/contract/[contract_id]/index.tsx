import React from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { toFormatString } from 'core/utils/format'

import { Button } from '@core/components/Buttons'
import { getContract } from 'core/service'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import Image from 'next/image'

const ContractPage = () => {
  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter()
  const customerId = router.query.contract_id as string

  //---------------------
  // QUERY DATA
  //---------------------
  const { data, isLoading, isFetched, error } = useQuery({
    queryKey: ['contract', [customerId]],
    queryFn: async () => getContract(customerId)
  })

  const calTotalPrices = (items: any) => {
    const totals: number[] = []
    _.forEach(items, (item) => {
      totals.push(item.price)
    })

    return _.sum(totals)
  }

  return (
    <div className="flex h-screen w-screen justify-center bg-grey-100">
      <div className="">
        <div className="mt-24 flex items-center justify-between print:hidden">
          <div className="flex space-x-4 text-grey-600">
            <i className="fa-solid fa-pen" />
            <i className="fa-solid fa-eye" />
            <i className="fa-solid fa-print cursor-pointer" onClick={() => window.print()} />
          </div>
          <Button color="primary" className="mt-6 h-12 print:hidden" onClick={() => null} size="large">
            <i className="fa-solid fa-file-circle-check mr-2" />
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
              <p className="heading5 mt-4 text-grey-800">{`INV-${data?.id}`}</p>
            </div>
          </div>
          <DetailLine label={'วันที่เริ่มสัญญา'} detail={dayjs(data?.startDate).format('DD MMM YYYY')} className="mt-10" />
          <DetailLine label={'ชื่อลูกค้า'} detail={`${data?.customer.firstName} ${data?.customer.lastName}`} className="mt-6" />
          <DetailLine label={'บัตรประจำตัวประชาชน'} detail={data?.customer.idCard} className="mt-6" />
          <DetailLine label={'เบอร์โทร'} detail={data?.customer.phone} className="mt-6" />
          <DetailLine label={'ที่อยู่'} detail={data?.customer.address} className="mt-6" />
          <DetailLine label={'ระยะเวลาฝาก'} detail={`${data?.period} เดือน`} className="mt-6" />
          <DetailLine
            label={'ครบกำหนด'}
            detail={dayjs(data?.startDate).add(data?.period, 'month').locale('th').add(543, 'year').format('DD MMM YYYY')}
            className="mt-6"
          />
          <ItemListTable items={data?.items} />
          <p className="heading6 mt-6 text-start text-grey-800">{toFormatString(calTotalPrices(data?.items))}บาท</p>

          <ul className="body2 mt-6 hidden list-disc text-grey-800 print:block">
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
          <div className="mt-6 hidden justify-between print:flex ">
            <p>ลงชื่อ....................................ผู้ขายฝาก</p>
            <p>ลงชื่อ....................................พยาน</p>
          </div>
          <div className="mt-4 hidden justify-between print:flex">
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

export const ItemListTable = ({ items }: any) => (
  <table className="w-full">
    <thead>
      <tr className="heading7 border-b border-grey-300">
        <th className="py-4 text-start">ภาพ</th>
        <th className="py-4 text-start">รายการ</th>
        <th className="py-4 text-start">น้ำหนัก</th>
        <th className="py-4 text-start">ราคา</th>
      </tr>
    </thead>
    <tbody className="body1">
      {_.map(items, (item, i) => (
        <tr className="my-6" key={`item_${i}`}>
          <td className="">
            <Image
              alt="Mountains"
              src={item?.image || 'https://api.lorem.space/image/fashion?w=150&h=150&r=1y'}
              width="0"
              height="0"
              className="h-10 w-10 rounded-full object-cover"
            />
          </td>
          <td>{item.name}</td>
          <td>{item.weight}</td>
          <td>{toFormatString(item.price)}</td>
        </tr>
      ))}
    </tbody>
  </table>
)
