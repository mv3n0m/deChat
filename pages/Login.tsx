import Image from "next/image"
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";


function Login() {
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { requestChallengeAsync } = useAuthRequestChallengeEvm();
    const dispatch = useDispatch()
    const [ web3Disabled, setWeb3Disabled ] = useState(false)

    useEffect(() => {
        if (!(window as any).ethereum?.providerMap?.get("MetaMask")) {
            setWeb3Disabled(true)
        }
    }, [])

    const handleAuth = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({
            connector: new MetaMaskConnector(),
        });

        const challengeResponse = await requestChallengeAsync({
            address: account,
            chainId: chain.id,
        });
        const { message } = challengeResponse!;
        const signature = await signMessageAsync({ message });

        if (signature) dispatch({ type: 'USER_AUTHENTICATED', isAuthenticated: true, account })
    };

    return (
        <>
            <div className="flex h-4/5 justify-center items-center z-50 absolute w-full">
                <div className="flex flex-col items-center space-y-8">
                    <Image alt="hero-img"
                        src="https://stock-images-mv3n0m.s3.amazonaws.com/DeChat-color.jpg"
                        width={250} height={250}
                        className="rounded-full"
                    />
                    <button onClick={ handleAuth } disabled={ web3Disabled }
                        className={ `font-semibold shadow-lg px-12 py-3 rounded-xl ${ web3Disabled ? "text-zinc-800 bg-zinc-400" : "text-indigo-950 bg-white animate-pulse" }` }
                    >
                        Login using Metamask
                    </button>
                </div>
            </div>

            <div className="absolute text-xs bottom-0 right-0 z-50 h-1/6 p-5 flex flex-col items-center sm:text-sm">
                <p className="text-white font-semibold animate-pulse mb-2">{ web3Disabled ? "No Metamask?" : "Try Web2!!!" }</p>
                <Image alt="arrow"
                    width={ 30 } height={ 30 }
                    src="/arrow.png"
                    className="animate-bounce"
                />
                <Image alt="arrow"
                    width={ 40 } height={ 40 }
                    src="/google.png"
                    className="animate-spin cursor-pointer hover:animate-none hover:scale-110"
                />
            </div>

            <div className="w-full h-screen">
                <Image alt="main-bg"
                    src="https://stock-images-mv3n0m.s3.amazonaws.com/WYAjt3T.jpeg"
                    fill
                    className="object-cover"
                />
            </div>
        </>
    )
}

export default Login