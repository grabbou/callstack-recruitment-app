export class RestClient {
	constructor() {
	}

	getPosts() {
		const identityPromises = [];
		let id = 1;

		for(let i = 0; i < 120; i++) {
			identityPromises.push(
				fetch('http://uinames.com/api/?ext')
				.then((response) => {
					return response.json();
				})
			);
		}


		return Promise.all(identityPromises)
		.then((identities) => {
			return Promise.resolve(
				identities.map((identity) => {
					return {
						id: id++,
						username: `${identity.name} ${identity.surname}`,
						postTitle: `I say: ${identity.region} is awesome!`,
						views: identity.age * 2,
						likes: identity.age,
						createdAt: new Date(identity.birthday.mdy)
					}
				})
			);
		});
	}
}