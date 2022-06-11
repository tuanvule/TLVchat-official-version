import React, {  useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/appProvider'
import { AuthContext } from '../../context/authProvider'
import { db } from '../../firebase/config'
import { collection, query, where, getDocs } from "firebase/firestore";
// import addDocument from '../../firebase/services'

export default function CustomingModal() {
    const { backgrounds, setCustomBackground, setTextColor, colorData, selectedRoomId } = useContext(AppContext)
    const { uid } = useContext(AuthContext)
    const [isAddCustomVisible, setIsAddCustomVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const customData = backgrounds[0]?.background
    // console.log(customData)

    // const arr = new Array(10).fill('a')

    function handleCustomBackground(value, e) {
        if(selectedRoomId) {
            const roomRef = db.collection('rooms').doc(selectedRoomId)
            roomRef.update({
                background: value
            })
        }
    }

    function handleAddCustomBg(type) {
        if(inputValue.length > 5) {
            db.collection('customing-modal').where('uid', '==', `${uid}`).get()
            .then(querysnapshot => {
                querysnapshot.forEach(doc => {
                    doc.ref.update({
                        ...backgrounds[0],
                        background: {
                            ...customData,
                            [type]: [...customData[type], inputValue]
                        }
                    })
                })
            })
        }
        setInputValue('')
    }

    function handleChangeTextColor(color) {
        const roomRef = db.collection('rooms').doc(selectedRoomId)
        roomRef.get()
            .then(docData => {
                return docData.data()
            })
            .then((data) => {
                roomRef.update({
                    ...data,
                    color: color
                })
            })
        
    }

    async function handleRemove(index, type) {
        db.collection('customing-modal').where('uid', '==', `${uid}`).get()
        .then(querysnapshot => {
            querysnapshot.forEach(doc => {
                customData[type].splice(index, 1)
                doc.ref.update({
                    ...backgrounds[0],
                    background: {
                        ...customData,
                        [type]: customData[type]
                    }
                })
            })
        })
        console.log({
            [type]: [...customData[type], inputValue]
        })
    }                     
  return (
    <div className=" text-white">
        <h1 className=" text-center font-bold text-2xl border-b-2 border-b-cyan-500 py-2">Background</h1>
        <ul className="flex flex-col items-center">
            <li className="custom-color relative z-[10] text-xl font-medium cursor-pointer hover:underline hover:decoration-cyan-400 decoration-2 hover:text-sky-500">
                Color
                <ul className="custom-color__list hidden flex-wrap justify-center absolute w-56 py-1 right-1/2 translate-x-1/2 bg-red-400">
                    {colorData?.color.map((color, index) => <li onClick={() => handleCustomBackground({backgroundColor: color,} )} key={index} style={{backgroundColor: color}} className={` w-3 h-3 mx-1 my-1 hover:brightness-75`}></li>)}
                </ul>
            </li>
            <li className="custom-img relative z-[9] text-xl font-medium cursor-pointer hover:underline hover:decoration-cyan-400 decoration-2 hover:text-sky-500">
                Image
                <ul className="custom-img__list hidden absolute w-56 px-2 right-1/2 translate-x-1/2 bg-red-400 border-8 border-transparent py-1">
                    {customData?.image.map((image, index) => <li onClick={(e) => handleCustomBackground({backgroundImage: `url(${image})` }, e)} key={index} style={{backgroundImage: `url(${image})`}} className="customing-background relative bg-cover h-6 hover:h-16 w-full mb-2 ease-linear duration-200 will-change[height]">
                        <button onClick={() => handleRemove(index, 'image')} className=" hidden remove-btn absolute top-1/2 -right-6 transform -translate-y-1/2 bg-blue-500 text-white text-sm font-semibold px-1 py-[2px] mx-1 mb-2 hover:bg-blue-600">Remove</button>
                    </li>)}
                    <li className=" bg-cyan-400 p-2">
                        <button onClick={() => handleAddCustomBg('image')} className=" bg-blue-500 text-white font-semibold px-1 py-[2px] mx-1 mb-2">Add</button>
                        <input onChange={e => setInputValue(e.target.value)} type="text" className=" w-full" value={inputValue} />
                    </li>
                </ul>
            </li>
            <li className="custom-img relative text-xl font-medium cursor-pointer hover:underline hover:decoration-cyan-400 decoration-2 hover:text-sky-500">
                SpecialColor
                <ul className="custom-img__list hidden absolute w-56 py-2 px-2 right-1/2 translate-x-1/2 bg-red-400">
                    {customData?.specialColor.map((specialColor, index) => <li onClick={() => handleCustomBackground({backgroundImage: specialColor })} key={index} style={{backgroundImage: specialColor }} className="customing-background relative h-8 w-full mb-2 hover:border-2 hover:border-black">
                        <button onClick={() => handleRemove(index, 'specialColor')} className=" hidden remove-btn absolute top-1/2 -right-6 transform -translate-y-1/2 bg-blue-500 text-white text-xs font-semibold px-1 py-[2px] mx-1 mb-2 hover:bg-blue-600">Remove</button>
                    </li>)}
                    <li className=" bg-cyan-400 p-2">
                        <button onClick={() => handleAddCustomBg('specialColor')} className=" bg-blue-500 text-white font-semibold px-1 py-[2px] mx-1 mb-2">Add</button>
                        <input onChange={e => setInputValue(e.target.value)} type="text" className=" w-full" value={inputValue} />
                    </li>
                </ul>
            </li>
        </ul>

        <h1 className=" text-center font-bold text-2xl border-b-2 border-b-cyan-500 py-2 mt-12 mb-3">Text color</h1>
        <ul className="flex items-center justify-center bg-[#22D3EE] h-14">
            <li onClick={() => handleChangeTextColor('white')} className=" bg-white w-1/2 h-8 mx-2"></li>
            <li onClick={() => handleChangeTextColor('black')} className=" bg-black w-1/2 h-8 mx-2"></li>
        </ul>
    </div>
  )
}