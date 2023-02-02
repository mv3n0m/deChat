import { useSession } from "next-auth/react"
import Image from "next/image"


type avatarProps = {
  text: string,
  size?: number,
  className?: string,
  avatarStyle: string,
  onClick?: () => void
}

function Avatar({ text, size, className, avatarStyle, onClick }: avatarProps) {
  const { data: session } = useSession()
  const props = size ? { width: size, height: size } : { fill: true }
  const avatarSeed = text === "anon" ? (session?.user as any)?.id : text

  return (
    <Image alt="arrow"
      { ...props }
      src={`https://api.dicebear.com/6.x/${avatarStyle || "thumbs"}/png?seed=${avatarSeed}`}
      className={`rounded-full inline-block p-1 ${className}`}
      onClick={onClick}
    />
  )
}

export default Avatar