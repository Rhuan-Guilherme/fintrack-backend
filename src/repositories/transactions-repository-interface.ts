import { Prisma, Transaction } from '@prisma/client';

export interface TransactionRepositoryInterface {
  create(data: Prisma.TransactionCreateInput): Promise<Transaction>;
  findAllTransactions(
    userId: String,
    page?: number,
    query?: string | number | undefined
  ): Promise<Transaction[] | null>;
}
