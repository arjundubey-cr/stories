//@Params
//@Return {name: string, stories: string[]}
export async function getUserData() {
	// Fetch User Data
	const userResponse = await fetch(
		"https://randomuser.me/api/?inc=name,dob,picture&results=20&nat=us",
	);
	const data = await userResponse.json();
	data.results.forEach((user: any) => {
		const numberOfStories = (user.dob.age % 5) + 1;
		user.stories = Array.from(
			{ length: numberOfStories },
			(_, i) => `https://picsum.photos/id/${numberOfStories}${i}/1080/1350`,
		);
	});
	return data.results;
}