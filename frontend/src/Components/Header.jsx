import { useEffect, useState } from 'react';

import {ReactComponent as Logo} from '../assets/OpenSea-Full-Logo(light).svg'

import { MdOutlineWallet, MdOutlineShoppingCart, MdOutlineSettings, MdOutlineMenu, MdClose } from "react-icons/md";
import { FaRegCircleUser, FaRegUser } from "react-icons/fa6";

import detectEthereumProvider from "@metamask/detect-provider";

import Button from './Button';
import { formatBalance } from '../utils/CurrencyFormat';
import Searchbar from './Searchbar';


// OTHER ITEMS
const DropdownItemsName = [
    {
        "name": "Drops",
        "subitems": ["Featured", "Learn More"]
    },

    {
        "name": "Stats",
        "subitems": ["Rankings", "Activities"]
    },

    {
        "name": "Create"
    }
]
const DropdownItems = ({name, subitems}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <li className='relative group' onMouseLeave={() => {setTimeout(setExpanded(false), 2000)}} onMouseEnter={() => {setExpanded(true)}}>
            <a href="/drops" className="cursor-pointer disabled:opacity-40 text-md leading-md font-semibold text-md text-white" aria-expanded={expanded}> {name} </a>

            {
                (subitems) ?

                <div className={`${(expanded) ? "visible opacity-100 top-6" : "opacity-0 top-4 invisible"}  absolute w-[220px] h-[128px] bg-zinc-900 rounded-md mt-1 p-4 transition-[opacity,top] duration-400 ease-linear`}
                onMouseEnter={() => {setExpanded(true)}}>
                    <ul className='flex flex-col w-full h-full justify-around text-white font-bold'>
                        {
                            subitems.map((subitem) => {
                                return(
                                    <li key={subitem} className='w-full h-full flex items-center hover:bg-zinc-800 rounded-md px-4'><a href="/featured">{subitem}</a></li>
                                )
                            }) 
                        }
                    </ul>
                </div>
                :
                ""
            }
            
        </li>
    )
}

// USER
const DropdownItemsNameUser = [
    {
        "name":<span className='font-bold text-[17px]'>Profile</span>,
        "icon": <FaRegUser className='size-5'/>
    },
    {
        "name":<span className='font-bold text-[17px]'>Settings</span>,
        "icon": <MdOutlineSettings className='size-5'/>
    }
]


const DropdownItemsUser = ({subitems, notStyled}) => {
    const [expanded, setExpanded] = useState(false);

    if(!notStyled){
        notStyled = false
    }

    return (

        <div className={`relative flex flex-row self-center w-auto h-[48px] text-white/90 ${(!notStyled) && "bg-white bg-opacity-10"} py-2 px-3 rounded-2xl gap-2 items-center hover:bg-opacity-[25%] cursor-pointer`}
        onMouseLeave={() => {setTimeout(setExpanded(false), 2000)}} onMouseEnter={() => {setExpanded(true)}}>
            <a href="/" className="cursor-pointer disabled:opacity-40 text-md leading-md font-semibold text-md text-white" aria-expanded={expanded}> 
                <FaRegCircleUser className='size-[22px]'/> 
            </a>
            
            {
                (subitems) ?

                <div className={`${(expanded) ? "visible opacity-100 top-12" : "opacity-0 top-4 invisible"} right-0 absolute w-[220px] h-[128px] bg-zinc-900 rounded-md mt-1 p-4 transition-[opacity,top] duration-400 ease-linear`}
                onMouseEnter={() => {setExpanded(true)}}>
                    <ul className='flex flex-col w-full h-full justify-around text-white font-bold'>
                        {
                            subitems.map((subitem) => {
                                return(
                                    <li key={subitem.name} className='w-full h-full flex items-center hover:bg-zinc-800 rounded-md px-4'>
                                        <a href="/" className='flex flex-row gap-5 items-center justify-center'>
                                            {subitem.icon}
                                            {subitem.name}
                                        </a>
                                    </li>
                                )
                            }) 
                        }
                    </ul>
                </div>
                :
                ""
            }
        </div>
    )
}


