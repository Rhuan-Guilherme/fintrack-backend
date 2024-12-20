import { PrismaTransactionRepository } from '@/repositories/prisma/prisma-transaction-repository';
import { GetTransactionUseCase } from '../get-transactions';

export function makeGetTransactions() {
  const transactionRepository = new PrismaTransactionRepository();
  const getTransactionUseCase = new GetTransactionUseCase(
    transactionRepository
  );

  return getTransactionUseCase;
}
