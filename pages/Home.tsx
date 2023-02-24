import { Chats, Header, Avatar, MessageBox } from "@/components";
import { retrieveLocal } from "@/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function Home() {
    const _chatroom = useSelector((state: any) => state.usersReducer?.chatroom)
    const _username = useSelector((state: any) => state.usersReducer?.username)

    const [ chatroom, setChatroom ] = useState("")
    const [ username, setUsername ] = useState("")

    useEffect(() => {
        setChatroom(_chatroom || retrieveLocal("chatroom", "general"))
        setUsername(_username || retrieveLocal("username", "anon"))
    }, [ _username, _chatroom ])

    return (
        <div className="h-screen bg-gradient-to-b from-black to-fuchsia-500 flex flex-col">
            {
                [Header, Chats, MessageBox].map((Component, idx) => (
                    <Component chatroom={chatroom} username={username} key={idx} />
                ))
            }
        </div>
    );
}

export default Home;