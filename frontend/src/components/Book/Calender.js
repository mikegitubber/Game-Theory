import { useEffect, useState} from "react";
// import UserContext from "../Constants/UserContext";
import { useContext } from "react";
import axios from "axios";
import Slider from "./Slider";
// import 'react-calendar/dist/Calendar.css';
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isSameMonth,
    isToday,
    parse,
    startOfToday,
    startOfWeek,
  } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
const Calender=()=>{
    const [img,setImg]=useState([]);
    const[view,setView]=useState(true);
    // const {UserName}=useContext(UserContext);
    const today = startOfToday();
    const[month,setMonth]=useState(format(today, "M"));
    const[year,setYear]=useState(format(today, "y"));
    // const [pres,setPres]=useState({month,year});
    // useEffect(()=>{
    //     // console.log(pres)
    //     axios.get(`http://localhost:4000/api/diary/Media/?username=${UserName}&month=${month}&year=${year}`)
    //     .then((res)=>{
    //         console.log(res)
    //         setImg(res.data.media)
    //         console.log(img)
    //     }
    //     )
    //     .catch(err=>console.log(err))
    // },[])
    
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const colStartClasses = [
      "",
      "col-start-2",
      "col-start-3",
      "col-start-4",
      "col-start-5",
      "col-start-6",
      "col-start-7",
    ];
  
    const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
    let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());
    const [date,setDate]=useState(today)
    const daysInMonth = eachDayOfInterval({
      start: startOfWeek(firstDayOfMonth),
      end: endOfWeek(endOfMonth(firstDayOfMonth)),
    });
    const daysInWeek =eachDayOfInterval({
        start: startOfWeek(date),
        end: endOfWeek(date),
      });
    const getPrevMonth = (e) => {
      e.preventDefault();
      const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
      setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
    };
  
    const getNextMonth = (e) => {
      e.preventDefault();
      const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
      setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
    };
  if(!view)return(<Slider data={daysInWeek}  selectedDate={date} />);
    return(
      <div className=" bg-white flex  items-center justify-center ml-40 mt-10 w-[800px]">
        <div className={`w-[600px] h-[${(daysInMonth.length-1)*100+50}] mt-4`}>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-xl">
              {format(firstDayOfMonth, "MMMM yyyy")}
            </p>
            <div className="flex items-center justify-evenly gap-6 sm:gap-12">
              <ChevronLeftIcon
                className="w-6 h-6 cursor-pointer"
                onClick={getPrevMonth}
              />
              <ChevronRightIcon
                className="w-6 h-6 cursor-pointer"
                onClick={getNextMonth}
              />
            </div>
          </div>
          <hr className="my-6" />
          <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
            {days.map((day, idx) => {
              return (
                <div key={idx} className="font-semibold">
                  {day}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-7  mt-8 place-items-center">
            {daysInMonth.map((day, idx) => {
              return (
                <div key={idx} className={` w-20 h-20 p-2 m-2 ${colStartClasses[getDay(day)]}`}>
                  <button
                    className={`cursor-pointer flex items-center justify-center font-semibold h-8 w-8 rounded-full  hover:text-white ${
                      isSameMonth(day, today) ? "text-gray-900" : "text-gray-400"
                    } ${!isToday(day) && "hover:bg-blue-500"} ${
                      isToday(day) && "bg-red-500 text-white"
                    }`}
                    onClick={()=>{
                        setDate(day)
                        setView(!view)
                    }
                    }
                  >
                    {format(day, "d")}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
}
export default Calender;