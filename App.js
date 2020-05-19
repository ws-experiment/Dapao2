import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk';

//DEVELOPMENT USE
import { composeWithDevTools } from 'redux-devtools-extension';
import NavigationContainer from './navigation/NavigationContainer';

import AuthReducer from './stores/reducers/AuthReducer';
import MenuReducer from "./stores/reducers/MenusReducer";
import CartReducer from './stores/reducers/CartReducer';
import UserReducer from "./stores/reducers/UserReducer";
import OrderReducer from "./stores/reducers/OrderReducer";
import OffDayReducer from './stores/reducers/OffDayReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  menus: MenuReducer,
  cart: CartReducer,
  user: UserReducer,
  orders: OrderReducer,
  offDay: OffDayReducer
});

//DEVELOPMENT USE
//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));
 const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "font-regular": require("./assets/fonts/TitilliumWeb-Regular.ttf"),
    "font-bold": require("./assets/fonts/TitilliumWeb-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
