import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
	async deleteUser(parent, args, { prisma }, info) {
		return prisma.mutation.deleteUser(
			{
				where: {
					id: args.id
				}
			},
			info
		);
	},
	async updateUser(parent, args, { prisma }, info) {
		const updatedUser = await prisma.mutation.updateUser(
			{
				where: {
					id: args.id
				},
				data: args.data
			},
			info
		);
		return updatedUser;
	},
	createPost(parent, args, { prisma }, info) {
		return prisma.mutation.createPost(
			{
				data: {
					title: args.data.title,
					body: args.data.body,
					published: args.data.published,
					author: {
						connect: {
							id: args.data.author
						}
					}
				}
			},
			info
		);
	},
	deletePost(parent, args, { prisma }, info) {
		return prisma.mutation.deletePost(
			{
				where: {
					id: args.id
				}
			},
			info
		);
	},
	updatePost(parent, args, { prisma }, info) {
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
	createComment(parent, args, { prisma }, info) {
		return prisma.mutation.createComment(
			{
				data: {
					text: args.data.text,
					author: {
						connect: {
							id: args.data.author
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
	deleteComment(parent, args, { prisma }, info) {
		return prisma.mutation.deleteComment(
			{
				where: {
					id: args.id
				}
			},
			info
		);
	},
	updateComment(parent, args, { prisma }, info) {
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
