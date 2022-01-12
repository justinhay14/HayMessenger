import React, { useEffect, useState } from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'

const ListCon = ({ children }) => {
    return (
        <div className="flex flex-col h-full px-2 py-2">
            <div className="flex flex-center">
                <p>Invite User(s)</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if (selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div onClick={handleSelect}>
            <div className={selected ? "bg-gray-200 flex flex-row px-2" : "flex flex-row px-2"}>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="w-20">{user.fullName || user.id}</p>
                <div className="w-6" />
            {selected ? <button className="bg-sky-500 rounded-full w-14">invite</button> : <div />}
            </div>
        </div>
    )
}

const UserList = ({ setSelectedUsers }) => {
    const { client } = useChatContext()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [listEmpty, setListEmpty] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return

            setLoading(true)
            
            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 }
                )

                if (response.users.length) {
                    setUsers(response.users)
                } else {
                    setListEmpty(true)
                }
            } catch (error) {
               setError(true)
            }
            setLoading(false)
        }

        if (client) getUsers()
    }, [])

    if (error) {
        return (
            <ListCon>
                <div>
                    Error loading, please refresh and try again.
                </div>
            </ListCon>
        )
    }

    if (listEmpty) {
        return (
            <ListCon>
                <div>
                    No users found.
                </div>
            </ListCon>
        )
    }

    return (
        <ListCon>
            {loading ? <div>
                Loading users...
            </div> : (
                users?.map((user, i) => (
                  <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />  
                ))
            )}
        </ListCon>
    )
}

export default UserList
