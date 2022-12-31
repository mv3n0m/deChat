import { retrieveLocal, storeLocal, deleteLocal } from "../localStorage"


const usersReducer = ( state, action ) => {
    const { type, isAuthenticated } =  action
    delete action.type

    switch (type) {
        case 'USER_AUTHENTICATED':
            isAuthenticated ? storeLocal("isAuthenticated", isAuthenticated) : deleteLocal("isAuthenticated")
            return { ...state, isAuthenticated: retrieveLocal("isAuthenticated") }

        default:
            return state || null
    }
}

export { usersReducer }
