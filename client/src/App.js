import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import {store,persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import Login from "./components/User/Login/login";
import Test from "./components/User/Home/test";
import Signup from "./components/User/Signup/signup";
import Home from "./components/User/Home/home";
import {PrivateRouteHome,PrivateRouteLogin} from "./components/PrivateRouter";
import AdminHome from "./components/Admin/Dashboard/home";
import AdmLogin from "./components/Admin/Login/admlogin";
import Adduser from "./components/Admin/Adduser/Adduser";
import Edituser from "./components/Admin/Edituser/edituser";
import Profile from "./components/User/Profile/profile";

function App() {
 return (
    <div>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/login" element={<PrivateRouteLogin />} >
            <Route index element={<Login />} /> 
            </Route>
            <Route path="/test" element={<Test />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<PrivateRouteHome />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/adminhome" element={<AdminHome/>} />
            <Route path="/adminlogin" element={<AdmLogin/>} />
            <Route path="/adduser" element={<Adduser/>} />
            <Route path="/edituser/:email" element={<Edituser/>} />



          </Routes>
        </Router>
      </PersistGate>
      </Provider>
    </div>
 );
}

export default App;
