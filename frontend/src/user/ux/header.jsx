import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UserData } from "../../store/telegramFile/initData"


const UserHeader=()=>{
    const{testUser}=useSelector(state=>state.user)
    console.log(testUser,"User header");
    
    return<header className="w-full py-4 flex-col items-center  px-2 border-1 border-gray-100">
       <label> First Name{testUser?.first_name||""}</label>
       <label> Last Name{testUser?.last_name||""}</label>
       <label> User Name{testUser?.username||""}</label>


    </header>
}


export default UserHeader