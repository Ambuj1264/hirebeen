
import { useEffect } from 'react';
import AOS from 'aos';
import { Toaster } from 'react-hot-toast'
import Nav from './component/Nav'
import Router from './routers/router'

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
    <Toaster />
    <Nav/>
     <Router />
    </>
  )
}

export default App
