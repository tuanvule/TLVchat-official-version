import React, { useContext, useState, useRef, useEffect, useMemo, memo } from 'react'
import { AppContext } from '../../context/appProvider';
import { AuthContext } from '../../context/authProvider'
import addDocument from '../../firebase/services';
import useFirestore from '../../hooks/useFirestore';
import AddRoomModal from '../modals/addRoomModal'
import JoinRoomModal from '../modals/joinRoomModal';
import chunk from 'chunk'

function Chatwindow() {
  const [inputValue, setInputValue] = useState('');
  const [chunkedMes, setChunkedMes] = useState()
  const [chunkAmount, setChunkAmount] = useState(1)

  const { selectedRoom, isJoinRoomVisible} = useContext(AppContext);
 
  const { uid, photoURL, displayName } = useContext(AuthContext);

  const { isAddRoomVisible } = useContext(AppContext);

  const inputRef = useRef(null);
  const messageListRef = useRef(null);

  const handleSendMs = () => {
    if(inputValue !== '') {
      addDocument('messages', {
        text: inputValue,
        uid,
        photoURL,
        roomId: selectedRoom.id,
        displayName,
      });
  
      setInputValue('')
  
      // focus to input again after submit
      if (inputRef?.current) {
        setTimeout(() => {
          inputRef.current.focus();
        });
      }
    }
  };

  function handleAddEmoji(emoji) {
    setInputValue(prev => `${prev} ${emoji}`)
  }

  const condition = useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore('messages', condition);

  function handleScroll() {
    var position = messageListRef.current.children[0].getBoundingClientRect();
    
    const chunkedMes2 = chunk(messages, 20)

    // console.log(chunkAmount, chunkedMes2.length)

    // console.log(chunkedMes)

    // checking for partial visibility
    // console.log(chunkedMes)
    if(position.top < messageListRef.current.scrollHeight && position.bottom >= 0 && chunkAmount < chunkedMes2.length) {
      setChunkAmount(prev => prev+=1)
    }
  }

  // useEffect(() => {
  //   if (messageListRef?.current) {
  //       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  //   }
  // }, [messages, selectedRoom]);
  
  // chunked messages ---------------
  useEffect(() => {
    if(messages.length > 0) {
      const chunkedMes = chunk(messages, 20)

      if(chunkedMes.length) {
        const chunkedMes2 = [...chunkedMes]
        const reversedChunkMes = chunkedMes2.splice(chunkedMes.length - chunkAmount, chunkAmount)
        const newChunkedMes = [].concat.apply([], reversedChunkMes)
  
        if(chunkedMes[chunkedMes.length-1].length < 20 && newChunkedMes.length <= 20) {
          setChunkAmount(2)
        }
  
        setChunkedMes(newChunkedMes)
      }
    } else {
        setChunkedMes(null)
    }
  }, [messages, chunkAmount])

  useEffect(() => {
    setChunkAmount(1)
  }, [selectedRoom])

  useEffect(() => {
    if (messageListRef?.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
    }
  }, [messages, selectedRoom]);
  
  return (
    <>
    { isJoinRoomVisible ? <JoinRoomModal/> : null}
    { isAddRoomVisible ? <AddRoomModal/> : null }
    { selectedRoom.id ? (
    <div style={{...selectedRoom.background, color: selectedRoom.color}}
    className=" bg-no-repeat bg-cover bg-center flex-1 flex flex-col">
      <nav style={{borderRadius: '0'}} className="glassmorphism-style bg-transparent flex items-center justify-between px-2 py-2 border-b-2">
        <div className="flex items-center">
          <img className="w-12 h-12 rounded-full mr-2" src={selectedRoom.avata} alt="" />
          <div>
            <h2 className="font-medium text-lg text-[#66FCF0]">{selectedRoom.name}</h2>
            <p className="">{selectedRoom.description}</p>
          </div>
        </div>
        <div className="flex items-center pr-2">
          <h1 className=" text-lg font-semibold">{selectedRoom.members.length}</h1>
          <i class="fa-solid fa-user-group text-blue-600 ml-2"></i>
        </div>
      </nav>
      <ul onScroll={handleScroll} ref={messageListRef} className=" h-full py-2 px-2 overflow-auto message-list text-black">
        {chunkedMes && chunkedMes.map((mes) => {
          return (
            <li className="glassmorphism-style w-fit flex items-end mb-4 py-1 px-2 rounded-md bg-white bg-opacity-30" key={mes.id}>
              <img className=" w-11 h-11 mt-1 rounded-full self-start" src={mes.photoURL} alt="" />
              <div className="">
                <div className="flex items-center">
                  <h1 className=" font-medium text-lg mx-2">{mes.displayName}</h1>
                  <p className=" text-sm">{mes.TimeAdd}</p>
                </div>
                <div className=" break-all">
                  <h1 className=" ml-2 font-medium">{mes.text}</h1>
                </div>
              </div>
            </li> 
          )
        })}
      </ul>

      <div style={{borderRadius: '0'}} className="flex w-full px-1 py-2 glassmorphism-style border-t">
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} ref={inputRef} className=" w-full bg-[#06283D] text-white ml-1 px-3 py-1 rounded-full outline-none" type="text" />
        <div data-emojiable="true" className="emoji relative flex items-center">
          <div className="emoji-list absolute hidden -top-14 -right-16 transform bg-[#0A0C10] px-2 py-1 text-2xl rounded-full border-2 border-[#1D4ED8] triangle">
            <div onClick={() => handleAddEmoji('🤣')} className=" cursor-pointer hover:brightness-90">🤣</div>
            <div onClick={() => handleAddEmoji('😢')} className=" cursor-pointer hover:brightness-90">😢</div>
            <div onClick={() => handleAddEmoji('😠')} className=" cursor-pointer hover:brightness-90">😠</div>
            <div onClick={() => handleAddEmoji('😭')} className=" cursor-pointer hover:brightness-90">😭</div>
            <div onClick={() => handleAddEmoji('🙂')} className=" cursor-pointer hover:brightness-90">🙂</div>
            <div onClick={() => handleAddEmoji('🤔')} className=" cursor-pointer hover:brightness-90">🤔</div>
            <div onClick={() => handleAddEmoji('😑')} className=" cursor-pointer hover:brightness-90">😑</div>
          </div>
          <button className=" mx-2 rounded-large hover:opacity-90">
            <i class="fa-solid fa-face-smile text-2xl h-full text-[#06B6D4]"></i>
          </button>
        </div>
        <button onClick={handleSendMs} className="mx-2 bg-[#06283D] px-4 py-1 rounded-large hover:opacity-90">
          <i class="fa-solid fa-paper-plane text-[#2663E9]"></i>
        </button>
      </div>
    </div>
    ) :
    // <div className=" bg-[#ffffff] flex-1 flex items-center justify-center border-r-2 border-cyan-500">
    //   <div style={{borderRadius: '50px',background: '#ffffff',boxShadow:  '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff'}} className=" px-5 py-5 bg-[#22D3EE]">
    //     <h1 className=" text-2xl font-semibold text-slate-800">Bạn chưa chọn phòng</h1>
    //   </div>
    // </div>
    <div style={{backgroundImage:'url(/not-choose-room.jpg)'}} className=" bg-cover bg-center flex-1"></div>
  }
  </>
  )
}


export default Chatwindow