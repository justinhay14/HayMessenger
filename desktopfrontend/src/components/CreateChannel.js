import React, {useState} from 'react'
import { useChatContext } from 'stream-chat-react'

import UserList from './UserList'

const ChannelNameInput = ({channelName='', setChannelName}) => {
    const handleChange = (event) => {
        event.preventDefault()
        setChannelName(event.target.value)
    }
    return (
        <div className='flex flex-row'>
            <p className='px-2'>Name: </p>
            <input className="bg-slate-100" value={channelName} onChange={handleChange} placeholder="channel name" />
        </div>
    )
}

const CreateChannel = ({createType, setIsCreating}) => {
    const { client, setActiveChannel} = useChatContext()
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const [channelName, setChannelName] = useState('')

    const createChannel = async (e) => {
        e.preventDefault()
        try {
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            })

            await newChannel.watch()
            setChannelName('')
            setIsCreating(false)
            setSelectedUsers([client.userID])
            setActiveChannel(newChannel)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='py-2'>
            <div className='px-2'>
                <p className="text-lg">
                    {createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}
                </p>
                <button className="bg-red-500 rounded-full w-6" onClick={() => {
                    if (setIsCreating) {
                        setIsCreating(false)
                    }
                }}>X</button>
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
            <UserList setSelectedUsers={setSelectedUsers}/>
            <div className="px-2">
            <div onClick={createChannel} className='bg-sky-700 rounded-full w-32 px-2 text-white'>
                <p>
                    {createType==='team' ? 'Create Channel': 'Create Message Group'}
                </p>
            </div>
            </div>
            
        </div>
    )
}

export default CreateChannel