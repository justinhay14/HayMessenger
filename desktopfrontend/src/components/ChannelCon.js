import React from 'react'
import { Channel, MessageTeam, useChatContext, useChannelStateContext } from 'stream-chat-react'

import ChannelInner from './ChannelInner'
import CreateChannel from './CreateChannel'
import EditChannel from './EditChannel'

const ChannelCon = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    //console.log(isCreating)
    //const { channel } = useChannelStateContext();
    if (isEditing) {
        return (
            <div className="w-full">
                {<EditChannel setIsEditing={setIsEditing} />
                }
            </div> 
        )
    }

    if (isCreating) {
        //console.log("isCreating is true")
        return (
            <div className="w-full">
                {<CreateChannel createType={createType} setIsCreating={setIsCreating} />
                }
            </div>
        )
    }

    const EmptyState = () => {
        return (
            <div className="w-full px-2">
                This is the beginning of your chat history.
            </div>
        )
    }

    return (
        <div className="w-full">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    )
}

export default ChannelCon
