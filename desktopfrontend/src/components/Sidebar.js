import React, {useState} from 'react'
import Cookies from 'universal-cookie';
import { ChannelList, useChatContext } from 'stream-chat-react'
import ChannelList1 from './ChannelList1';
import ChannelPreview from './ChannelPreview';

const teamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}
const messagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
}

let cookies = new Cookies()
const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullname');
    cookies.remove('hashedPassword');

    window.location.reload();
}

const Sidebar = ({isCreating, setIsCreating, setCreateType, setIsEditing}) => {
    const [toggleContainer, setToggleContainer] = useState(false)
    const { client } = useChatContext();
    const filters = { members: { $in: [client.userID] } }
    return (
        <div className="flex flex-col items-center text-white bg-gray-700 shadow w-72">
            <div className='py-2'>
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full" onClick={logout}>
                    Logout
                </button>
            </div>
            <div className="py-2">
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={teamFilter}
                    List={(listProps) => (
                        <ChannelList1 
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <ChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={messagingFilter}
                    List={(listProps) => (
                        <ChannelList1 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <ChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default Sidebar
