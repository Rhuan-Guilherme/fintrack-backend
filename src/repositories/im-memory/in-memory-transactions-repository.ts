import { Prisma, Transaction } from '@prisma/client';
import { TransactionRepositoryInterface } from '../transactions-repository-interface';
import { randomUUID } from 'crypto';

export class InMemoryTransactionRepository
  implements TransactionRepositoryInterface
{
  transactions: Transaction[] = [];

  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    const transactions = {
      id: randomUUID(),
      description: data.description,
      type: data.type,
      price: new Prisma.Decimal(data.price as number),
      category: data.category,
      userId: (data.user as { connect: { id: string } }).connect.id,
      created_at: new Date(),
    };

    this.transactions.push(transactions);

    return transactions;
  }
  async findAllTransactions(userId: String): Promise<Transaction[] | null> {
    const transactions = this.transactions.filter((transaction) => {
      transaction.id === userId;

      return transaction;
    });

    if (!transactions) {
      return null;
    }

    return transactions;
  }
}
