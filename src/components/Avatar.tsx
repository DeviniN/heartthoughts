interface AvatarProps {
  imgData?: string | null;
  emoji?: string;
  className: string;
  fallback?: string;
  alt?: string;
}

function Avatar({ imgData, emoji, className, fallback = "🌸", alt = "avatar" }: AvatarProps) {
  return <div className={className}>{imgData ? <img src={imgData} alt={alt} /> : <span>{emoji ?? fallback}</span>}</div>;
}

export default Avatar;
