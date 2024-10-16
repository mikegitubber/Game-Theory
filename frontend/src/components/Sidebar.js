import { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar =()=>{
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "AboutUS", src: "https://cdn.iconscout.com/icon/free/png-256/free-calendar-49-83540.png?f=webp" },
        { title: "Dashboard", src: "https://static.vecteezy.com/system/resources/previews/022/445/029/original/write-icon-notes-illustration-sign-writer-symbol-notebook-logo-vector.jpg" },
        { title: "Booking", src: "https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-white-photo-album-icon-image_1344878.jpg" },
        { title: "ContactUS", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM94eDkWqJzNiAYzvx1Qc0cEPS_ScfFgCx6g&s" },
      ];
    return (
        <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-gradient-to-r from-cyan-500 to-fuchsia-200 h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="https://cdn.icon-icons.com/icons2/3404/PNG/512/categories_collapse_icon_215799.png" alt=""
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-neutral-950
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png" alt=""
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
             <Link to={`/${Menu.title}`}>
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-950 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              {/* <Link to='/'></Link> */}
              <img src={Menu.src} alt="" className="w-12" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
              
            </li>
            </Link>
          ))}
        </ul>
      </div>
    )
}
export default Sidebar;