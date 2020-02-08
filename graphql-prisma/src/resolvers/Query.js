const Query = {
	users(parent, args, { prisma }, info) {
		const opt = {};
		if (args.query) {
			opt.where = {
				OR: [
					{
						name_contains: args.query
					},
					{
						email_contains: args.query
					}
				]
			};
		}
		return prisma.query.users(opt, info);
	},
	posts(parent, args, { prisma }, info) {
		const opt = {};
		if (args.query) {
			opt.where = {
				OR: [
					{
						title_contains: args.query
					},
					{
						body_contains: args.query
					}
				]
			};
		}
		return prisma.query.posts(null, info);
	},
	comments(parent, args, { prisma }, info) {
		return prisma.query.comments(null, info);
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
