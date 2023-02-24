import { useEffect, useRef, useState } from "react"
import Avatar from "./Avatar"
import Message from "./Message"

interface Users {
    [key: string] :{
        avatar_style: string;
        _avatar: JSX.Element
    }
}

function Chats({ chatroom, username }: { chatroom: string, username: string }) {
    const [ messages, setMessages ] = useState([])
    const [ currMsg, setCurrMsg ] = useState(null)
    const [ users, setUsers ] = useState<Users>({})
    const scrollableRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollableRef.current) {
            (scrollableRef.current as any).scrollTop = (scrollableRef.current as any).scrollHeight;
        }
    };

    function subscribe(uri: string) {
        var retryTime = 1;

        function connect(uri: string) {
            const events = new EventSource(uri);

            events.addEventListener("message", (ev) => {
                const msg = JSON.parse(ev.data);
                const { avatar_style, room } = msg;

                if (room !== chatroom) return
                delete msg[avatar_style];

                let avatar;
                const tempUsers: Users  = { ...users }
                if (!((tempUsers as any)?.username && (tempUsers as any)?.username?.avatar_style === avatar_style)) {
                    const _avatar: JSX.Element = (
                        <div className={`bg-black relative shadow-lg rounded-full w-10 h-10`}>
                            <Avatar avatarStyle={ avatar_style } text={ msg.username }/>
                        </div>
                    )
                    tempUsers[msg.username] = { avatar_style, _avatar }
                    setUsers(tempUsers)
                }
                avatar = tempUsers[msg.username]?._avatar
                setCurrMsg({ ...msg, avatar })
            });

            events.addEventListener("open", () => {
                console.log(`connected to event stream at ${uri}`);
                retryTime = 1;
            });

            events.addEventListener("error", () => {
                events.close();

                let timeout = retryTime;
                retryTime = Math.min(64, retryTime * 2);
                console.log(`connection lost. attempting to reconnect in ${timeout}s`);
                setTimeout(() => connect(uri), (() => timeout * 1000)());
            });
        }
        connect(uri);
    }

    useEffect(() => {
        subscribe(process.env.NEXT_PUBLIC_CHAT_BACKEND + "/events")
    }, [ chatroom, username ])

    useEffect(() => {
        if (currMsg) {
            setMessages([ ...messages, (currMsg as never)])
            setCurrMsg(null)
        }
        scrollToBottom()
    }, [ currMsg ])


    return (
        <div ref={ scrollableRef }
            className="w-screen lg:w-3/5 mx-auto max-w-screen-2xl text-zinc-800 grow h-full overflow-y-scroll no-scrollbar px-3 mt-5"
        >
            {
                messages?.map((msg: any, idx) => (
                    <Message key={ idx } msg={ msg } isYours={ msg.username === username } />
                ))
            }
        </div>
    )
}

export default Chats