import React, { useContext, useState } from 'react';
// import { Form, Modal, Input } from 'antd';
import { AppContext } from '../../context/appProvider';
import addDocument from '../../firebase/services';
import { AuthContext } from '../../context/authProvider';

export default function AddRoomModal() {
    const { setIsAddRoomVisible } = useContext(AppContext);
    const [ value, setValue] = useState({
      name: '',
      description: '',
      avata: '',
    })

    // const [formValue, setFormValue] = useState({})

    const { uid } = useContext(AuthContext);
    // const [form] = Form.useForm();

    const resetInputValue = () => {
      setValue({
        name: '',
        description: ''
      })
    }

    const handleOk = async () => {
      // handle logic
      // add new room to firestore
      // setFormValue(value)

      addDocument('rooms', { ...value, background: {backgroundColor: '#fff'}, members: [`${uid}`] });

      // reset form value
      resetInputValue()
      
      setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
    // reset form value
      resetInputValue()

      setIsAddRoomVisible(false);
    };

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   setFormValue(value)
    //   // console.log(value)
    // }



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

  return (
    <form className=" z-30 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-30">
      <div className="bg-cyan-400 w-96 h-2/3 px-8">
        <h1 className="mt-4 text-2xl font-semibold">Add room</h1>
        <div className="w-full h-1 mb-6 bg-gradient-to-r from-red-400 to-cyan-500"/>

        <h1 className=" text-base font-bold">Name</h1>
        <input value={value.name} onChange={handleNameChange} type="text" className=" mb-4 mt-2 w-full px-2 py-2 rounded-lg" name="name" />
        
        <h1 className=" text-base font-bold">description</h1>
        <input value={value.description} onChange={handleDcsChange} type="text" className=" mb-4 mt-2 w-full h-20 justify-items-start px-2 py-2 rounded-lg" name="description" />
        
        <h1 className=" text-base font-bold">description</h1>
        <input value={value.avata} onChange={handleAvataChange} type="text" className=" mb-2 mt-2 w-full justify-items-start px-2 py-2 rounded-lg" name="description" />

        <div className=" mt-auto">
          <button onClick={handleCancel} className=" text-base font-light bg-white border border-black px-2 py-1 rounded">cancle</button>
          <input onClick={handleOk} type="submit" className=" text-lg font-medium bg-[#4BECC6] px-2 py-1 rounded" value="submit"/>
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
