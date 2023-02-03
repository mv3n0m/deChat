import { Chats, Header, Avatar } from "@/components";
import { retrieveLocal } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";


function Home() {
    const dispatch = useDispatch()
    const avatarStyle = useSelector((state: any) => state.usersReducer?.avatarStyle) || "avataaars"
    const chatroom = useSelector((state: any) => state.usersReducer?.chatroom) || "general"
    const address = useSelector((state: any) => state.usersReducer?.account)
    const [authenticated, isAuthenticated] = useState(true)

    const components = [
        { Parent: Header, size: 20, className: "border-2 border-fuchsia-500" },
        { Parent: Chats, size: 12 }
    ]

    useEffect(() => {
        const account = retrieveLocal("isAuthenticated")
        dispatch({ type: 'USER_AUTHENTICATED', account })
        isAuthenticated(account || address)
    }, [ address ])

    const createComponentWithAvatar = ({ Parent, size, className }: { Parent: any, size: number, className?: string }) => (
        <Parent chatroom={chatroom} key={ size }>
            <div className={`w-${size} h-${size} bg-black relative shadow-lg rounded-full ${className}`}>
                <Avatar text={address} avatarStyle={avatarStyle} />
            </div>
        </Parent>
    )

    return (
        <>{
            authenticated ? (
                <div className="h-screen bg-gradient-to-b from-black to-fuchsia-500 ">
                    {components.map(component => createComponentWithAvatar(component))}
                </div>
            ) : ( <Login /> )
        }</>
    );
}

export default Home;