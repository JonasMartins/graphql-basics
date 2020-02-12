import { extratFragmentReplacements } from 'prisma-binding';
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import Post from './Post';
import User from './User';
import Comment from './Comment';

const resolvers = {
	Query,
	Mutation,
	Subscription,
	User,
	Post,
	Comment
};
// extratFragmentReplacements is a method that
// pass through all resolvers and get any framents defined
const fragments = extratFragmentReplacements(resolvers);

export { resolvers, fragments };
