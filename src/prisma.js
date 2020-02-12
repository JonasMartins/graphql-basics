import { Prisma } from 'prisma-binding';
import { fragments } from './resolvers/index';
const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: process.env.PRISMA_SECRET,
	fragmentReplacements: fragments
});
export { prisma as default };
