import axios from "axios";
import { useEffect, useState } from "react";

const SubHeader = () => {
    const [data, setData] = useState({})

    useEffect(()=>{
        const getData = async () => {
            try{
                await axios.get("http://localhost:8080/collection").then((res) => {setData(res.data)})
            } catch(err) {
                console.log(err)
            }
        }

        getData()
    }, [])

    const [detailsClick, setDetailsClick] = useState(false)

    

    return ( 
        <>
            <div className="relative flex flex-col text-white mt-[71px] h-auto w-full p-6 gap-y-6 bg-gradient-to-b from-blue-900 z-40">

                {/* COLLECTION LOGO */}
                <div className="">
                    <img src={data.image_url} alt="Collection Logo" className="size-24 rounded-md" />
                </div>

                {/* COLLECTION INFO */}
                <div className="flex justify-between text-white w-full">
                    <h2 className="font-bold text-[20px]">{data.name}</h2>

                    {/* INFO */}
                    <div className="">
                        
                    </div>
                </div>

            </div>

            <div className="flex flex-col w-full bg-black h-[77px] text-white p-6 text-[17px]">
                <div className={`flex ${(!detailsClick) ? "flex-col lg:flex-row gap-x-4 px-3 lg:px-0" : "flex-col"}`}>
                    <p className={`${(!detailsClick) && "truncate"} w-auto lg:w-[565px] h-full text-justify`}>{data.description}</p>
                    
                    {
                    (!detailsClick) ? <button className="text-white font-bold w-fit" onClick={() => {setDetailsClick(true)}}>See more</button> :
                    <button className="text-white font-bold w-fit" onClick={() => {setDetailsClick(false)}}>See less</button>
                    }
                </div>

                <div className="flex mt-2 gap-x-4 text-gray-400">
                    <h4>Items <span className="font-bold">{data.total_supply}</span></h4>
                    <span>·</span>
                    <h4>Created {data.created_date}</h4>
                </div>
            </div>
        </>
     );
}
 
export default SubHeader;