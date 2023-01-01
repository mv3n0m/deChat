import { retrieveLocal, storeLocal, deleteLocal } from "../sessionStorage"


const usersReducer = ( state, action ) => {
    const { account } =  action

    switch (action.type) {
        case 'USER_AUTHENTICATED':
            account ? storeLocal("isAuthenticated", account) : deleteLocal("isAuthenticated")
            return { ...state, isAuthenticated: retrieveLocal("isAuthenticated") }

        default:
            return state || null
    }
}

export { usersReducer }
