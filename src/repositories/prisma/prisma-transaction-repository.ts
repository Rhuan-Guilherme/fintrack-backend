import { Prisma, Transaction } from '@prisma/client';
import { TransactionRepositoryInterface } from '../transactions-repository-interface';
import { prisma } from '@/lib/prisma';

export class PrismaTransactionRepository
  implements TransactionRepositoryInterface
{
  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    const transaction = await prisma.transaction.create({ data });

    return transaction;
  }
  async findAllTransactions(userId: string, page: number, query?: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        ...(query && { description: { contains: query, mode: 'insensitive' } }),
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return transactions;
  }
}
