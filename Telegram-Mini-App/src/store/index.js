import { configureStore } from "@reduxjs/toolkit";

import CitySlice from "./getCity/index.jsx";
import TelegramSlice from "./telegramFile/initData.jsx";

const store = configureStore({
  reducer: {
    user: TelegramSlice,
    citys: CitySlice,
  },
});

export default store;
