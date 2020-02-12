import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId from '../utils/getUserId';

const Mutation = {
	async login(parent, args, { prisma }, info) {
		const user = await prisma.query.user({
			where: {
				email: args.data.email
			}
		});
		if (!user) throw new Error('Email or password error');

		const matchPassword = await bcrypt.compare(
			args.data.password,
			user.password
		);
		if (!matchPassword) throw new Error('Email or password error');

		return {
			user,
			token: jwt.sign({ userId: user.id }, 'secret')
		};
	},

	async createUser(parent, args, { prisma }, info) {
		// password length validation on front
		const password = await bcrypt.hash(args.data.password, 10);
		// password property has been overwritten
		const user = await prisma.mutation.createUser({
			data: {
				...args.data,
				password
			}
		});

		return {
			user,
			token: jwt.sign({ userId: user.id }, 'secret')
		};
	},
	async deleteUser(parent, args, { prisma, req }, info) {
		const userId = getUserId(req);
		return prisma.mutation.deleteUser(
			{
				where: {
					id: userId
				}
			},
			info
		);
	},
	async updateUser(parent, args, { prisma, req }, info) {
		const userId = getUserId(req);
		const updatedUser = await prisma.mutation.updateUser(
			{
				where: {
					id: userId
				},
				data: args.data
			},
			info
		);
		return updatedUser;
	},
	createPost(parent, args, { prisma, req }, info) {
		const userId = getUserId(req);

		return prisma.mutation.createPost(
			{
				data: {
					title: args.data.title,
					body: args.data.body,
					published: args.data.published,
					author: {
						connect: {
							id: userId
						}
					}
				}
			},
			info
		);
	},
	async deletePost(parent, args, { prisma, req }, info) {
		const userId = getUserId(req);
		const postOwner = await prisma.exists.Post({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!postOwner) throw new Error('Unable to delete Post');

		return prisma.mutation.deletePost(
			{
				where: {
					id: args.id
				}
			},
			info
		);
	},
	async updatePost(parent, args, { prisma, req }, info) {
		const userId = getUserId(req);
		const postPublished = await prisma.exists.Post({
			id: args.id,
			published: true
		});
		const postOwner = await prisma.exists.Post({
			id: args.id,
			author: {
				id: userId
			}
		});

		// delete all comments if a post is unpublished???
		if (postPublished && args.data.published === false) {
			await prisma.mutation.deleteManyComments({
				where: {
					posts: {
						id: args.id
					}
				}
			});
		}

		if (!postOwner) throw new Error('Unable to update Post');

		return prisma.mutation.updatePost(
			{
				where: {
					id: args.id
				},
				data: args.data
			},
			info
		);
	},
	async createComment(parent, args, { prisma, req }, info) {
		const userId = getUserId(req);
		const postPublished = await prisma.exists.Post({
			id: args.data.post,
			published: true
		});
		if (!postPublished) throw new Error('Unable to find post');

		return prisma.mutation.createComment(
			{
				data: {
					text: args.data.text,
					author: {
						connect: {
							id: userId
						}
					},
					post: {
						connect: {
							id: args.data.post
						}
					}
				}
			},
			info
		);
	},
	async deleteComment(parent, args, { prisma, req }, info) {
		const userId = getUserId(req);
		const commentOwner = await prisma.exists.Comment({
			id: args.id,
			author: {
				id: userId
			}
		});
		if (!commentOwner) throw new Error('Unable to delete Comment');

		return prisma.mutation.deleteComment(
			{
				where: {
					id: args.id
				}
			},
			info
		);
	},
	async updateComment(parent, args, { prisma, req }, info) {
		const userId = getUserId(req);
		const commentOwner = await prisma.exists.Comment({
			id: args.id,
			author: {
				id: userId
			}
		});
		if (!commentOwner) throw new Error('Unable to update Comment');
		return prisma.mutation.updateComment(
			{
				where: {
					id: args.id
				},
				data: args.data
			},
			info
		);
	}
};

export { Mutation as default };
