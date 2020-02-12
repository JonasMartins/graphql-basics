import { Prisma } from 'prisma-binding';
import { fragments } from './resolvers/index';
const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: '7530C5B82764D1D46DC60F57B210EE41DCFEDBAF258E5DED33213281F36DC946',
	fragmentReplacements: fragments
});
export { prisma as default };
