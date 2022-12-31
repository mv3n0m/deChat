import Head from "next/head";
import Login from "./Login";
import Home from "./Home";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { retrieveLocal } from "@/utils";


export default () => {
    const _authenticated = useSelector((state: any) => state.usersReducer?.isAuthenticated)
    const [ authenticated, isAuthenticated ] = useState(true)

    useEffect(() => {
        isAuthenticated(retrieveLocal("isAuthenticated") || _authenticated)
    }, [ _authenticated ])

    return (
        <div>
            <Head>
                <title>DeChat</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            { authenticated ? <Home /> : <Login  /> }
        </div>
    )
}