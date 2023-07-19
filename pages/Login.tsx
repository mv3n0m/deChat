import Image from "next/image"
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { useEffect, useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";


function Login() {
    const { push } = useRouter();
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const { requestChallengeAsync } = useAuthRequestChallengeEvm();
    const { isConnected } = useAccount();
    const [ web3Disabled, setWeb3Disabled ] = useState(false)

    useEffect(() => {
        setWeb3Disabled(!(window as any).ethereum.isMetaMask)
    }, [])

    const handleMetamaskAuth = async () => {
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

        return { message, signature }
    }

    const handleAuth = async (authKey: string) => {
        let options = { redirect: false, callbackUrl: "/Home" }
        if (authKey === "moralis-auth") {
            let metamaskAuth;
            try {
                metamaskAuth = await handleMetamaskAuth()
            } catch(err: any) {
                const { code } = err
                return alert(code === 4001 ? err.message.split("\n")[0] : "Something went wrong.")
            }
            options = { ...options, ...metamaskAuth }
        }

        const signInResponse = await signIn(authKey, options)!;
        if (signInResponse?.url) {
            push(signInResponse.url);
        }
    };

    return (
        <>
            <div className="flex h-4/5 justify-center items-center z-50 absolute w-full">
                <div className="flex flex-col items-center space-y-8">
                    <Image alt="hero-img"
                        src="/logo.jpg"
                        width={250} height={250}
                        className="rounded-full"
                    />
                    <button onClick={() => handleAuth("moralis-auth")} disabled={ web3Disabled }
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
                    onClick={() => handleAuth("google")}
                />
            </div>

            <div className="w-full h-screen">
                <Image alt="main-bg"
                    src="/bgImage.jpeg"
                    fill
                    className="object-cover"
                />
            </div>
        </>
    )
}

export default Login