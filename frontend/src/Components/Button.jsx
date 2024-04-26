const Button = (props) => {
    return ( 
        <div className={`flex flex-row self-center w-auto text-[17px] h-[48px] text-white/90 bg-white bg-opacity-10 py-2 px-3 rounded-2xl gap-2 items-center hover:bg-opacity-[25%] cursor-pointer ${props.addclass}`} {...props}>
            {props.icon}

            {(props.text) ? <span className='font-bold'>{props.text}</span> : ""}

        </div>
     );
}
 
export default Button;