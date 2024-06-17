import React, { useEffect, useRef, useState } from "react";

interface StoryAvatarProps {
  src: string;
  name: string;
  onClick?: () => void;
}

const StoryAvatar: React.FC<StoryAvatarProps> = ({ src, name, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Trigger loading slightly before the element is in view
      }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-1" onClick={onClick} data-testid="avatar">
      <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5 rounded-full">
        <a className="block bg-white p-0.5 rounded-full cursor-pointer">
          <img
            ref={imgRef}
            className={`rounded-full w-16 h-16 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            src={src}
            alt="Avatar"
          />
        </a>
      </div>
      <a className="cursor-pointer">
        <div className="text-xs text-center overflow-hidden text-ellipsis w-20">
          {name}
        </div>
      </a>
    </div>
  );
};

export default StoryAvatar;