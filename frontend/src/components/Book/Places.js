const Places = ()=>{
    return(
        <div className="items-center">
            <div className="flex justify-between p-12 m-12">
            <button className="m-8 p-6 h-24 w-40 bg-[url('https://assets.telegraphindia.com/telegraph/2023/Nov/1701074133_hyderabad.jpg')] bg-no-repeat bg-cover bg-center">Hyderabad</button>
            <button className="p-6 m-8  h-24 w-40">Bangalore</button>
            </div>
            <div className="flex p-12">
            <button className="p-6 m-8">Mumbai</button>
            <button className="p-6 m-8">Delhi</button>
            </div>
        </div>
    );
}
export default Places;