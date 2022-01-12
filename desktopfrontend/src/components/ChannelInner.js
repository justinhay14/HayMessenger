import React, { useState } from 'react'
import { Thread, Window, useChannelActionContext, useChannelStateContext, useChatContext, MessageList, MessageInput } from 'stream-chat-react'

export const GiphyContext = React.createContext({})

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false)
  const { sendMessage } = useChannelActionContext()

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  )
}

const TeamChannelHeader = ({ setIsEditing }) => {
    const { channel, watcher_count } = useChannelStateContext()
    const { client } = useChatContext()
  
    const MessagingHeader = () => {
      const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID)
  
      if(channel.type !== 'team') {
        return (
          <div className='px-2'>
            {members.map(({ user }, i) => (
              <div key={i} className='flex flex-col'>
                {user.fullname || user.id}
              </div>
            ))}
  
            {members.length-3 > 0 && <p>and {members.length-3} more</p>}
          </div>
        );
      }
  
      return (
        <div className='flex flex-row'>
          <p className='px-2'># {channel.data.name}</p>
          <button className="px-2 bg-blue-200 rounded-full" onClick={() => setIsEditing(true)}>i</button>
        </div>
      )
    }
  
    const getCurrentWatcherText = (currentWatchers) => {
      if (!currentWatchers) {
        return 'No users are online'
      }
      else if (currentWatchers === 1) {
        return '1 user is online'
      }
      else {
        return `${currentWatchers} users are online`
      }
    }
  
    return (
      <div>
        <MessagingHeader />
        <div className='px-2'>
            {getCurrentWatcherText(watcher_count)}
        </div>
      </div>
    )
  }

  export default ChannelInner