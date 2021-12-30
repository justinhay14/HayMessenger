import React from 'react'
import Cookies from 'universal-cookie';
let cookies = new Cookies()
const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullname');
    cookies.remove('hashedPassword');

    window.location.reload();
}

const Sidebar = () => {
    return (
        <div className="flex flex-col items-center text-white bg-gray-700 shadow h-screen w-72">
            <div className='py-2'>
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar
