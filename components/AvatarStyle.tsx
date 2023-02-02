import { retrieveLocal } from "@/utils"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"


function AvatarStyle() {
    const dispatch = useDispatch()
    const [ defaultValue, setDefaultValue ] = useState("")

    useEffect(() => {
        setDefaultValue(retrieveLocal("avatarStyle", "avataaars"))
    }, [])

    const options = {
        "avataaars": "Avatar",
        "pixel-art": "Pixelize",
        "bottts": "Bot",
        "thumbs": "Thumb",
        "big-smile": "Grin",
        "avataaars-neutral": "Face",
        "adventurer-neutral": "Funk",
        "fun-emoji": "Emoji",
        "identicon": "Identicon"
    }

    const handleChange = (event: any) => {
        const avatarStyle = event.target.value
        setDefaultValue(avatarStyle)
        dispatch({ type: 'AVATAR_UPDATED', avatarStyle })
    }

    return (
        <select onChange={handleChange} value={ defaultValue }
            className="bg-black shadow shadow-fuchsia-300 rounded-full px-1 cursor-pointer focus:outline-none w-min"
        >
            {
                Object.entries(options).map(([k, v], idx) => (
                    <option value={k} key={idx}>{v}</option>
                ))
            }
        </select>
    )
}

export default AvatarStyle