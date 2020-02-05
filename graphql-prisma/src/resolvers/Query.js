const Query = {
	users(parent, args, { db }, info) {
		if (!args.query) {
			return db.users;
		}
		return db.users.filter(user => {
			return user.name
				.toLocaleLowerCase()
				.includes(args.query.toLocaleLowerCase());
		});
	},
	posts(parent, args, { db }, info) {
		if (!args.query) {
			return db.posts;
		}
		return db.posts.filter(post => {
			const isBodyMatch = post.body
				.toLocaleLowerCase()
				.includes(args.query.toLocaleLowerCase());

			const isTitleMatch = post.title
				.toLocaleLowerCase()
				.includes(args.query.toLocaleLowerCase());

			return isBodyMatch || isTitleMatch;
		});
	},
	comments(parent, args, { db }, info) {
		return db.comments;
	},
	me() {
		return {
			id: 'wwefwefweffwe',
			name: 'test',
			email: 'okokokok',
			age: 34
		};
	},
	post() {
		return {
			id: '123',
			title: 'graphql',
			body: '',
			published: false
		};
	}
};

export { Query as default };
