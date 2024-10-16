import { createBrowserRouter,Outlet} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AboutUS from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Booking from './components/Booking';
const App=()=> {
  return (

    <div className="m-0 p-0 flex ">
      <div className="sticky top-0 h-screen">
    <Sidebar />
    </div>
     <Outlet/>
    </div>
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
            path: "/AboutUS",
            element : <AboutUS/>
          }, 
          {
            path: "/ContactUs",
            element : <ContactUs/>
          },
          {
            path: "/Booking",
            element : <Booking/>
          },  
      ]
  },
  

])
export default App;
