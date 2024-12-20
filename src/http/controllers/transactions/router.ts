import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/jwt-verify';
import { getTransactions } from './get-transactions';
import { createTransaction } from './create-transaction';

export async function TransactionsRoutes(app: FastifyInstance) {
  app.get('/transactions/:page', { onRequest: [verifyJWT] }, getTransactions);
  app.post(
    '/transactions/create',
    { onRequest: [verifyJWT] },
    createTransaction
  );
}
