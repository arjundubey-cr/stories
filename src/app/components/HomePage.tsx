"use client";

import React, { useEffect, useState, useRef, Fragment } from "react";
import { getUserData } from "@/utils";
import StoryAvatar from "./Story/StoryAvatar";
import StoryViewer from "./Story/StoryViewer";

const Story = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [userData, setUserData] = useState<
		Array<{
			name: { title: string; first: string; last: string };
			stories: string[];
			picture: { thumbnail: string };
		}>
	>([]);
	const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null);
	const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
	const [viewStory, setViewStory] = useState<boolean>(false);
	const storyDuration = 5000; // 5 seconds
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const thumbnailContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		getUserData()
			.then((data) => setUserData(data))
			.finally(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		if (viewStory) {
			resetTimer();
			prefetchNextStoryImages(10); // Prefetch next 10 images
		}
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [currentStoryIndex, currentUserIndex, viewStory]);

	useEffect(() => {
		if (thumbnailContainerRef.current) {
			thumbnailContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
		}
	}, [userData]);

	const resetTimer = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			nextStory();
		}, storyDuration);
	};

	const nextStory = () => {
		if (userData) {
			const currentUser = userData[currentUserIndex!];
			if (currentStoryIndex < currentUser.stories.length - 1) {
				setCurrentStoryIndex((prevIndex) => prevIndex + 1);
			} else if (currentUserIndex! < userData.length - 1) {
				setCurrentUserIndex((prevIndex) => (prevIndex! + 1) % userData.length);
				setCurrentStoryIndex(0);
			} else {
				closeFullScreen();
			}
		}
	};

	const prevStory = () => {
		if (currentStoryIndex > 0) {
			setCurrentStoryIndex((prevIndex) => prevIndex - 1);
		} else if (currentUserIndex! > 0) {
			setCurrentUserIndex((prevIndex) => (prevIndex! - 1) % userData!.length);
			setCurrentStoryIndex(userData![currentUserIndex! - 1].stories.length - 1);
		}
	};

	const selectUserStory = (userIndex: number) => {
		setCurrentUserIndex(userIndex);
		setCurrentStoryIndex(0);
		setViewStory(true);
	};

	const closeFullScreen = () => {
		setViewStory(false);
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
	};

	const prefetchNextStoryImages = (count: number) => {
		if (userData) {
			const imagesToPrefetch = [];
			let currentIndex = currentStoryIndex;
			let userIndex = currentUserIndex!;

			for (let i = 0; i < count; i++) {
				currentIndex++;
				if (currentIndex >= userData[userIndex].stories.length) {
					currentIndex = 0;
					userIndex = (userIndex + 1) % userData.length;
				}
				imagesToPrefetch.push(userData[userIndex].stories[currentIndex]);
			}

			imagesToPrefetch.forEach((imageUrl) => {
				const img = new Image();
				img.src = imageUrl;
			});
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<div className="flex overflow-x-auto w-100" data-testid="avatars-list" ref={thumbnailContainerRef}>
				{userData &&
					userData.map((user, index) => (
						<Fragment key={user.name.first+index}>
							<StoryAvatar
							name={`${user.name.first}`}
							src={user.picture.thumbnail}
							onClick={() => selectUserStory(index)}
							/>
						</Fragment>
					))}
			</div>

			<div>
				{viewStory && (
					<StoryViewer
						currentStoryIndex={currentStoryIndex}
						userData={userData[currentUserIndex || 0]}
						storyDuration={storyDuration}
						closeFullScreen={closeFullScreen}
						prevStory={prevStory}
						nextStory={nextStory}
					/>
				)}
			</div>
		</div>
	);
};

export default Story;
