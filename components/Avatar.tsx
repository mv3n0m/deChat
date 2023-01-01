import Image from "next/image"


type avatarProps = {
  text: string,
  size?: number,
  className?: string,
  avatarStyle: string,
  onClick?: () => void
}

function Avatar({ text, size, className, avatarStyle, onClick }: avatarProps) {
  const props = size ? { width: size, height: size } : { fill: true }

  return (
    <Image alt="arrow"
      { ...props }
      src={`https://api.dicebear.com/6.x/${avatarStyle}/png?seed=${text}`}
      className={`rounded-full inline-block p-1 ${className}`}
      onClick={onClick}
    />
  )
}

export default Avatar