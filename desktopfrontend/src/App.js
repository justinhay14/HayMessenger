import React, { useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import Auth from './components/Auth'

import 'stream-chat-react/dist/css/index.css'
import './App.css'
//require('dotenv').config()
import env from './env'
const environment = env();
console.log(environment.api_key)

const cookies = new Cookies();
const authToken = cookies.get("token");

const client = StreamChat.getInstance(environment.api_key);

if (authToken) {
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullname: cookies.get('fullname'),
      hashedPassword: cookies.get('hashedPassword')
  }, authToken).then(
    console.log("connected")
  )
}

function App() {
  if (authToken) {
    return (
      <h1>Logged in</h1>
    );
  }
  else {
    return (
      <Auth />
    );
  }
}

export default App;
