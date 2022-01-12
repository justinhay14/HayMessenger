import React, { useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import Auth from './components/Auth'
import Sidebar from './components/Sidebar'
import ChannelCon from './components/ChannelCon'

import 'stream-chat-react/dist/css/index.css'
import './App.css'
//require('dotenv').config()
import env from './env'
const environment = env();
//console.log(environment.api_key)

const cookies = new Cookies();
const authToken = cookies.get("token");

const client = StreamChat.getInstance(environment.api_key);

if (authToken) {
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullname: cookies.get('fullname'),
      hashedPassword: cookies.get('hashedPassword')
  }, authToken)/*.then(
    console.log("connected")
  )*/
}

function App() {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  if (authToken) {
    return (
      <div className="app-wrapper">
        <Chat client={client} theme="team light">
          <Sidebar 
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
          />
          <ChannelCon 
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
          />
        </Chat>
      </div>
    );
  }
  else {
    return (
      <Auth />
    );
  }
}

export default App;
