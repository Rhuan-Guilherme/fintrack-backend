import { TransactionsNotFoundError } from '@/use-cases/errors/transactions-not-found-error';
import { makeCreateTransactions } from '@/use-cases/factoryes/make-create-transaction';

import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createTransaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const transactionSchema = z.object({
    category: z.string(),
    type: z.enum(['INCOME', 'OUTCOME']),
    price: z.coerce.number(),
    description: z.string(),
  });

  const { category, description, price, type } = transactionSchema.parse(
    request.body
  );

  try {
    const createTransaction = makeCreateTransactions();
    const { transaction } = await createTransaction.execute({
      category,
      description,
      price,
      type,
      userId: request.user.sub,
    });

    return reply
      .status(201)
      .send({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    if (error instanceof TransactionsNotFoundError) {
      return reply.status(401).send({ message: error.message });
    }

    return reply.status(500).send({
      message: 'Erro ao processar a solicitação. Tente novamente mais tarde.',
    });
  }
}
