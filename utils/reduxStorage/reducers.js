import { retrieveLocal, storeLocal, deleteLocal } from "../localStorage"


const usersReducer = ( state, action ) => {
    const { isAuthenticated, account } =  action

    switch (action.type) {
        case 'USER_AUTHENTICATED':
            isAuthenticated ? storeLocal("isAuthenticated", isAuthenticated) : deleteLocal("isAuthenticated")
            return { ...state, isAuthenticated: retrieveLocal("isAuthenticated"), account }

        default:
            return state || null
    }
}

export { usersReducer }
