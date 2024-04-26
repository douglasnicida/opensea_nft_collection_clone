import axios from "axios"
import { useEffect, useState } from "react"
import Button from "./Components/Button"

import {MdOutlineShoppingCart} from "react-icons/md";
import Searchbar from "./Components/Searchbar";

const Content = () => {
    const [data, setData] = useState([])
    const [data_aux, setDataAux] = useState([])

    useEffect(()=>{
        const getData = async () => {
            try{
                await axios.get("http://localhost:8080/collection/nfts").then((res) => {setDataAux(res.data.nfts); setData(res.data.nfts)})
            } catch(err) {
                console.log(err)
            }
        }

        getData("http://localhost:8080/collection/nfts")

    }, [])

    return ( 
        <div className="w-full py-6 px-20 h-max relative z-40 mt-5 bg-black">
            {/* Options */}
            <div className="w-full flex gap-x-4">
                <Button text="Items" addclass="bg-white/30 w-fit px-3 sm:px-6 text-[14px] md:text-[16px] lg:text-[17px]"/>
                <Button text="Offers" addclass="w-fit px-3 sm:px-6 text-[14px] md:text-[16px] lg:text-[17px]"/>
                <Button text="Analytics" addclass="w-fit px-3 sm:px-6 text-[14px] md:text-[16px] lg:text-[17px]"/>
                <Button text="Activity" addclass="w-fit px-3 sm:px-6 text-[14px] md:text-[16px] lg:text-[17px]"/>
                <Searchbar setData={setData} data={data_aux}/>
            </div>

            

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/20 my-9"></div>

            {/* Content */}
            <div className="grid grid-rows-auto grid-cols-3 lg:grid-cols-4 gap-4 text-white">
                {   
                    (data.length === 0) ? <p className="text-white text-center text-[18px]">No results found</p> :
                    data?.map((nft) => {
                        return(
                            <a href={nft.opensea_url} className="relative bg-gray-800 h-auto group overflow-hidden rounded-lg max-h-[450px] max-w-fit" key={nft.identifier}>
                                <div className="h-min overflow-hidden w-fit">
                                    <img src={nft.image_url} alt="" className="object-fit group-hover:scale-110 w-full max-h-[330px] trasition-all duration-300 ease-in-out"/>
                                </div>
                                <div className="w-full h-32 p-4 gap-2 flex flex-col justify-center">
                                    <div className="flex justify-center items-center">
                                        <h3 className="truncate w-auto max-w-[195px]">{nft.name}</h3>
                                        <span className="bg-gray-900 border-[1px] border-solid border-white border-opacity-30 h-fit rounded-md py-1 px-2">{`#${nft.identifier}`}</span>
                                    </div>
                                    <p className="flex justify-center items-center">0,00 ETH</p>
                                </div>

                                <div className="bg-blue-500 h-12 w-full absolute group-hover:bottom-0 -bottom-12 flex items-center px-3 transition-all duration-150 ease-in-out">
                                    <span className="w-full text-center">Buy Now</span>
                                    <div className="w-fit h-full flex items-center">
                                        <div className="bg-white/80 h-full w-[1px] mr-3"></div>
                                        <MdOutlineShoppingCart className="size-7"/>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
        </div>
     );
}
 
export default Content;