import Image from "next/image"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"


function MessageBox({ chatroom, username }: { chatroom: string, username: string }) {
    const avatarStyle = useSelector((state: any) => state.usersReducer?.avatarStyle) || "bottts"
    const inputRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState("")

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        inputRef.current?.focus()
        if (!message?.length) return

        const { status } = await fetch(process.env.NEXT_PUBLIC_CHAT_BACKEND + "/message", {
            method: "POST",
            body: new URLSearchParams({ room: chatroom, username, message, avatar_style: avatarStyle })
        })

        if (status !== 200) return alert("Unable to message.")
        setMessage("")
    }

    return (
        <div className="mx-auto w-screen lg:w-3/5 px-10 mb-28 sm:mb-5">
            <form className="flex w-full bg-black rounded-full shadow-lg" onSubmit={handleSubmit}>
                <input placeholder={ username === "anon" ? "\u21ea  Edit your username first!!!  \u21ea" : "Type here..." } ref={inputRef} value={message} onChange={e => setMessage(e.target.value)}
                    className="grow rounded-full bg-black placeholder:text-zinc-50 font-semibold px-5 py-3 focus:outline-none text-white"
                    disabled={ username === "anon" }
                />
                <button type="submit" className="bg-white rounded-full p-3 border-2 border-fuchsia-500" disabled={ username === "anon" }>
                    <Image alt="send"
                        src="/send.png"
                        height={20} width={20}
                    />
                </button>
            </form>
        </div>
    )
}

export default MessageBox