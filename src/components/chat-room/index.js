import React, { useContext } from 'react'
import Chatwindow from './chatwindow'
import Sidebar from './sidebar'
import SettingForm from './settingForm'
import { AppContext } from '../../context/appProvider'

export default function ChatApp() {

  const {theme} = useContext(AppContext)

  return (
    <div className={`${theme}`}>
      <div className="h-screen flex dark:bg-[#161C2D] dark:text-white">
        <Sidebar/>
        <Chatwindow/>
        <SettingForm/>
      </div>
    </div>
  )
}
