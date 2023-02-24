import Head from "next/head";
import Home from "./Home";
import Login from "./Login";
import { useSession } from "next-auth/react";


export default () => {
    const { data: session } = useSession()

    return (
        <div className="h-screen">
            <Head>
                <title>DeChat</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            { session?.user ? <Home /> : <Login /> }
        </div>
    )
}