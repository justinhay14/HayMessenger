import React, {useState} from 'react'
import {useChatContext} from 'stream-chat-react'
import UserList from './UserList'

const ChannelNameInput = ({channelName='', setChannelName}) => {
    const handleChange = (event) => {
        event.preventDefault()
        setChannelName(event.target.value)
    }
    return (
        <div className='px-2 flex flex-row'>
            <p>Name:</p>
            <div className='w-2'/>
            <input className="bg-slate-100" value={channelName} onChange={handleChange} placeholder="channel name" />
        </div>
    )
}

const EditChannel = ({setIsEditing}) => {
    const { channel } = useChatContext()
    const [channelName, setChannelName] = useState(channel ?.data?.name)
    const [selectedUsers, setSelectedUsers] = useState([])
    const updateChannel = async (event) => {
        event.preventDefault()
        const nameChanged = channelName !== (channel.data.name || channel.data.id)
        if (nameChanged) {
            await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}`})
        }
        if (selectedUsers.length) {
            await channel.addMembers(selectedUsers)
        }
        setChannelName(null)
        setIsEditing(false)
        setSelectedUsers([])
    }
    const deleteChannel = async (event) => {
        event.preventDefault()
        await channel.delete()
        setChannelName(null)
        setIsEditing(false)
        setSelectedUsers([])
    }
    return (
        <div className="edit-channel__container">
            <div className="px-2">
                <p className='text-lg'>
                    Edit Channel
                </p>
                <button className="bg-red-500 rounded-full w-6" onClick={() => {
                    if (setIsEditing) {
                        setIsEditing(false)
                    }
                }}>X</button>
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="bg-sky-700 text-white px-2 rounded-full w-32 flex content-center" onClick={updateChannel}>
                <p>
                    Save Changes
                </p>
            </div>
            <div className="h-32"/>
            <div className="bg-red-500 rounded-full w-28" onClick={deleteChannel}>
                <p>
                    Delete Channel
                </p>
            </div>
        </div>
    )
}

export default EditChannel