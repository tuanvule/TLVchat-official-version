import React, { memo, useContext } from 'react'
import { AppContext } from '../../context/appProvider';
import { AuthContext } from '../../context/authProvider';
import { auth } from '../../firebase/config';

function RenderingRoomModal() {
    const { photoURL, displayName, setUser, history} = useContext(AuthContext)

    const { rooms, setIsAddRoomVisible, setSelectedRoomId, setIsJoinRoomVisible, selectedRoomId } = useContext(AppContext);
  
    // const { setIsAddRoomVisible } = useContext(AppContext);
  
  
    const handleAddRoom = () => {
      setIsAddRoomVisible(true);
    };
  
    function handleLogout() {
      auth.signOut()
      localStorage.clear()
      setUser(null)
      history('/login')
    }
  
    function handleJoinRoom() {
      setIsJoinRoomVisible(true)
    }

    // console.log('rerender renderingRoomModal')

  return (
    <>
        <div className=" bg-[#202733] rounded px-2 py-1 mb-3 flex items-center text-[#62F0E5] border-2 border-[#4ec1b7]">
            <div style={{backgroundImage: `url(${photoURL})`}} className=" bg-cover bg-center w-10 h-10 rounded-full" />
            <h2 className=" text-lg font-bold ml-2">{displayName}</h2>
            <button onClick={handleLogout} className=" bg-[#0A0C10] rounded-md px-2 py-1 ml-auto font-bold text-[#62F0E5] hover:bg-sky-500">Logout</button>
        </div>
        {/* <div className=" block px-2 py-1 my-2 bg-cyan-500 rounded-lg text-base font-medium">
          <i class="fa-solid fa-angles-down mr-2"></i>
            Your goup chat
        </div> */}
        <ul className=" group-list">
            {rooms.map((room) => (
            <li key={room.id} onClick={() => setSelectedRoomId(room.id)} className={`flex py-2 px-2 mb-1 rounded-md overflow-hidden ${selectedRoomId === room.id ? 'bg-[#202733]' : null}`}>
                <div style={{backgroundImage: `url(${room.avata})`}} className="w-12 h-12 rounded-full mr-2 bg-cover bg-center" alt="" />
                <div className="">
                  <h2 className=" text-[#66FCF0] font-medium">{room.name}</h2>
                  <p className=" text-[#46A29E]">{room.description}</p>
                </div>
            </li>
            ))}
        </ul>
        <div className="flex flex-col justify-between mt-1 text-white">
          <button onClick={handleAddRoom} className=" bg-[#DFF6FF] text-black px-2 py-1 my-2 rounded hover:bg-gray-200">create room chat</button>
          <button onClick={handleJoinRoom} className="bg-[#06283D] px-2 py-1 rounded hover:bg">join room chat</button>
        </div>
    </>
  )
}

export default memo(RenderingRoomModal)