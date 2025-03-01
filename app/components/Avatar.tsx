import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
    src?: string | null | undefined,
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    if (src) {
        return (
            <Image 
                src={src}
                alt="Avatar"
                width={30}
                height={30}
                className="rounded-full"
            />
        );
    }
    return <FaUserCircle size={24} /> ;
}
 
export default Avatar;