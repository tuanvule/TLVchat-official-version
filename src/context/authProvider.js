import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loginType, setLoginType] = useState()

    const history = useNavigate()

    useEffect(() => {
      switch(loginType) {
        case 'facebook':
          const unsubscibed = auth.onAuthStateChanged((user) => {
            if(user) {
              const { displayName, email, uid, photoURL } = user
              setUser( {
                  displayName, email, uid, photoURL
              } )

              localStorage.setItem('user', JSON.stringify({
                displayName, email, uid, photoURL
              }))
              history('/')
              return
            }
            history('/login')
          })

          return () => {
            unsubscibed()
          }

          case 'normal':
            if(user) {
              console.log(user)
              localStorage.setItem('user', JSON.stringify({
                ...user
              }))
              history('/')
              return
            }
            history('/login')
          break

          default:
            // console.log('save data')
            const data = JSON.parse(localStorage.getItem('user')) 
            if(data) {
              setUser(data)
              history('/')
              return
            }
            history('/login')
          break
      }

    }, [history, loginType])

  return (

    <AuthContext.Provider value={{
      ...user,
      setUser,
      history,
      loginType, 
      setLoginType
    }}>
        { children }
    </AuthContext.Provider>

    
  )
}
