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
    <div className="flex flex-col h-full">
        <div className=" rounded-lg px-2 py-2 mb-3 flex items-center bg-[#F5F8FC] dark:bg-[#19182A] dark:text-white border-2 border-gray-700">
            <div style={{backgroundImage: `url(${photoURL})`}} className=" bg-cover bg-center w-10 h-10 rounded-full" />
            <h2 className=" text-lg font-bold ml-2 whitespace-nowrap text-ellipsis overflow-hidden">{displayName}</h2>
            <button onClick={handleLogout} className=" bg-[#004DFC] rounded-md px-2 py-1 ml-auto font-bold text-white hover:bg-sky-500">Logout</button>
        </div>
        {/* <div className=" block px-2 py-1 my-2 bg-cyan-500 rounded-lg text-base font-medium">
          <i class="fa-solid fa-angles-down mr-2"></i>
            Your goup chat
        </div> */}
        <ul className=" group-list">
            {rooms.map((room) => (
            <li key={room.id} onClick={() => setSelectedRoomId(room.id)} className={`flex py-2 px-2 mb-1 rounded-large overflow-hidden ${selectedRoomId === room.id ? 'bg-[#eef1f5] dark:bg-[#253649] dark:text-white' : null}`}>
                <div style={{backgroundImage: `url(${room.avata})`}} className="w-12 h-12 rounded-full mr-2 bg-cover bg-center" alt="" />
                <div className="">
                  <h2 className="font-medium">{room.name}</h2>
                  <p className="">{room.description}</p>
                </div>
            </li>
            ))}
        </ul>
        <div className="flex flex-col justify-between mt-1 mb-2 text-white">
          <button onClick={handleAddRoom} className=" bg-[#004DFC] text-white px-2 py-1 my-2 rounded hover:bg-gray-200">create room chat</button>
          <button onClick={handleJoinRoom} className="bg-[#1A233B] px-2 py-1 rounded hover:bg">join room chat</button>
        </div>
    </div>
  )
}

export default memo(RenderingRoomModal)