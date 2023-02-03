import { ReactNode } from "react"
import Message from "./Message"


function Chats({ children, chatroom }: { children: ReactNode, chatroom: string }) {
    return (
        <div className="max-w-screen-2xl text-white mx-auto text-center absolute bottom-2">
            <Message />
        </div>
    )
}

export default Chats