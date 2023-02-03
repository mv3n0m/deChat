import Head from "next/head";
import Home from "./Home";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default () => {
    const { data: session } = useSession()
    const dispatch = useDispatch()

    useEffect(() => {
        if (session?.user) dispatch({ type: 'USER_AUTHENTICATED', account: (session?.user as any).id })
    }, [ session ])

    return (
        <div className="h-screen">
            <Head>
                <title>DeChat</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Home />
        </div>
    )
}