import { useSelector } from "react-redux"


const UserHeader=()=>{
    const{user}=useSelector(state=>state.user)
    return<header className="w-full py-4 flex items-center  px-2 border-1 border-gray-100">
       <label>{user?.first_name||""}</label>
       <label>{user?.last_name||""}</label>
       <label>{user?.username||""}</label>


    </header>
}


export default UserHeader