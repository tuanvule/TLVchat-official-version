import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
// import { Form, Modal, Input } from 'antd';
import { AppContext } from '../../context/appProvider';
import addDocument from '../../firebase/services';
import { AuthContext } from '../../context/authProvider';
import firebase from '../../firebase/config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loading from './loading';

export default function AddRoomModal() {
    const { setIsAddRoomVisible } = useContext(AppContext);
    const { user } = useContext(AuthContext)
    const [ value, setValue] = useState({
      name: '',
      description: '',
      avata: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const fileUpload = useRef()


    // const [formValue, setFormValue] = useState({})

    const { uid } = useContext(AuthContext);
    // const [form] = Form.useForm();

    const resetInputValue = () => {
      setValue({
        name: '',
        description: ''
      })
    }

    const handleOk = (e) => {
      // handle logic
      // add new room to firestore
      // setFormValue(value)
      e.preventDefault()

      // const a = '#f8fafc #f1f5f9 #e2e8f0 #cbd5e1 #94a3b8 #64748b #475569 #334155 #1e293b #0f172a #f9fafb #f3f4f6 #e5e7eb #d1d5db #9ca3af #6b7280 #4b5563 #374151 #1f2937 #111827 #fafafa #f4f4f5 #e4e4e7 #d4d4d8 #a1a1aa #71717a #52525b #3f3f46 #27272a #18181b #fafafa #f5f5f5 #e5e5e5 #d4d4d4 #a3a3a3 #737373 #525252 #404040 #262626 #171717 #fafaf9 #f5f5f4 #e7e5e4 #d6d3d1 #a8a29e #78716c #57534e #44403c #292524 #1c1917 #fef2f2 #fee2e2 #fecaca #fca5a5 #f87171 #ef4444 #dc2626 #b91c1c #991b1b #7f1d1d #fff7ed #ffedd5 #fed7aa #fdba74 #fb923c #f97316 #ea580c #c2410c #9a3412 #7c2d12 #fffbeb #fef3c7 #fde68a #fcd34d #fbbf24 #f59e0b #d97706 #b45309 #92400e #78350f #fefce8 #fef9c3 #fef08a #fde047 #facc15 #eab308 #ca8a04 #a16207 #854d0e #713f12 #f7fee7 #ecfccb #d9f99d #bef264 #a3e635 #84cc16 #65a30d #4d7c0f #3f6212 #365314 #f0fdf4 #dcfce7 #bbf7d0 #86efac #4ade80 #22c55e #16a34a #15803d #166534 #14532d #ecfdf5 #d1fae5 #a7f3d0 #6ee7b7 #34d399 #10b981 #059669 #047857 #065f46 #064e3b #f0fdfa #ccfbf1 #99f6e4 #5eead4 #2dd4bf #14b8a6 #0d9488 #0f766e #115e59 #134e4a #ecfeff #cffafe #a5f3fc #67e8f9 #22d3ee #06b6d4 #0891b2 #0e7490 #155e75 #164e63 #f0f9ff #e0f2fe #bae6fd #7dd3fc #38bdf8 #0ea5e9 #0284c7 #0369a1 #075985 #0c4a6e #eff6ff #dbeafe #bfdbfe #93c5fd #60a5fa #3b82f6 #2563eb #1d4ed8 #1e40af #1e3a8a #eef2ff #e0e7ff #c7d2fe #a5b4fc #818cf8 #6366f1 #4f46e5 #4338ca #3730a3 #312e81 #f5f3ff #ede9fe #ddd6fe #c4b5fd #a78bfa #8b5cf6 #7c3aed #6d28d9 #5b21b6 #4c1d95 #faf5ff #f3e8ff #e9d5ff #d8b4fe #c084fc #a855f7 #9333ea #7e22ce #6b21a8 #581c87 #fdf4ff #ae8ff #f5d0fe #f0abfc #e879f9 #d946ef #c026d3 #a21caf #86198f #701a75 #fdf2f8 #fce7f3 #fbcfe8 #f9a8d4 #f472b6 #ec4899 #db2777 #be185d #9d174d #831843 #fff1f2 #ffe4e6 #fecdd3 #fda4af #fb7185 #f43f5e #e11d48 #be123c #9f1239 #881337'

      // const a2 = a.split(' ')
      
      // for(let i = 0; i <= a2.length; i+=2) {
      //   a2.splice(i, 1)
      // }

      // for(let i = 0; i <= a2.length; i+=2) {
      //   a2.splice(i, 1)
      // }

      // addDocument('customing-modal', {
      //   color: a2
      // })

      
      // if(value.avata === '') {
      //   console.log('a')
      //   setValue(prev => ({
      //     ...prev,
      //     avata: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQ53Esibh-O6ebk0B4OBfulUoQDlQBUPQ3Q&usqp=CAU'
      //   }))
      // }

      console.log('b')

      addDocument('rooms', { 
        ...value, 
        avata: value.avata || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQ53Esibh-O6ebk0B4OBfulUoQDlQBUPQ3Q&usqp=CAU', 
        background: {backgroundColor: '#fff'}, members: [`${uid}`] ,
        creator: user
      });

      // reset form value
      resetInputValue()
      
      setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
      resetInputValue()

      setIsAddRoomVisible(false);
    };

    const handleNameChange = (e) => {
      setValue({
        ...value,
        name: e.target.value
      })
    }

    const handleDcsChange = (e) => {
      setValue({
        ...value,
        description: e.target.value
      })
    }

    const handleAvataChange = (e) => {
      setValue({
        ...value,
        avata: e.target.value
      })
    }

  function uploadImage() {

    var isValid = /\.jpe?g$/i.test(fileUpload.current.files[0].name)

    if(fileUpload.current.files[0] && isValid) {

      setIsLoading(true)

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
              setValue(prev => ({
                ...prev,
                avata: downloadURL
              }))
            } else {
              setValue(prev => ({
                ...prev,
                avata: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQ53Esibh-O6ebk0B4OBfulUoQDlQBUPQ3Q&usqp=CAU'
              }))
            }
            setIsLoading(false)
          });
        }
      );
  
    } else {
      alert('Only jpg files allowed!')
    }
  }


  useEffect(() => {
    if(fileUpload.current) {
      fileUpload.current.addEventListener("change", (event) => {
        uploadImage()
      })
    }
  }, [])

  return ( 
    <form className=" z-30 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-30">
      {isLoading ? <Loading type='spin' color='#2563EB' height={'8%'} width={'8%'}/> : null}
      <div className="bg-cyan-400 w-96 h-fit px-8 py-4">
        <h1 className="text-2xl font-semibold">Add room</h1>
        <div className="w-full h-1 mb-6 bg-gradient-to-r from-red-400 to-cyan-500"/>

        <h1 className=" text-base font-bold">Name</h1>
        <input value={value.name} onChange={handleNameChange} type="text" placeholder="enter room's name" className=" mb-3 mt-2 w-full px-2 py-2 rounded-lg" name="name" />
        
        <h1 className=" text-base font-bold">Description</h1>
        <textarea style={{ maxHeight: "80px"}} value={value.description} onChange={handleDcsChange} type="text" placeholder="enter room's description" className=" mb-3 mt-2 w-full h-20 justify-items-start px-2 py-2 rounded-lg" name="description" />
        <h1 className=" text-base font-bold">Avata</h1>
          <input value={value.avata} onChange={handleAvataChange} placeholder="enter the url image" type="text" className=" mb-2 mt-2 w-full justify-items-start px-2 py-2 rounded-lg" name="description" />
          
          
          <input ref={fileUpload} className="
          block w-full text-sm text-slate-500 mb-2
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-2
          file:text-sm file:font-bold
          file:border-[#2563EB]
          file:bg-violet-50 file:text-[#2563EB]
          hover:file:bg-violet-100
          " type="file" />

        <div className=" mt-auto">
          <button onClick={handleCancel} className=" text-base font-light bg-white border border-black px-2 py-1 mr-1 rounded">Cancle</button>
          <input onClick={(e) => handleOk(e)} type="submit" className=" text-lg font-medium bg-[#4BECC6] px-2 py-1 rounded" value="Add room"/>
        </div>
      </div>
    </form>
  )
      //   {/* <Modal
      //   title='Tạo phòng'
      //   visible={isAddRoomVisible}
      //   onOk={handleOk}
      //   onCancel={handleCancel}
      // >
      //   <Form form={form} layout='vertical'>
      //     <Form.Item label='Tên phòng' name='name'>
      //       <Input placeholder='Nhập tên phòng' />
      //     </Form.Item>
      //     <Form.Item label='Mô tả' name='description'>
      //       <Input.TextArea placeholder='Nhập mô tả' />
      //     </Form.Item>
      //   </Form>
      // </Modal> */}
}
