import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AppContext } from '../../context/appProvider'
import { useNavigate } from 'react-router-dom'
import addDocument from '../../firebase/services'
import useFirestore from '../../hooks/useFirestore'
import firebase, { db } from '../../firebase/config'
import { AuthContext } from '../../context/authProvider'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loading from './loading'


export default function SigninModal() {
    const {setUser, history, setLoginType} = useContext(AuthContext)
    const { setSigninVisivle, setIsLoginVisible } = useContext(AppContext)
    const reader = new FileReader();

    const [errorLineVisible, setErrorLineVisible] = useState({
        name: 'hidden',
        password: 'hidden',
        confirmPassword: 'hidden',
    })
    const [isError, setIsError] = useState(true)
    const [userNames, setUserNames] = useState()
    const [isDataChange, setIsDataChange] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputNameRef = useRef()
    const inputPasswordRef = useRef()
    const inputConfirmPasswordRef = useRef()
    const inputAvataRef = useRef()
    const fileUpload = useRef()

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    function require(value, min = 8) {
        const errorLine = getParent(value.current, '.form-group').children[2]
        if(value.current.value.length >= min) {
            setErrorLineVisible((prev) => ({
                ...prev,
                [value.current.name]: 'hidden',
            }))
            
            setIsError(false)

            handleDubbing(inputNameRef)
            
            return value.current.value
        } else {
            setErrorLineVisible((prev) => ({
                ...prev,
                [value.current.name]: '',
            }))
            if(value.current.value.length < min && value.current.value.length > 0) {
                errorLine.innerHTML = `this field need more than ${min} word`
            } else if(value.current.value.length === 0) {
                errorLine.innerHTML = `you need to fill this field`
            }
            setIsError(true)
        }
        handleDubbing(inputNameRef)
    }

    function confirmPasswordRequire(value) {
        const errorLine = getParent(value.current, '.form-group').children[2]
        const errorNameLine = getParent(inputNameRef.current, '.form-group').children[2]
        if(value.current.value !== inputPasswordRef.current.value) {
            setErrorLineVisible((prev) => ({
                ...prev,
                confirmPassword: '',
            }))
            setIsError(true)
            errorLine.innerHTML = 'passwords must be same'
        } else {
            setErrorLineVisible((prev) => ({
                ...prev,
                confirmPassword: 'hidden',
            }))

            if(errorNameLine.classList.contains('hidden')) {
                setIsError(false)
            }
        }
    }

    function handleSignup(e) {
        e.preventDefault() 

        const requiredName = require(inputNameRef)
        const requiredPassword = require(inputPasswordRef)
        confirmPasswordRequire(inputConfirmPasswordRef)

        if(!isError && inputAvataRef.current.value) {

            const { displayName, uid, photoURL } = addDocument('users', {
                displayName: requiredName,
                password: requiredPassword,
                photoURL: inputAvataRef.current.value,
                uid: Date.now(),
            })

            addDocument('customing-modal', {
                background: {
                  image: ['https://img.topthuthuat.net/wp-content/uploads/2019/11/30214859/31.jpg'],
                  specialColor: ['linear-gradient(90deg, rgba(243, 72, 104,1) 20.181414714494878%,rgba(242, 71, 104,1) 20.181414714494878%,rgba(158, 0, 236,1) 80.18324487554904%)']
                },
                uid: `${uid}`,
            })

            setUser({
                displayName, uid, photoURL
            })

            setLoginType('normal')
        }
    }

    function uploadImage() {

        if(fileUpload.current.files[0]) {
          const storage = getStorage();
    
          /** @type {any} */
          const metadata = {
            contentType: fileUpload.current.files[0].type
          };
          
          const storageRef = ref(storage, 'images/' + fileUpload.current.files[0].name);
          const uploadTask = uploadBytesResumable(storageRef, fileUpload.current.files[0], metadata);
          
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
                default:
                  return
              }
            }, 
            (error) => {
              console.log(error)
            }, 
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                if(downloadURL) {
                  setIsLoading(false)
                  inputAvataRef.current.value = downloadURL
                } else {
                  setIsLoading(false)
                }
              });
            }
          );
      
        }
      }
    
    
      useEffect(() => {
        if(fileUpload.current) {
          fileUpload.current.addEventListener("change", (event) => {
            uploadImage()
            setIsLoading(true)
          })
        }
      }, [])

    useMemo(async () => {
        const snapshot = await db.collection('users').get()
        setUserNames(snapshot.docs.map(doc => doc.data()))
    }, [])

    function handleDubbing(value) {
        if(value.current.name === 'name') {
            const errorLine = getParent(value.current, '.form-group').children[2]
            userNames && userNames.map((userName) => {
                if(userName.displayName === value.current.value) {
                    setErrorLineVisible((prev) => ({
                        ...prev,
                        [value.current.name]: '',
                    }))
                    errorLine.innerHTML = 'this name has been use!'
                    setIsError(true)
                }
            })
        }
    }

    const handleChangeInput = (e) => {
        setErrorLineVisible((prev) => ({
            ...prev,
            [e.target.name]: 'hidden',
        }))
        if(e.target.name === 'confirmPassword') {
            confirmPasswordRequire(inputConfirmPasswordRef)
        }
        if(e.target.name === 'name') {
            handleDubbing(inputNameRef)
        }
    }

  return (
      <div className="h-screen w-screen fixed flex items-center justify-center">
        {isLoading ? <Loading type="spin" color='#1F2937' height="8%" width="8%" /> : null}
        <div className="relative w-96 h-fit py-4 bg-gradient-to-r from-cyan-500 to-blue-500">
            <i onClick={() => setSigninVisivle(false)} class="fa-solid fa-left-long absolute top-7 left-4 text-3xl text-white hover:text-gray-200 cursor-pointer"></i>
            <h1 className=" text-2xl font-semibold text-center mt-2">Signup</h1>
            <div className="mx-4 form-group">
                <h1 className=" text-base font-semibold mt-2">Name</h1>
                <div className=" flex items-center">
                    <i class=" fa-solid fa-user text-gray-300"></i>
                    <input name="name" onChange={(e) => handleChangeInput(e)} ref={inputNameRef} className=" text-gray-300 w-full ml-2 px-1 py-1 rounded-sm outline-none border-b-2 bg-transparent placeholder:text-gray-300" type="text" placeholder="Enter your name" />
                </div>
                <p className={` ${errorLineVisible.name} mb-1 text-red-600`}></p>
            </div>
            <div className="mx-4 form-group">
                <h1 className=" text-base font-semibold mt-2">Password</h1>
                <div className=" flex items-center">
                    <i class="fa-solid fa-lock text-gray-300"></i>
                    <input name="password" onChange={(e) => handleChangeInput(e)} ref={inputPasswordRef}  className=" text-gray-300 w-full ml-2 px-1 py-1 rounded-sm outline-none border-b-2 bg-transparent placeholder:text-gray-300" type="password" placeholder="Enter your password" />
                </div>
                <p className={` ${errorLineVisible.password} mb-1 text-red-600`}></p>
            </div>
            <div className="mx-4 form-group">
                <h1 className=" text-base font-semibold mt-2">Confirm password</h1>
                <div className=" flex items-center">
                    <i class="fa-solid fa-lock text-gray-300"></i>
                    <input name="confirmPassword" onChange={(e) => handleChangeInput(e)} ref={inputConfirmPasswordRef} className=" text-gray-300 w-full ml-2 px-1 py-1 rounded-sm outline-none border-b-2 bg-transparent placeholder:text-gray-300" type="password" placeholder="Enter your password" />
                </div>
                <p className={` ${errorLineVisible.confirmPassword} mb-1 text-red-600`}></p>
            </div>
            <div className="mx-4 form-group">
                <h1 className=" text-base font-semibold mt-2">Avata</h1>
                <div className=" flex items-center">
                    <i class="fa-solid fa-image text-gray-300"></i>
                    <input ref={inputAvataRef} className=" text-gray-300 w-full ml-2 px-1 py-1 rounded-sm outline-none border-b-2 bg-transparent placeholder:text-gray-300" type="text" placeholder="Enter your Avata url" />
                </div>
                <input ref={fileUpload} className="
                block w-full text-sm text-slate-500 mt-2 ml-5
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-2
                file:text-sm file:font-bold
                file:border-[#2563EB]
                file:bg-violet-50 file:text-[#2563EB]
                hover:file:bg-violet-100
                " type="file" />
            </div>
            <button onClick={(e) => handleSignup(e)} className=" flex mx-auto py-1 px-28 my-3 text-xl font-medium bg-white rounded-full">Signup</button>
            <h1 onClick={() => {setIsLoginVisible(true); setSigninVisivle(false)}} className=" text-center">Already have an account? <span className=" text-white underline decoration-2 underline-offset-4 hover:text-gray-300 cursor-pointer">Login here</span></h1>
        </div>
    </div>
  )
}
