import React, { memo, useContext } from 'react'
import { AppContext } from '../../context/appProvider';
import { AuthContext } from '../../context/authProvider';
import { auth } from '../../firebase/config';

function RenderingRoomModal() {
    const { photoURL, displayName, setUser, history} = useContext(AuthContext)

    const { rooms, setIsAddRoomVisible, setSelectedRoomId, setIsJoinRoomVisible } = useContext(AppContext);
  
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
        <div className=" bg-white rounded px-2 py-1 flex items-center text-black">
            <img className="w-10 h-10 rounded-full" src={photoURL} alt="" />
            <h2 className=" text-lg font-bold ml-2">{displayName}</h2>
            <button onClick={handleLogout} className=" bg-sky-400 rounded-md px-2 py-1 ml-auto font-bold text-white hover:bg-sky-500">Logout</button>
        </div>
        <div className=" block px-2 py-1 my-2 bg-cyan-400 rounded-lg text-base font-medium">
          <i class="fa-solid fa-angles-down mr-2"></i>
            Your goup chat
        </div>
        <ul className="bg-blue-700 px-2 group-list">
            {rooms.map((room) => (
            <li key={room.id} onClick={() => setSelectedRoomId(room.id)} className="flex py-2 border-b overflow-hidden">
                <img className="w-12 h-12 rounded-full mr-2" src={room.avata} alt="" />
                <div className="">
                  <h2 className=" font-medium">{room.name}</h2>
                  <p>{room.description}</p>
                </div>
            </li>
            ))}
        </ul>
        <div className="flex flex-col justify-between mt-1 text-white">
          <button onClick={handleAddRoom} className=" bg-red-500 px-2 py-1 my-2 rounded hover:bg-red-600">create room chat</button>
          <button onClick={handleJoinRoom} className="bg-black px-2 py-1 rounded hover:bg">join room chat</button>
        </div>
    </>
  )
}

export default memo(RenderingRoomModal)