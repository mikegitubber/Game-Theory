import { createBrowserRouter,Outlet} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

import Calender from './components/Book/Calender'
import Booking from './components/Booking';
import Sports from './components/Book/Sports';
import UserContext from './Constants/UserContext';
import { useContext, useState } from 'react';
import Loginform from './components/Loginform';
import Signupform from './components/Signupform';
const App=()=> {
  const [place,setPlace]=useState();
  const [game,setGame]=useState();
  const [uname,setUname]=useState();
  return (
    <UserContext.Provider value={{center : place,setPlace,sport:game,setGame,UserName:uname,setUname}}>
    <div className="m-0 p-0 flex ">
      <div className="sticky top-0 h-screen">
    <Sidebar />
    </div>
     <Outlet/>
    </div>
    </UserContext.Provider>
  );
}
export const appRouter = createBrowserRouter([
  {
      path : "/",
      element : <App/>,
      children: [
          {
              path: "/Dashboard",
              element : <Dashboard/>
          },
          {
            path: "/login",
            element : <Loginform/>
        },
        {
          path: "/signup",
          element : <Signupform/>
        },
          {
            path: "/Booking/Sports",
            element : <Sports/>
          },
          {
            path: "/Booking/Calender",
            element : <Calender/>
          },
          {
            path: "/Booking",
            element : <Booking/>
          },  
      ]
  },
  

])
export default App;
