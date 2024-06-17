import React, { useEffect } from "react";
import "./styles.css";

interface StoryViewerProps {
  currentStoryIndex: number;
  userData: {
    name: { first: string; last: string };
    stories: string[];
    picture: { thumbnail: string };
  };
  storyDuration: number;
  closeFullScreen: () => void;
  prevStory: () => void;
  nextStory: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  currentStoryIndex,
  userData,
  storyDuration,
  closeFullScreen,
  prevStory,
  nextStory,
}) => {
  const imageContainerRef  = React.useRef<HTMLDivElement>(null);

  useEffect(()=>{
    let timer: NodeJS.Timeout;
    if(userData.name){
      //Add Animate user-change class and remove after 1 second
      imageContainerRef.current?.classList.add("animate-user-change");
      setTimeout(()=>{
        if(imageContainerRef.current){
          imageContainerRef.current.classList.remove("animate-user-change");
        }
      },1000)
    }
    return ()=>clearTimeout(timer);
  },[userData.name])
  return (
    <div className="story-container">
      <div className="h-full">
        <div className="progress-bars relative z-10 px-2">
          {userData.stories.map((story, index) => (
            <div className="progress-bar-container" key={index}>
              <div
                style={{ animationDuration: `${storyDuration / 1000}s` }}
                className={
                  index < currentStoryIndex
                    ? "progress-bar progress-bar-finished"
                    : index === currentStoryIndex
                    ? "progress-bar progress-bar-active"
                    : "progress-bar"
                }
              ></div>
            </div>
          ))}
        </div>
        <div className="relative z-10 flex items-center justify-between my-2 mx-2">
          <div className="flex items-center">
            <img
              src={userData.picture.thumbnail}
              className="h-10 w-10 rounded-full"
              alt="User Thumbnail"
            />
            <div className="ml-3">
              <div className="font-semibold text-white">{`${userData.name.first} ${userData.name.last}`}</div>
              <div className="text-xs text-gray-500">1h</div>
            </div>
          </div>
          <div className="relative z-10 text-white m-2">
            <button onClick={closeFullScreen}>X</button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center w-full h-full" ref={imageContainerRef}>
          <img
            src={userData.stories[currentStoryIndex]}
            className="max-w-100% h-full transform scale-100 transition-transform duration-500 ease-in-out mt-5"
            alt="Story"
          />
          <div className="absolute top-0 bottom-0 left-0 w-1/2 cursor-pointer" onClick={prevStory} />
          <div
            className="absolute top-0 bottom-0 right-0 w-1/2 cursor-pointer"
            onClick={nextStory}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
