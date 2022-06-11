import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/appProvider'
import CustomingModal from '../modals/customingModal'

export default function SettingForm() {
  const [isOpenCustomMenu, setIsOpenCustomMenu] = useState(false)
  const { selectedRoom, selectedRoomId } = useContext(AppContext)

  return (
    selectedRoom ? (
      <>
      <div className=" lg:block hidden w-72 bg-[#2563EB]">
        <div className=" flex flex-col items-center my-3 text-white">
            <img className=" w-20 h-20 rounded-full" src={selectedRoom.avata} alt="" />
            <h1 className=" text-3xl font-semibold my-2">{selectedRoom.name}</h1>
            <h1 className=" text-base font-medium text-gray-200">{selectedRoom.description}</h1>
        </div>
        <div className=" bg-sky-500 mx-2 mt-2 px-2 py-1 rounded-lg text-center font-bold text-lg text-white tracking-widest">
          <i class="fa-solid fa-angles-down mr-2"></i>
          <span className="mr-2">CUSTOMING</span>
          <i class="fa-solid fa-angles-down mr-2"></i>
        </div>
        <div className="mt-4 mx-2">
          <CustomingModal/>
        </div>
        <div className=" text-white mt-10 mx-2 py-2 text-base font-semibold text-center rounded-full border-4 border-[#22D3EE] ">Room ID: {selectedRoomId}</div>
      </div>

      <input checked={isOpenCustomMenu} type="checkbox" id="custom-menu-checkbox" hidden/>
      { isOpenCustomMenu ? <div onClick={() => setIsOpenCustomMenu(!isOpenCustomMenu)} className="b lg:hidden fixed z-10 top-0 left-0 bottom-0 right-0 bg-white bg-opacity-10"></div> : null }
      <div className={`lg:hidden ${isOpenCustomMenu ? 'z-20' : null} fixed right-0 bg-white h-full w-72 border-l-2 transform translate-x-[17.8rem] border-black custom-menu bg-[#2563EB]`}>
        <div className=" flex flex-col items-center my-3 text-white">
            <img className=" w-20 h-20 rounded-full" src={selectedRoom.avata} alt="" />
            <h1 className=" text-3xl font-semibold my-2">{selectedRoom.name}</h1>
            <h1 className=" text-base font-medium text-gray-200">{selectedRoom.description}</h1>
        </div>
        <div className=" bg-sky-500 mx-2 mt-2 px-2 py-1 rounded-lg text-center font-bold text-lg text-white tracking-widest">
          <i class="fa-solid fa-angles-down mr-2"></i>
          <span className="mr-2">CUSTOMING</span>
          <i class="fa-solid fa-angles-down mr-2"></i>
        </div>
        <div className="mt-4 mx-2">
          <CustomingModal/>
        </div>
        <div onClick={() => setIsOpenCustomMenu(!isOpenCustomMenu)} htmlFor="custom-menu-checkbox" className=" absolute -left-4 bottom-1/2 transform translate-y-1/2 px-2 py-1 border-2 border-black rounded-full bg-[#2563EB]">
          {isOpenCustomMenu ? <i class="fa-solid fa-angles-right"></i> : <i class="fa-solid fa-angles-left"></i>}
        </div>
      <div className=" text-white mt-10 mx-2 py-2 text-base font-semibold text-center rounded-full border-4 border-[#22D3EE] ">Room ID: {selectedRoomId}</div>
      </div>
    </>
    ) : (
      <>
        <div className="lg:block hidden w-72 bg-[#2563EB] text-2xl text-white font-semibold">
          Choose a room to see info
        </div>
        <input checked={isOpenCustomMenu} type="checkbox" id="custom-menu-checkbox" hidden/>
        { isOpenCustomMenu ? <div onClick={() => setIsOpenCustomMenu(!isOpenCustomMenu)} className="b lg:hidden fixed z-10 top-0 left-0 bottom-0 right-0 bg-white bg-opacity-10"></div> : null }
        <div className={`lg:hidden ${isOpenCustomMenu ? 'z-20' : null} fixed right-0 bg-white h-full w-72 border-l-2 transform translate-x-[17.8rem] border-black custom-menu bg-[#2563EB] `}>
          <p className="text-2xl text-white font-semibold">Choose a room to see info</p>
          <div onClick={() => setIsOpenCustomMenu(!isOpenCustomMenu)} htmlFor="custom-menu-checkbox" className=" absolute -left-4 bottom-1/2 transform translate-y-1/2 px-2 py-1 border-2 border-black rounded-full bg-[#2563EB]">
            {isOpenCustomMenu ? <i class="fa-solid fa-angles-right"></i> : <i class="fa-solid fa-angles-left"></i>}
          </div>
        </div>
      </>
    )
  )
}
