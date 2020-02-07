import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://192.168.99.100:4466'
});
/*
prisma.query.users(null, '{id name email posts {id title} }').then(data => {
	console.log(JSON.stringify(data, undefined, 4));
});


const createPostForUser = async (authorId, data) => {
	const userExists = await prisma.exists.User({
		id: authorId
	});
	if (!userExists) {
		throw new Error('User not Found');
	}
	const post = await prisma.mutation.createPost(
		{
			data: {
				...data,
				author: {
					connect: {
						id: authorId
					}
				}
			}
		},
		'{ author { id name email posts{id title published} } }'
	);
	return post.author;
};

// createPostForUser('cjjucl3yu004x0822dq5tipuz', {
//     title: 'Great books to read',
//     body: 'The War of Art',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch(error =>{console.log(Error)})

const updatePostForUser = async (postId, data) => {
	const postExists = await prisma.exists.Post({
		id: postId
	});

	if (!postExists) {
		throw new Error('Post not Found');
	}
	const post = await prisma.mutation.updatePost(
		{
			where: {
				id: postId
			},
			data
		},
		'{ author { id name email posts {id title published} } }'
	);
	return post.author;
};

// updatePostForUser("cjjzwjkez009p0822fbvn6lui", { published: false }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch(error => {console.log(error.message)})
*/

export { prisma as default };
