import { useDispatch } from "react-redux";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import AvatarStyle from "./AvatarStyle";
import ChatRoom from "./ChatRoom";


function Header({ children, chatroom }: { children: ReactNode, chatroom: string }) {
    const dispatch = useDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
    const [hidden, hideSelf] = useState(false)
    const [editUserName, setEditUsername] = useState(false)
    const [username, setUserName] = useState(localStorage.getItem("uName") || Math.random().toString(36).substring(2, 9))

    const logout = async () => {
        dispatch({ type: 'USER_AUTHENTICATED' })
    }

    const updateUsername = (event: any) => {
        const uName = event.target.value.trim()
        localStorage.setItem("uName", uName)
        setUserName(uName)
    }

    useEffect(() => {
        editUserName && inputRef?.current?.focus()
    }, [editUserName])

    return (
        <div className={`relative text-white font-semibold max-w-screen-2xl mx-auto bg-black border-b-2 border-white rounded-b-md shadow-md ${hidden ? "h-10 py-2" : "py-5"}`}>
            <div className="px-5 flex md:px-20">
                {hidden || children}
                <div className="ml-5 grow">
                    {
                        hidden || (
                            <div className="pb-5">
                                {
                                    editUserName ? (
                                        <input placeholder={`Edit: ${username}`} onMouseLeave={() => setEditUsername(false)}
                                            onChange={ updateUsername } ref={inputRef}
                                            className="shadow shadow-fuchsia-300 bg-black text-fuchsia-500 focus:outline-none rounded-full px-3 placeholder:italic placeholder:font-normal"
                                        />
                                    ) : (
                                        <span onMouseEnter={() => setEditUsername(true)} className="cursor-pointer">{username}</span>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className="flex justify-between w-full">
                        <AvatarStyle />
                        <div className="flex gap-5">
                            <ChatRoom />
                            <button onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 py-3 cursor-pointer animate-bounce" onClick={() => hideSelf(!hidden)}>
                <Image alt="arrow"
                    src="/arrow.png"
                    height={30} width={30}
                    className={`${hidden || "scale-y-[-1]"}`}
                />
            </div>
        </div>
    )
}

export default Header