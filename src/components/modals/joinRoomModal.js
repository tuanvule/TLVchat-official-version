import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/appProvider'
import { AuthContext } from '../../context/authProvider'
import { db } from '../../firebase/config'

export default function JoinRoomModal() {
    const [value, setValue] = useState('')
    const { setIsJoinRoomVisible, isRoomUpdate, setIsRoomUpdate } = useContext(AppContext)
    const [ docData, setDocData ] = useState()
    const { uid } = useContext(AuthContext)

    function handleNameChange(e) {
        setValue(e.target.value)
    }

    function handleCancel() {
        setValue('')
        setIsJoinRoomVisible(false)
    }

    function handleOk(e) {
        e.preventDefault();
        try {
            setValue([]);

            // update members in current room
            const roomRef = db.collection('rooms').doc(value);
            roomRef.get()
                .then(doc => {
                    return doc.data()
                })
                .then(docData => {
                    roomRef.update({
                          members: [...docData.members, `${uid}`],
                    });
                })
            // console.log(roomData)
            // roomRef.update({
            //   members: [...roomRef.members, uid],
            // });
            setIsRoomUpdate(!isRoomUpdate)
            setIsJoinRoomVisible(false)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <form className=" z-30 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-30">
        <div className="bg-cyan-400 w-96 h-2/3 px-8">
        <h1 className="mt-4 text-2xl font-semibold">Join room</h1>
        <div className="w-full h-1 mb-6 bg-gradient-to-r from-red-400 to-cyan-500"/>

        <h1 className=" text-base font-bold">Name</h1>
        <input value={value.name} onChange={handleNameChange} type="text" className=" mb-4 mt-2 w-full px-2 py-2 rounded-lg" name="name" />

        <div className=" mt-auto">
            <button onClick={handleCancel} className=" text-base font-light bg-white border border-black px-2 py-1 rounded">cancle</button>
            <button onClick={handleOk} className=" text-lg font-medium bg-[#4BECC6] px-2 py-1 rounded">save</button>
        </div>
        </div>
    </form>
  )
}
