import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'

const ChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext()

    const CPreview = () => (
        <p className="text-white text-sm">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    )


    const DMPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID)
    
        //console.log(members[0])

        return (
            <div className="flex flex-row text-white text-sm">
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        )
    }
    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'h-auto bg-gray-800'
                : 'h-auto bg-gray-700'
        }
        onClick={() => {
            setIsCreating(false)
            setIsEditing(false)
            setActiveChannel(channel)
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {type === 'team' ? <CPreview /> : <DMPreview />}
        </div>
    )
}

export default ChannelPreview
