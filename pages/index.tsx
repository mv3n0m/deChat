import Head from "next/head";
import Login from "./Login";
import Home from "./Home";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { retrieveLocal } from "@/utils";


export default () => {
    const address = useSelector((state: any) => state.usersReducer?.account)
    const [ authenticated, isAuthenticated ] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const account = retrieveLocal("isAuthenticated")
        dispatch({ type: 'USER_AUTHENTICATED', account })
        isAuthenticated(account || address)
    }, [ address ])

    return (
        <div className="h-screen">
            <Head>
                <title>DeChat</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            { authenticated ? <Home /> : <Login  /> }
        </div>
    )
}