import Image from 'next/image'

type AvatarProps = {
  role: 'user' | 'assistant'
}

const Avatar: React.FC<AvatarProps> = ({ role }) => {
  const src = role === 'user' 
    ? '/placeholder.svg?height=40&width=40' 
    : '/placeholder.svg?height=40&width=40'
  
  return (
    <div className="flex-shrink-0">
      <Image
        src={src}
        alt={role === 'user' ? 'Usuario' : 'Asistente'}
        width={40}
        height={40}
        className="rounded-full bg-gray-200 dark:bg-gray-700"
      />
    </div>
  )
}

export default Avatar

