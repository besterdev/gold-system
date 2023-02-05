import { useEffect, useRef, useState } from 'react'
import _ from 'lodash'

interface TabsProps {
  tabs: {
    label: string
    onClick: Function
  }[]
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)

  const tabsRef: any = useRef([])

  useEffect(() => {
    function setTabPosition() {
      const currentTab: any = tabsRef.current[activeTabIndex]
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0)
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0)
    }

    setTabPosition()
    window.addEventListener('resize', setTabPosition)

    return () => window.removeEventListener('resize', setTabPosition)
  }, [activeTabIndex])

  const handleClick = (onClick: Function, i: number) => {
    setActiveTabIndex(i)
    onClick()
  }

  return (
    <div className="relative">
      <div className="flex space-x-6">
        {_.map(tabs, (tab, i) => {
          return (
            <button key={i} ref={(el) => (tabsRef.current[i] = el)} className="pt-2 pb-2 " onClick={() => handleClick(tab.onClick, i)}>
              {tab.label}
            </button>
          )
        })}
      </div>
      <span
        className="absolute block h-1 transition-all duration-300 bg-teal-500 -bottom-2"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      />
    </div>
  )
}
