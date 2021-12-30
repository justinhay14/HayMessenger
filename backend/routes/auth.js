const express = require('express')
require('dotenv').config()
const router = express.Router()

const StreamChat = require('stream-chat').StreamChat
const crypto = require('crypto')
const {connect} = require('getstream')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const server_client = connect(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET, process.env.STREAM_APP_ID)
        const client = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET)
        const {users} = await client.queryUsers({name: username})
        if(!users.length) return res.status(400).json({message: 'User was not found or incorrect password'})
        const encrypt_success = await bcrypt.compare(password, users[0].hashedPassword)
        const token = server_client.createUserToken(users[0].id)
        if (encrypt_success) {
            res.status(200).json({fullname: users[0].fullname, username, userId: users[0].id, token})
        }
        else {
            res.status(500).json({message: 'User was not found or incorrect password'})
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})

router.post('/signup', async (req, res) => {
    try {
        const {fullname, username, password} = req.body
        const userId = crypto.randomBytes(16).toString('hex')
        const server_client = connect(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET, process.env.STREAM_APP_ID)
        //console.log("connected\n", server_client)
        const hashedPassword = await bcrypt.hash(password, 13)
        const token = server_client.createUserToken(userId)
        //console.log("token created")
        res.status(200).json({fullname, username, userId, hashedPassword, token})
        console.log(token, fullname, username, userId, hashedPassword)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
})


module.exports = router