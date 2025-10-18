import { useSelector } from "react-redux"


const UserHeader=()=>{
    const{user}=useSelector(state=>state.user)
    return<header className="w-full py-4 flex items-center  px-2 border-1 border-gray-100">
       <label> First Name{user?.first_name||""}</label>
       <label> Last Name{user?.last_name||""}</label>
       <label> User Name{user?.username||""}</label>


    </header>
}


export default UserHeader