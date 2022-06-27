import React, { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { AppContext } from '../../context/appProvider'
import { AuthContext } from '../../context/authProvider'
import { db } from '../../firebase/config'

export default function NormalLoginModal() {
    const {setUser, history, setLoginType,} = useContext(AuthContext)
    const { setSigninVisivle, signinVisivle, setIsLoginVisible, isLoginVisible } = useContext(AppContext)

    const [userDatas, setUserDatas] = useState()
    const [isErrorVisible, setIsErrorVisible] = useState('hidden')

    const inputNameRef = useRef()
    const inputPasswordRef = useRef()
    const errorRef = useRef()

    function handleSignupVisible() {
        setSigninVisivle(true)
        setIsLoginVisible(false)
    }

    useMemo(async() => {
        const snapshot = await db.collection('users').get()
        setUserDatas(snapshot.docs.map(doc => doc.data()))
    }, [])

    function handleLogin() {
        userDatas.map((userData) => {
            if(userData.displayName === inputNameRef.current.value && userData.password === inputPasswordRef.current.value
            ) {
                const { displayName, uid, photoURL } = userData

                setIsErrorVisible('hidden')

                setUser({
                    displayName, uid, photoURL
                })

                setLoginType('normal')
            } else {
                // console.log('b')
                setIsErrorVisible('')
            }
            // console.log(userData.displayName, inputNameRef.current.value, userData.password)
        })
    }

    function inputChange() {
        if(!errorRef.current.classList.contains('hidden')) {
            setIsErrorVisible('hidden')
        }
    }

  return (
    <div className=" h-full w-screen fixed flex items-center justify-center">
        <div className=" relative w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500">
            <i onClick={() => setIsLoginVisible(false)} class="fa-solid fa-left-long absolute top-8 left-4 text-3xl text-white hover:text-gray-200 cursor-pointer"></i>
            <h1 className=" text-2xl font-semibold text-center mt-8">Login</h1>
            <div className="mx-4 mb-6">
                <h1 className=" text-base font-semibold mb-1">Name</h1>
                <div className=" flex items-center">
                    <i class="fa-solid fa-user mb-2 text-gray-300"></i>
                    <input onChange={inputChange} ref={inputNameRef} className=" text-gray-300 w-full ml-2 mb-2 px-1 py-1 rounded-sm outline-none border-b-2 bg-transparent placeholder:text-gray-300" type="text" placeholder="Enter your name" />
                </div>
            </div>
            <div className="mx-4">
                <h1 className=" text-base font-semibold mb-1">Password</h1>
                <div className=" flex items-center">
                    <i class="fa-solid fa-lock mb-2 text-gray-300"></i>
                    <input onChange={inputChange} ref={inputPasswordRef} className=" text-gray-300 w-full ml-2 mb-2 px-1 py-1 rounded-sm outline-none border-b-2 bg-transparent placeholder:text-gray-300" type="text" placeholder="Enter your password" />
                </div>
            </div>

            <h1 ref={errorRef} className={`${isErrorVisible} text-base text-center text-red-600`}>wrong name or password</h1>

            <button onClick={handleLogin} className=" flex mx-auto py-1 px-28 my-6 text-xl font-medium bg-white rounded-full">login</button>
            <h1 className=" text-center">Don't have account? <span onClick={handleSignupVisible} className=" text-white underline decoration-2 underline-offset-4 hover:text-gray-300 cursor-pointer">signup here</span></h1>
        </div>
    </div>
  )
}
