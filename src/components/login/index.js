import React, { Children, useContext, useEffect } from 'react'
import { AppContext } from '../../context/appProvider'
import { AuthContext } from '../../context/authProvider'
import firebase, { auth, db } from '../../firebase/config'
import addDocument from '../../firebase/services'
import NormalLoginModal from '../modals/normalLoginModal'
import SigninModal from '../modals/signinModal'

const fbProvider = new firebase.auth.FacebookAuthProvider()

export default function Login() {
  const { setLoginType, history, uid, setUser } = useContext(AuthContext)

  const {signinVisivle, 
    setSigninVisivle,
    isLoginVisible, 
    setIsLoginVisible
  } = useContext(AppContext)

  async function handelLogin(type) {
    switch (type) {
      case 'facebook':
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider)

        if(additionalUserInfo?.isNewUser) {

          addDocument('users', {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
          })

          console.log('add')

          addDocument('customing-modal', {
            background: {
              image: ['https://img.topthuthuat.net/wp-content/uploads/2019/11/30214859/31.jpg'],
              specialColor: ['linear-gradient(90deg, rgba(243, 72, 104,1) 20.181414714494878%,rgba(242, 71, 104,1) 20.181414714494878%,rgba(158, 0, 236,1) 80.18324487554904%)']
            },
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
          })
        }


        setLoginType('facebook')
        break;
    
      case 'login':
        setIsLoginVisible(true)
        break;
      
      case 'signin':
        setSigninVisivle(true)
        break;
      
      default:
        return
    }

  }
  
  // useEffect(() => {
  //   if(pageAccessedByReload) {
  //     console.log('save data')
  //     const data = JSON.parse(localStorage.getItem('user')) 
  //     setUser(data)
  //     setLoginType('facebook')
  //     console.log(data)
  //   }
  // }, [uid]) 


  return (
    <div className="h-screen bg-gray-800 flex">

      {signinVisivle ? <SigninModal/> : null}
      {isLoginVisible ? <NormalLoginModal/> : null}
  
      <div className="w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl shadow-cyan-500 flex flex-col items-center justify-center m-auto">
        <h1 className="text-white text-3xl font-medium mb-20">Login form</h1>
        {/* <button onClick={() => handelLogin('facebook')} className=" w-52 bg-blue-700 hover:bg-blue-800 px-3 py-1 border-2 border-gray-900 rounded-full text-yellow-50 font-medium mt-4">
          Login with facebook
          <i class="fa-brands fa-facebook ml-2"></i>
        </button> */}
        <button onClick={() => handelLogin('login')} className="w-52 bg-blue-700 hover:bg-blue-800 px-3 py-1 border-2 border-gray-900 rounded-full text-yellow-50 font-medium mt-4">
         login
        </button>
        <h1 className=" text-xl font-semibold text-blue-800 my-2 underline decoration-2">or</h1>
        <button onClick={() => handelLogin('signin')} className="w-52 bg-white hover:bg-gray-200 px-3 py-1 border-2 border-red-800 rounded-full t-black font-bold">
         Signin
        </button>
      </div>
    </div>
  )
}
