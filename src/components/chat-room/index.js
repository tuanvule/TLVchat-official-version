import React from 'react'
import Chatwindow from './chatwindow'
import Sidebar from './sidebar'
import SettingForm from './settingForm'

export default function ChatApp() {

  return (
    <div className="h-screen flex ">
        <Sidebar/>
        <Chatwindow/>
        <SettingForm/>
    </div>
  )
}
