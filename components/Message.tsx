type messageProps = {
    msg: any,
    isYours: boolean
}

function Message({ msg, isYours }: messageProps) {
    const { username, message, avatar } = msg

    return (
        <div className={`flex my-2 ${ isYours && "justify-end"}`}>
            <div className={`flex ${ isYours || "flex-row-reverse"} items-center gap-3`}>
                <span className="bg-white px-5 font-medium py-1 rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm">
                    { message }
                </span>
                <span className="text-center">
                    { avatar }
                    { !isYours && <p className="text-white italic text-xs">{ username }</p>}
                </span>
            </div>
        </div>
    )
}

export default Message