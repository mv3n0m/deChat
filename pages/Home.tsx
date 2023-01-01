import { Header, Avatar } from "@/components";
import { useSelector } from "react-redux";


function Home() {
    const avatarStyle = useSelector((state: any) => state.usersReducer?.avatarStyle) || "avataaars"
    const chatroom = useSelector((state: any) => state.usersReducer?.chatroom) || "general"
    const address = useSelector((state: any) => state.usersReducer?.account)

    const avatar = <Avatar text={ address } avatarStyle={ avatarStyle }/>

    return (
        <div className="h-screen bg-gradient-to-b from-black to-fuchsia-500 ">
            <Header chatroom={ chatroom }>
                <div className="w-20 h-20 relative border-2 border-fuchsia-500 shadow-lg rounded-full">{ avatar }</div>
            </Header>
        </div>
    );
}

export default Home;