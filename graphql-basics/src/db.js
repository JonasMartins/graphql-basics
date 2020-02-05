const users = [
	{
		id: '1',
		name: 'Andrew',
		email: 'andrew@email.com',
		age: 27
	},
	{
		id: '2',
		name: 'Andrew2',
		email: 'andrew2@email.com',
		age: 27
	},
	{
		id: '3',
		name: 'Andrew3',
		email: 'andrew3@email.com',
		age: 27
	}
];

// demo posts
const posts = [
	{ id: '1', title: 'Post12', body: 'body1', published: true, author: '1' },
	{ id: '2', title: 'Post2', body: 'body2', published: null, author: '1' },
	{ id: '3', title: 'Post3', body: 'body3', published: true, author: '2' }
];

// demo comments
const comments = [
	{
		id: '100',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		author: '3',
		post: '1'
	},
	{
		id: '103',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		author: '1',
		post: '1'
	},
	{
		id: '122',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		author: '2',
		post: '2'
	},
	{
		id: '177',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		author: '1',
		post: '3'
	}
];

const db = {
	users,
	posts,
	comments
};

export { db as default };
