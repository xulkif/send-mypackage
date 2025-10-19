import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UserData } from "../../store/telegramFile/initData"


const UserHeader=()=>{
    const{user}=useSelector(state=>state.user)
    console.log(user,"User header");
    
    return<header className="w-full py-4 flex-col items-center  px-2 border-1 border-gray-100">
       <label> First Name{user?.first_name||""}</label>
       <label> Last Name{user?.last_name||""}</label>
       <label> User Name{user?.username||""}</label>


    </header>
}


export default UserHeader