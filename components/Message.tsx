import Image from "next/image"
import { useRef, useState } from "react"


function Message() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [ message, setMessage ] = useState("")

    const handleSubmit = (event: any) => {
        event.preventDefault()
        inputRef.current?.focus()
        setMessage("")
    }

    return (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-screen lg:w-3/5 px-10">
            <form className="flex w-full bg-black rounded-full shadow-lg" onSubmit={ handleSubmit }>
                <input placeholder="Type here..." ref={ inputRef } value={ message } onChange={e => setMessage(e.target.value)}
                    className="grow rounded-full bg-black placeholder:text-zinc-50 font-semibold px-5 py-3 focus:outline-none"
                />
                <button type="submit" className="bg-white rounded-full p-3 border-2 border-fuchsia-500">
                    <Image alt="send"
                        src="/send.png"
                        height={20} width={20}
                    />
                </button>
            </form>
        </div>
    )
}

export default Message