import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
//require('dotenv').config()
import env from '../env'
const environment = env();
//console.log(environment.backend_url);

const cookies = new Cookies();

let formState = {
    fullname: '',
    username: '',
    password: '',
    confirmpassword: '',
}

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false)
    const [isMatching, setIsMatching] = useState(true);
    const [isTryAgain, setIsTryAgain] = useState(false);

    const handleSubmit = async (e) => {
        setIsMatching(true)
        setIsTryAgain(false)
        e.preventDefault();

        const username = formState.username;
        const password = formState.password;
        const confirmpassword = formState.confirmpassword
        //console.log("made it here")
        if (!isSignup || password == confirmpassword) {
            
            try {
                const { data : { token, userId, hashedPassword, fullname, message } } = await axios.post(`${environment.backend_url}/${isSignup ? 'signup' : 'login'}`, {
                    username: username, password: password, fullname: formState.fullname
                });
                
                /*if (message == "Incorrect password" || message == "User not found") {
                    console.log(message, "\n\n\n\n\n\n\n534097878787878788")
                    setIsTryAgain(true)
                }*/
                
                cookies.set('token', token);
                cookies.set('username', username);
                cookies.set('fullname', fullname);
                cookies.set('userId', userId);

                if (isSignup) {
                    cookies.set('hashedPassword', hashedPassword);
                }

                /*if (!cookies.get(token)) {
                    setIsTryAgain(true)
                }*/
                console.log("reloading")
                window.location.reload();
            } catch (error) {
                setIsTryAgain(true)
            }
        }
        else {
            setIsMatching(false)
        }
    }

    return (
        <div className="auth-form">
            <div className="w-full max-w-xs">
                <form className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <p className='text-white text-lg font-bold'>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    {!isSignup && (
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" type="text" placeholder="Username" onChange={(e)=>{formState.username = e.target.value}} required />
                    </div>
                    )}
                    {!isSignup && (
                    <div className="mb-6">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-700  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="******************" onChange={(e) => {formState.password = e.target.value}} required />
                    </div>
                    )}
                    {isSignup && (
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" type="text" placeholder="Username" onChange={(e)=>{formState.username = e.target.value}} required />
                    </div>
                    )}
                    {isSignup && (
                    <div className="mb-6">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="fullname">
                            Full Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-700  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="fullname" type="text" placeholder="Full Name" onChange={(e)=>{formState.fullname = e.target.value}} required />
                    </div>
                    )}
                    {isSignup && (
                    <div className="mb-6">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-700  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="******************" onChange={(e)=>{formState.password = e.target.value}} required />
                    </div>
                    )}
                    {isSignup && (
                    <div className="mb-6">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="confirmpassword">
                            Confirm Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-700  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmpassword" type="password" placeholder="******************" onChange={(e)=>{formState.confirmpassword = e.target.value}} required />
                    </div>
                    )}
                    <div className="flex items-center justify-between">
                        <button className="bg-yellow-500 hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {isSignup ? "Sign Up" : "Sign In"}
                        </button>
                        <div className="inline-block align-baseline font-bold text-sm text-yellow-500 hover:text-yellow-800">
                            <p>
                                <span onClick={() => {setIsSignup((prevIsSignup) => !prevIsSignup)}}>
                                    {isSignup ? "Sign In" : "Sign Up"}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="text-red-500">
                    <p>
                        {isMatching || !isSignup ? "" : "Error password and confirm password don't match"}  
                    </p>
                    <p>
                        {isTryAgain && !isSignup ? "Try again. Wrong username or password." : ""}
                    </p>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Auth
