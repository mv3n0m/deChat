import { retrieveLocal, storeLocal, deleteLocal } from "../sessionStorage"


const usersReducer = ( state, action ) => {
    const { account, avatarStyle, chatroom } =  action

    switch (action.type) {
        case 'USER_AUTHENTICATED':
            account ? storeLocal("isAuthenticated", account) : deleteLocal("isAuthenticated")
            return { ...state, account: retrieveLocal("isAuthenticated") }

        case 'AVATAR_UPDATED':
            return { ...state, avatarStyle }

        case 'CHATROOM_SELECTED':
            return { ...state, chatroom }

        default:
            return state || null
    }
}

export { usersReducer }
