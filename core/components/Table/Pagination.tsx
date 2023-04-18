import _ from 'lodash'

import { rowOfPage } from '@core/utils/format'

//---------------------
// TYPE
//---------------------
interface PaginationProps {
  page: number
  dataSize: number
  totalCount: number
  handlePrev: () => void
  handleNext: () => void
}

const Pagination = ({ page, dataSize, totalCount, handlePrev, handleNext }: PaginationProps) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <div className="flex items-center justify-between border-t px-6 py-4">
      <p className="body2 text-grey-600">{rowOfPage(page, dataSize, totalCount)}</p>
      <div className="flex space-x-4">
        <div
          className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full p-2 text-grey-800 hover:bg-grey-200"
          onClick={handlePrev}>
          <i className="fa-solid fa-chevron-left text-xs" />
        </div>
        <div
          className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full p-2 text-grey-800 hover:bg-grey-200"
          onClick={handleNext}>
          <i className="fa-solid fa-chevron-right text-xs" />
        </div>
      </div>
    </div>
  )
}

export default Pagination
