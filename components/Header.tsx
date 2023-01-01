import { useSelector } from "react-redux"
import Avatar from "./Avatar"
import { useDispatch } from "react-redux";
import { useDisconnect } from "wagmi";
import Image from "next/image";
import { useState } from "react";


function Header() {
    const address = useSelector((state: any) => state.usersReducer?.account)
    const dispatch = useDispatch()
    const { disconnectAsync } = useDisconnect()
    const [ hidden, hideSelf ] = useState(false)

    const logout = async () => {
        dispatch({ type: 'USER_AUTHENTICATED' })
        await disconnectAsync()
    }


    return (
        <div className={ `relative text-fuchsia-400 font-semibold max-w-screen-2xl mx-auto bg-black border-b-2 border-white rounded-b-md shadow-md px-20 flex justify-between items-baseline ${ hidden ? "h-10 py-2" : "py-5" }` }>
            <div className="flex gap-5">
                { hidden || <Avatar text={address} size={80} className="border-4 border-white" /> }
                <div className="flex flex-col justify-between">
                    { hidden || <p>Edit username</p> }
                    <div>Vibe</div>
                </div>
            </div>
            <div><button onClick={logout}>Logout</button></div>
            <div className="absolute -bottom-8 right-1/2 animate-bounce transform p-3 cursor-pointer" onClick={()  => hideSelf(!hidden)}>
                <Image alt="arrow"
                    src="/arrow.png"
                    height={30} width={30}
                    className={ `${ hidden || "scale-y-[-1]" }` }
                />
            </div>
        </div>
    )
}

export default Header