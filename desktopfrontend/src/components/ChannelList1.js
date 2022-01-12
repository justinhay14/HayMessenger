import React from 'react'

const ChannelList1 = ({children, error = false, loading, type, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
    if (error) {
        return type === 'team' ? (
            <div className="bg-gray-700 w-40 flex flex-row text-white">
                <p className="bg-gray-700">
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ) : null
    }

    if (loading) {
        return (
            <div className="bg-gray-700 w-40 flex flex-row text-white">
                <p className="bg-gray-700">
                    {type === 'team' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>
        )
    }

    return (
        <div className="px-2 bg-gray-700">
            <div className="bg-gray-700 w-40 flex flex-row text-white">
                <p>
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                <button className="px-2" onClick={() => {
                    //console.log("made it here", type)
                    setCreateType(type)
                    setIsCreating((prevState) => !prevState)
                    //setIsCreating(true)
                    setIsEditing(false)
                    if (setToggleContainer) {
                        setToggleContainer((prevState) => !prevState)
                    }
                }}>+</button>
            </div>
            {children}
        </div>
    )
}

export default ChannelList1
