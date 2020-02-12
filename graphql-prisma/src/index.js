import '@babel/polyfill';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import prisma from './prisma';
import { resolvers, fragments } from './resolvers/index';
const pubsub = new PubSub();

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context(req) {
		let obj = {
			db,
			pubsub,
			prisma,
			req
		};
		return obj;
	},
	fragments
});

server.start({ port: process.env.PORT || 4000 }, () => {
	console.log('Server is up');
});
