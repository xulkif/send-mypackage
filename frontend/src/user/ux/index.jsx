import { Outlet } from "react-router-dom"
import UserHeader from "./header"


const UserLayout=()=>{
    return<div className="w-full min-h-screen px-2 border-1 border-gray-100">
        <UserHeader/>
        <Outlet/>

    </div>
}


export default UserLayout