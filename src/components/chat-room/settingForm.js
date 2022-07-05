import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../../context/appProvider'
import CustomingModal from '../modals/customingModal'

export default function SettingForm() {
  const [isOpenCustomMenu, setIsOpenCustomMenu] = useState(false)
  const { selectedRoom, selectedRoomId, messagesLength } = useContext(AppContext)

  function handleCopyToClipBoard(value) {
  
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(value);
    
    /* Alert the copied text */
    alert("Copied the text: " + value);
  }

  return (
    selectedRoom ? (
      <>
      <div className=" lg:flex flex-col hidden w-72 mx-8">
        <div className=" flex flex-col items-center my-2 mx-2 py-3 border rounded-large bg-[#F5F7FB]">
            <img className=" w-20 h-20 rounded-full" src={selectedRoom.avata} alt="" />
            <h1 className=" text-xl font-bold my-2">{selectedRoom.name}</h1>
            <h1 className=" text-base font-semibold">{selectedRoom.description}</h1>
        </div>
        <div className="bg-[#F9FAFD] mx-2 mt-4 px-2 py-3 rounded-large border flex flex-wrap justify-around">
          <div className="bg-[#D9E4FC] py-2 pr-2 rounded-large flex items-center">
            <i class="fa-solid fa-user-group text-[#004DFC] text-2xl mx-2"></i>
            <div>
              <h1 className=" text-lg leading-4 text-[#004DFC] font-bold">{selectedRoom.members.length}</h1>
              <p className=" text-xs">Members</p>
            </div>
          </div>
          <div className="bg-[#E2F6F3] py-2 pr-2 rounded-large flex items-center">
            <i class="fa-brands fa-facebook-messenger text-[#0ABDA0] text-2xl mx-2"></i>
            <div>
              <p className="text-[#0ABDA0] text-lg leading-4">{messagesLength}</p>
              <p className=" text-xs">Messages</p>
            </div>
          </div>

          <div className="bg-[#FFF1E9] py-2 pr-2 mt-2 rounded-large flex flex-col items-center">
            <i class="fa-solid fa-clock text-[#FF552C] text-2xl mx-2"></i>
            <div className=" px-2">
              <p className="text-[#FF562D] text-sm mt-1 leading-4">{selectedRoom.TimeAdd}</p>
            </div>
          </div>

          <p className=" w-full text-xl mt-2 text-center">Creator</p>

          <div className=" bg-[#F5F7FB] flex items-center justify-center mt-2">
            <div style={{backgroundImage: `url(${!selectedRoom.creator ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2-lk-RYREmhV89n8yLwXTuOW2wkBMi_RLTg&usqp=CAU' : selectedRoom.creator.photoURL})`}} className=" w-12 h-12 rounded-full bg-cover bg-center"></div>
            <h1 className=" text-xl font-medium ml-2">{selectedRoom.creator ? selectedRoom.creator.displayName : 'unknow'}</h1>
          </div>
        </div>

        <div className="bg-[#F5F7FB] mx-2 rounded-large mt-6 py-3 relative flex flex-col items-center">
          <img src="/paper-plane-removebg.png" alt="a" className=" bg-transparent absolute -top-8 w-20 h-16" />
          <p className=" mt-3 text-xl font-semibold">Room ID</p>
          <p className=" mt-2 text-sm w-3/4 text-center">share this to everyone to chat together</p>
          <div className=" bg-[#004DFC] text-white text-ml px-4 py-1 mt-3 rounded-lg" onClick={() => handleCopyToClipBoard(selectedRoomId)}>Click To copy</div>
        </div>
        
      </div>

      <input checked={isOpenCustomMenu} type="checkbox" id="custom-menu-checkbox" hidden/>
      { isOpenCustomMenu ? <div onClick={() => setIsOpenCustomMenu(!isOpenCustomMenu)} className="b lg:hidden fixed z-10 top-0 left-0 bottom-0 right-0 bg-white bg-opacity-10"></div> : null }
      <div className={`lg:hidden ${isOpenCustomMenu ? 'z-20' : null} fixed right-0 h-full w-72 border-l-2 transform translate-x-[17.8rem] border-black custom-menu bg-white`}>
      <div className=" flex flex-col items-center my-2 mx-2 py-3 border rounded-large bg-[#F5F7FB]">
            <img className=" w-20 h-20 rounded-full" src={selectedRoom.avata} alt="" />
            <h1 className=" text-xl font-bold my-2">{selectedRoom.name}</h1>
            <h1 className=" text-base font-semibold">{selectedRoom.description}</h1>
        </div>
        <div className="bg-[#F9FAFD] mx-2 mt-4 px-2 py-3 rounded-large border flex flex-wrap justify-around">
          <div className="bg-[#D9E4FC] py-2 pr-2 rounded-large flex items-center">
            <i class="fa-solid fa-user-group text-[#004DFC] text-2xl mx-2"></i>
            <div>
              <h1 className=" text-lg leading-4 text-[#004DFC] font-bold">{selectedRoom.members.length}</h1>
              <p className=" text-xs">Members</p>
            </div>
          </div>
          <div className="bg-[#E2F6F3] py-2 pr-2 rounded-large flex items-center">
            <i class="fa-brands fa-facebook-messenger text-[#0ABDA0] text-2xl mx-2"></i>
            <div>
              <p className="text-[#0ABDA0] text-lg leading-4">{messagesLength}</p>
              <p className=" text-xs">Messages</p>
            </div>
          </div>

          <div className="bg-[#FFF1E9] py-2 pr-2 mt-2 rounded-large flex flex-col items-center">
            <i class="fa-solid fa-clock text-[#FF552C] text-2xl mx-2"></i>
            <div className=" px-2">
              <p className="text-[#FF562D] text-sm mt-1 leading-4">{selectedRoom.TimeAdd}</p>
            </div>
          </div>

          <p className=" w-full text-xl mt-2 text-center">Creator</p>

          <div className=" bg-[#F5F7FB] flex items-center justify-center mt-2">
            <div style={{backgroundImage: `url(${!selectedRoom.creator ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2-lk-RYREmhV89n8yLwXTuOW2wkBMi_RLTg&usqp=CAU' : selectedRoom.creator.photoURL})`}} className=" w-12 h-12 rounded-full bg-cover bg-center"></div>
            <h1 className=" text-xl font-medium ml-2">{selectedRoom.creator ? selectedRoom.creator.displayName : 'unknow'}</h1>
          </div>
        </div>

        <div className="bg-[#F5F7FB] mx-2 rounded-large mt-6 py-3 relative flex flex-col items-center">
          <img src="/paper-plane-removebg.png" alt="a" className=" bg-transparent absolute -top-8 w-20 h-16" />
          <p className=" mt-3 text-xl font-semibold">Room ID</p>
          <p className=" mt-2 text-sm w-3/4 text-center">share this to everyone to chat together</p>
          <div className=" bg-[#004DFC] text-white text-ml px-4 py-1 mt-3 rounded-lg" onClick={() => handleCopyToClipBoard(selectedRoomId)}>Click To copy</div>
        </div>
        <div onClick={() => setIsOpenCustomMenu(!isOpenCustomMenu)} htmlFor="custom-menu-checkbox" className=" absolute -left-4 bottom-1/2 transform translate-y-1/2 px-2 py-1 border-2 border-black rounded-full bg-[#2563EB]">
          {isOpenCustomMenu ? <i class="fa-solid fa-angles-right"></i> : <i class="fa-solid fa-angles-left"></i>}
        </div>
        <div>
        {/* <div className=" mx-2 py-2 text-base font-semibold text-center rounded-full border-4 border-[#22D3EE] ">Room ID: {selectedRoomId}</div> */}
        </div>
      </div>
    </>
    ) : (
      <>
        <div className="lg:flex hidden items-center flex-wrap w-72 mx-2 bg-white text-4xl text-center text-black font-semibold">
          {/* <img className="h-full" src='/choose-room.jpg' alt="" /> */}
          <p className="bg-[#F9FAFD] py-3 rounded-large border font-semibold">Choose a room to see info</p>
          
        </div>
        <input checked={isOpenCustomMenu} type="checkbox" id="custom-menu-checkbox" hidden/>
        { isOpenCustomMenu ? <div onClick={() => setIsOpenCustomMenu(!isOpenCustomMenu)} className="b lg:hidden fixed z-10 top-0 left-0 bottom-0 right-0 bg-white bg-opacity-10"></div> : null }
        <div className={`lg:hidden ${isOpenCustomMenu ? 'z-20' : null} fixed px-2 right-0 h-full w-72 border-l-2 transform translate-x-[17.8rem] border-black custom-menu bg-white `}>
          <p className=" absolute w-5/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F9FAFD] py-3 rounded-large border text-center text-2xl font-semibold">Choose a room to see info</p>
          <div onClick={() => setIsOpenCustomMenu(!isOpenCustomMenu)} htmlFor="custom-menu-checkbox" className=" absolute -left-4 bottom-1/2 transform translate-y-1/2 px-2 py-1 border-2 border-black rounded-full bg-[#2563EB]">
            {isOpenCustomMenu ? <i class="fa-solid fa-angles-right"></i> : <i class="fa-solid fa-angles-left"></i>}
          </div>
        </div>
      </>
    )
  )
}
