import { useDispatch } from "react-redux"


function ChatRoom() {
    const dispatch = useDispatch()

    const options = {
        "general": "General",
        "room1": "Room 1",
        "room2": "Room 2"
    }

    const handleChange = (event: any) => {
        const chatroom = event.target.value
        dispatch({ type: 'CHATROOM_SELECTED', chatroom })
    }

    return (
        <select onChange={handleChange} defaultValue="0"
            className="bg-black shadow shadow-fuchsia-300 rounded-full px-1 cursor-pointer focus:outline-none w-min pr-3"
        >
            <option value="0" disabled>Chatroom</option>
            {
                Object.entries(options).map(([k, v], idx) => (
                    <option value={k} key={idx}>{v}</option>
                ))
            }
        </select>
    )
}

export default ChatRoom