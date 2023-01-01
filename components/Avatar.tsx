import Image from "next/image"

type avatarProps = {
  text: string,
  size: number,
  className?: string,
  onClick?: () => void
}


function Avatar({ text, size, className, onClick }: avatarProps) {
  return (
    <Image alt="arrow"
      width={size} height={size}
      src={`https://api.dicebear.com/6.x/adventurer-neutral/png?seed=${text}`}
      className={ `rounded-full inline-block ${ className }` }
      onClick={onClick}
    />
  )
}

export default Avatar