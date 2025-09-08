import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as auth from './schema/auth';
import * as users from './schema/users';
import * as donations from './schema/donations';
import * as requests from './schema/requests';
import * as transactions from './schema/transactions';
import * as notifications from './schema/notifications';

const schema = {
    ...auth,
    ...users,
    ...donations,
    ...requests,
    ...transactions,
    ...notifications,
};

export const db = drizzle(process.env.DATABASE_URL!, { schema });