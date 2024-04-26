import { VscSearch } from "react-icons/vsc";

const Searchbar = ({data,setData}) => {
    const handleSearch = (e) => {
        if (e.target.value === "") return setData(data)

        const filteredData = data.filter(nft => nft.name.includes(e.target.value))
        setData(filteredData)
    }

    return ( 
        <>
            <div className="w-full flex items-center justify-end lg:hidden">
                <VscSearch className='rotate-[270deg] size-6 text-white flex'/>
            </div>
            <div className="hidden lg:flex self-center justify-between min-w-[280px] w-full max-w-[590px] h-[48px] bg-white bg-opacity-10 p-2 rounded-2xl mx-[8%] hover:bg-opacity-[25%] focus-within:border-[1px] focus-within:border-solid border-white/40 transition-all duration-150 ease-in-out">
                <div className="flex items-center h-full px-2 gap-3">
                    <VscSearch className='rotate-[270deg] size-5 text-white'/>
                    <input type="text" name="" id="search" placeholder='Search' className='bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none'
                    onChange={handleSearch}/>
                </div>

                <div className="flex flex-row self-center size-7 text-white/90 bg-white bg-opacity-10 rounded-lg gap-2 items-center justify-center hover:bg-opacity-[25%]">
                        <span>/</span>
                </div>
            </div>
        </>
     );
}
 
export default Searchbar;