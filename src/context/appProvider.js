import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './authProvider';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isJoinRoomVisible, setIsJoinRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [isRoomUpdate, setIsRoomUpdate] = useState('false')
  const [customBackground, setCustomBackground] = useState()
  const [textColor, setTextColor] = useState('black')
  const [colorData, setColorData] = useState()
  const [signinVisivle, setSigninVisivle] = useState(false)
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const { uid } = React.useContext(AuthContext);

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: `${uid}`,
    };
  }, [uid, isRoomUpdate]);

  const rooms = useFirestore('rooms', roomsCondition);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || '',
    [rooms, selectedRoomId] 
  );

  const backgroundCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: '==',
      compareValue: `${uid}`,
    };
  }, [uid]);

  const backgrounds = useFirestore('customing-modal', backgroundCondition); 

  useEffect(() => {
    const color = db.collection('customing-modal').doc('Y2jlHm8tggMu0q5jS97a')
    color.get()
      .then(data => {
        setColorData(data.data())
      })
  
  }, [uid])

  return (
    <AppContext.Provider
      value={{
        rooms,
        // members,
        isRoomUpdate, setIsRoomUpdate,
        selectedRoom,
        isAddRoomVisible, setIsAddRoomVisible,
        selectedRoomId, setSelectedRoomId,
        isJoinRoomVisible, setIsJoinRoomVisible,
        backgrounds,
        // selectedBackground, 
        // setSelectedBackground,
        // selectedImage, 
        // setSelectedImage
      //   clearState,
        customBackground, setCustomBackground,
        textColor, setTextColor,
        colorData,
        signinVisivle, setSigninVisivle,
        isLoginVisible, setIsLoginVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}