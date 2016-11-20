export class RestClient {
	constructor() {
		this.storagePostsKey = 'posts';
	}

	getPosts() {
		if (localStorage.getItem(this.storagePostsKey)) {
			return Promise.resolve(
				JSON.parse(localStorage.getItem(this.storagePostsKey)).map((identity) => {
					identity.createdAt = new Date(identity.createdAt);
					return identity;
				})
			);
		}

		const identityPromises = [];
		let id = 1;

		for(let i = 0; i < 120; i++) {
			identityPromises.push(
				fetch('http://uinames.com/api/?region=poland&ext')
				.then((response) => {
					return response.json();
				})
			);
		}


		return Promise.all(identityPromises)
		.then((identities) => {
			identities = identities.map((identity) => {
				return {
					id: id++,
					username: `${identity.name} ${identity.surname}`,
					postTitle: `Send me a message to ${identity.email}`,
					views: identity.age * 2,
					likes: identity.age,
					createdAt: new Date(identity.birthday.mdy)
				}
			});
			localStorage.setItem(this.storagePostsKey, JSON.stringify(identities));
			return Promise.resolve(identities);
		});
	}

	insertPost(post) {
		const identities = [post].concat(JSON.parse(localStorage.getItem(this.storagePostsKey)));
		localStorage.setItem(this.storagePostsKey, JSON.stringify(identities));
	}
}