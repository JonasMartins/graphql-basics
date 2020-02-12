import getUserId from '../utils/getUserId';
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
	myPosts(parent, args, { prisma }, info) {
		const userId = getUserId(req);
		const opt = {
			where: {
				author: {
					id: userId
				}
			}
		};
		if (args.query) {
			opt.where.OR = [
				{
					title_contains: args.query
				},
				{
					body_contains: args.query
				}
			];
		}
		return prisma.query.Posts(opt, info);
	},
	posts(parent, args, { prisma }, info) {
		const opt = {
			where: {
				published: true
			}
		};
		if (args.query) {
			opt.where.OR = [
				{
					title_contains: args.query
				},
				{
					body_contains: args.query
				}
			];
		}
		return prisma.query.posts(null, info);
	},
	comments(parent, args, { prisma }, info) {
		return prisma.query.comments(null, info);
	},
	me(parent, args, { prisma, req }, info) {
		const userId = getUserId(req);
		return prisma.query.User({
			where: {
				id: userId
			}
		});
	},
	async post(parent, args, { prisma, req }, info) {
		const userId = getUserId(req, false);
		const posts = await prisma.query.Posts(
			{
				where: {
					id: args.id,
					OR: [
						{
							published: true
						},
						{
							author: {
								id: userId
							}
						}
					]
				}
			},
			info
		);
		if (posts.length === 0) throw new Error('Post not found');

		return posts[0];
	}
};

export { Query as default };
