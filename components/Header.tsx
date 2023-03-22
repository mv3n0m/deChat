import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import AvatarStyle from "./AvatarStyle";
import ChatRoom from "./ChatRoom";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Avatar from "./Avatar";
import { retrieveLocal } from "@/utils";


function Header({ chatroom, username }: { chatroom: string, username: string }) {
    const _avatarStyle = useSelector((state: any) => state.usersReducer?.avatarStyle)
    const dispatch = useDispatch()
    const { push } = useRouter();
    const inputRef = useRef<HTMLInputElement>(null)
    const [hidden, hideSelf] = useState(false)
    const [editUserName, setEditUsername] = useState(false)
    const [uname, setUname] = useState(username)
    const [avatarStyle, setAvatarStyle] = useState("")

    useEffect(() => {
        setAvatarStyle(_avatarStyle || retrieveLocal("avatarStyle", "avataaars"))
    }, [ _avatarStyle ])

    useEffect(() => {
        editUserName ? inputRef?.current?.focus() : uname?.length && dispatch({ type: 'USERNAME_UPDATED', username: uname })
    }, [editUserName])

    const handleSignOut = async () => {
        const sigoutResponse = await signOut({ redirect: false, callbackUrl: "/Login" })
        if (sigoutResponse?.url) {
            push(sigoutResponse.url);
        }
    }

    return (
        <div className={`w-full relative text-white font-semibold max-w-screen-2xl mx-auto bg-black border-b-2 border-white rounded-b-md shadow-md ${hidden ? "h-10 py-2" : "py-5"}`}>
            <div className="px-5 flex md:px-20 gap-3">
                {hidden || (
                    <div className={`bg-black relative shadow-lg rounded-full w-20 h-20 border-2 border-fuchsia-500`}>
                        <Avatar text={username} avatarStyle={avatarStyle} />
                    </div>
                )}
                <div className="grow">
                    {
                        hidden || (
                            <div className="pb-5 w-full">
                                {
                                    editUserName ? (
                                        <form onSubmit={e => { e.preventDefault(); setEditUsername(false); }}
                                            className="shadow shadow-fuchsia-300 w-[60%] md:w-[30%] lg:w-[20%] inline-block"
                                        >
                                            <input placeholder={`Edit: ${username}`} onMouseLeave={() => setEditUsername(false)}
                                                onChange={e => setUname(e.target.value.trim())} ref={inputRef}
                                                className="bg-black text-fuchsia-500 focus:outline-none px-2 placeholder:italic placeholder:font-normal w-full"
                                            />
                                            <button hidden type="submit" />
                                        </form>
                                    ) : (
                                        <span onMouseEnter={() => username === "anon" && setEditUsername(true)} className="cursor-pointer">{username}</span>
                                    )
                                }
                                <button onClick={handleSignOut} className="float-right">Logout</button>
                            </div>
                        )
                    }
                    <div className="flex justify-between w-full">
                        <AvatarStyle />
                        <ChatRoom />
                    </div>
                </div>
            </div>
            <div className={ `absolute ${ username === "anon" ? "top-10 left-28 md:left-44" : " -bottom-8 left-1/2" } py-3 cursor-pointer animate-bounce` } onClick={() => username !== "anon" && hideSelf(!hidden)}>
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