const Header = ({scroll}) => {

    const initialState = {accounts: [], balance: "", chainId: ""};
    const [wallet, setWallet] = useState(initialState)
    const [hasProvider, setHasProvider] = useState(null)

    const [isConnecting, setIsConnecting] = useState(false)

    const [menuClick, setMenuClick] = useState(false);

    useEffect(() => {
        const refreshAccounts = (accounts) => {
            (accounts.length > 0) ? updateWallet(accounts) : setWallet(initialState)
        }

        const getProvider = async () => {
            // Verifying if the user has the MetaMask extension installed
            if (typeof window.ethereum !== "undefined") {
                setHasProvider(true)
            }
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));

            if (provider) {                                    
                const accounts = await window.ethereum.request(  
                    { method: "eth_accounts" }                     
                );      

                // Getting Previous Accounts
                refreshAccounts(accounts);  

                window.ethereum.on("accountsChanged",refreshAccounts);                                               
                window.ethereum.on("chainChanged",refreshChainId);                                               
            } 
        }

        const refreshChainId = (chainId) => {
            setWallet((wallet) => ({...wallet, chainId}))
        }

        getProvider()

        return () => { window.ethereum?.removeListener("accountsChanged", refreshAccounts) }
        
    }, [])

    // Updating Wallet Accounts
    const updateWallet = async (accounts) => {
        const balance = formatBalance(await window.ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
        }))

        const chainId = await window.ethereum.request({
            method: "eth_chainId"
        })

        setWallet({ accounts, balance, chainId }); 
    }

    // Connecting MetaMask Wallet
    const handleConnect = async () => {
        // Start Connecting
        setIsConnecting(true)

        await window.ethereum?.request({
            method: "eth_requestAccounts"
        }).then((accounts) => {
            updateWallet(accounts)
        }).catch((err) => {
            console.log(err.message)
        })

        if(!window.ethereum) {console.log("Extension needed")}

    }

    const disableConnect = Boolean(wallet) && isConnecting

    return ( 
        <div className={`fixed flex flex-row h-[72px] w-full ${(scroll || menuClick) ? "bg-slate-900" : "bg-blue-900"} px-6 z-50`}>
            {/* LEFT */}
            <div className='relative flex flex-row w-auto mr-6 items-center'>
                {/* Logo */}
                <div className="flex flex-row w-auto">
                    <Logo width={150} height={60} className='cursor-pointer'/>
                </div>

                {/* Divider */}
                <div className="bg-white w-[1px] h-1/2 mx-8 opacity-50 lg:flex hidden"></div>

                {/* Option List */}
                <div className="w-full lg:flex hidden">
                    <ul className='flex flex-row items-center gap-8'>
                        {
                            DropdownItemsName.map((item) => {
                                if(item.name){
                                    return (
                                        <DropdownItems key={item.name} name={item.name} subitems={item.subitems} />
                                    )
                                } 

                                return <></>
                            })
                        }
                    </ul>
                </div>
            </div>

            {/* Search Bar / Search Icon */}
            <Searchbar readonly={true} />

            {/* RIGHT */}
            <div className="flex items-center w-full">
                <div className="lg:hidden flex flex-row h-full w-full justify-end gap-5 text-white/90 items-center ml-5">
                    {(window.ethereum?.isMetaMask && wallet.accounts.length < 1) && <MdOutlineWallet className='size-7 cursor-pointer' onClick={handleConnect} disabled={disableConnect}/>}
                    {wallet.accounts.length > 0 && <MdOutlineWallet className='size-7'/>}

                    {/* USER */}
                    <DropdownItemsUser subitems={DropdownItemsNameUser} notStyled={true}/>

                    <MdOutlineShoppingCart className='size-[22px]'/>

                    <div className="">
                        <Button icon={(!menuClick) ? <MdOutlineMenu className='size-7'/> : <MdClose className='size-7'/>} onClick = {() => {setMenuClick(!menuClick)}}/>

                        <div className={`${menuClick ? "flex" : "hidden"} w-full h-screen absolute right-0 top-[70px] bg-black py-9`}>
                            <ul className='w-full'>
                                {DropdownItemsName.map((item) => {
                                    return(
                                        <li key={item.name} className='w-full h-[50px] flex justify-center items-center text-[20px]'>
                                            <a href="/">{item.name}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    
                </div>

                <div className='hidden lg:flex flex-row h-full w-full gap-5 justify-end'>
                    {/* Currency / Wallet */}
                    {
                        (window.ethereum?.isMetaMask && wallet.accounts.length < 1) &&
                        <Button icon={<MdOutlineWallet className='size-7'/>} text={"Login"} onClick={handleConnect} disabled={disableConnect}/>
                    }
                    {wallet.accounts.length > 0 && <Button icon={<MdOutlineWallet className='size-7'/>} text={`${wallet.balance} ETH`} addclass="w-max"/>}

                    {/* USER */}
                    <DropdownItemsUser subitems={DropdownItemsNameUser}/>

                    {/* CART */}
                    <Button icon={<MdOutlineShoppingCart className='size-[22px]'/>}/>
                </div>
            </div>

        </div>
     );
}
 
export default Header;