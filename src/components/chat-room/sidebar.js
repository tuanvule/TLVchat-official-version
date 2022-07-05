import { useRef, useEffect, useContext, useState } from 'react'
import { AppContext } from '../../context/appProvider'
import { AuthContext } from '../../context/authProvider'
import { auth } from '../../firebase/config'
import useFirestore from '../../hooks/useFirestore'
import RenderingRoomModal from '../modals/renderingRoomModal'

export default function Sidebar() {
  const [isOpenRoomMenu, setIsOpenRoomMenu] = useState(false)
  console.log('rerender sidebar')
  return (
    <div className="z-10 bg-white">
    <div className="lg:block  hidden h-full w-72 px-6 py-2 ">
      <RenderingRoomModal/>
    </div>

    {isOpenRoomMenu ? <div onClick={() => setIsOpenRoomMenu(!isOpenRoomMenu)} className="lg:hidden fixed z-10 top-0 left-0 bottom-0 right-0 bg-white bg-opacity-10"></div> : null }
    <input defaultChecked={false}  checked={isOpenRoomMenu} type="checkbox" id="chat-menu-checkbox" hidden/>
    <div className={`lg:hidden ${isOpenRoomMenu ? 'z-20' : null} bg-white fixed h-full w-72 transform -translate-x-[17.8rem] px-2 py-2 border-r-2 border-black chat-menu`}>
      <RenderingRoomModal/>
        {/* <i class="fa-solid fa-comment-dots"></i> */}
      <div onClick={() => setIsOpenRoomMenu(!isOpenRoomMenu)} htmlFor="chat-menu-checkbox" className=" absolute -right-4 top-1/2 transform -translate-y-1/2 px-2 py-1 border-2 border-black rounded-full bg-[#2563EB]">
        {isOpenRoomMenu ? <i class="fa-solid fa-angles-left"></i> : <i class="fa-solid fa-angles-right"></i> }
      </div>
    </div>
    </div>
  )
}
