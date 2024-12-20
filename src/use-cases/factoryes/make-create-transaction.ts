import { PrismaTransactionRepository } from '@/repositories/prisma/prisma-transaction-repository';
import { CreateTransactionUseCase } from '../create-transaction';

export function makeCreateTransactions() {
  const transactionRepository = new PrismaTransactionRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionRepository
  );

  return createTransactionUseCase;
}
