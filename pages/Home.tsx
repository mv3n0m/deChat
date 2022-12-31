import { useDispatch } from "react-redux";
import { useDisconnect } from "wagmi";


function User() {
    const dispatch = useDispatch()
    const { disconnectAsync } = useDisconnect()

    const logout = async () => {
        dispatch({ type: 'USER_AUTHENTICATED' })
        await disconnectAsync()
    }

    return (
        <div>
            <button onClick={ logout }>Logout</button>
        </div>
    );
}

export default User;