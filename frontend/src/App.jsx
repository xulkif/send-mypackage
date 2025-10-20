import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TravelerRegistration from "./pages/TravelerRegistration";
import SenderRegistration from "./pages/SenderRegistration";
import TravelersList from "./pages/TravelersList";
import SenderList from "./pages/SenderList";
import PackagesList from "./pages/PackagesList";
import TravelerDetail from "./pages/TravelerDetail";
import PackageDetail from "./pages/PackageDetail";
import PaymentPage from "./pages/PaymentPage";
import Statistics from "./pages/Statistics";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { City } from "country-state-city";
import { setCity } from "./store/getCity";
import { travelersData } from "./config/sampleData";
import CheckOut from "./checkout/checkout";
import AdminDashboard from "./Admin/Dashboard";
import UserLayout from "./user/ux";
import InitialPage from "./Common";
import AdminLayout from "./Admin/adminLayout";
import WebApp from "@twa-dev/sdk";
import { CheckUser, DemoData, UserData } from "./store/telegramFile/initData";

function App() {
  /*const dispatch=useDispatch()
  const {user,isAuthenticated,loading}=useSelector((state)=>state.user)
  useEffect(()=>{
    const tg=window.Telegram.WebApp;
    const user=tg.initDataUnsafe.user;
    console.log(user);
    dispatch(checkUser(user));
  },[])

  if(loading){
    return <div>Loading...</div>
  }
  if(!isAuthenticated){
    return <div>Not Authenticated</div>
  }*/

  const user = {
    isAuthenticated: true,
    role: "user",
    userName: "xulkif",
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const allCities = City.getAllCities();
    dispatch(setCity(allCities));
    dispatch(DemoData(travelersData));
    WebApp.ready();
    let data1 = WebApp.initData;
    let data2 = WebApp.initDataUnsafe.user;
    
    if (data2) {
      dispatch(UserData(data2));
      dispatch(CheckUser(data1));
    }
  }, [dispatch]);
  const { city, loading } = useSelector((state) => state.citys);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route
          path="/"
          element={
            <CheckOut user={user}>
              <InitialPage />
            </CheckOut>
          }
        />

        <Route
          path="/user"
          element={
            <CheckOut user={user}>
              <UserLayout />
            </CheckOut>
          }
        >
          <Route path="Home" element={<HomePage />} />
          <Route path="register-traveler" element={<TravelerRegistration />} />
          <Route path="register-sender" element={<SenderRegistration />} />
          <Route path="travelers" element={<TravelersList />} />
          <Route path="packages" element={<PackagesList />} />
          <Route path="senders" element={<SenderList />} />
          <Route path="traveler/:id" element={<TravelerDetail />} />
          <Route path="package/:id" element={<PackageDetail />} />
          <Route path="payment" element={<PaymentPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckOut user={user}>
              <AdminLayout />
            </CheckOut>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
