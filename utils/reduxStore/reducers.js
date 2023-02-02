import { storeLocal } from "../localStore"


const usersReducer = ( state, action ) => {
    const { avatarStyle, chatroom, username } =  action

    switch (action.type) {
        case 'USERNAME_UPDATED':
            storeLocal("username", username)
            return { ...state, username }

        case 'AVATAR_UPDATED':
            storeLocal("avatarStyle", avatarStyle)
            return { ...state, avatarStyle }

        case 'CHATROOM_SELECTED':
            storeLocal("chatroom", chatroom)
            return { ...state, chatroom }

        default:
            return state || null
    }
}

export { usersReducer }
