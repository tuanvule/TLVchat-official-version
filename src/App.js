
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './index.css';
import './App.css';
import Login from './components/login/index'
import ChatApp from './components/chat-room';
import AuthProvider from './context/authProvider';
import AppProvider from './context/appProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login/>} path='/login' />
            <Route element={<ChatApp/>} path='/' />
          </Routes>
          {/* <AddRoomModal />
          <InviteMemberModal /> */}
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
    // <Login />
    // <ChatApp/>
  );
}

export default App;
