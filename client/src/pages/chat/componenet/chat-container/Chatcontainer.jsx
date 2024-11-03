import React from 'react'
import ChatHeader from './component/Chat-header/ChatHeader'
import MassageBar from './component/Massage-bar/MassageBar'
import MassageContainer from './component/Massage-container/MassageContainer'

function Chatcontainer() {
  return (
    <div className='fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1 '>
      <ChatHeader/>
      <MassageContainer/>
      <MassageBar/>
    </div>
  )
}

export default Chatcontainer