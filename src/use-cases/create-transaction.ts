import { TransactionRepositoryInterface } from '@/repositories/transactions-repository-interface';
import { Transaction } from '@prisma/client';
import { TransactionsNotFoundError } from './errors/transactions-not-found-error';

interface CreateTransactionRequest {
  userId: string;
  description: string;
  price: number;
  category: string;
  type: 'INCOME' | 'OUTCOME';
}

interface CreateTransactionResponse {
  transaction: Transaction;
}

export class CreateTransactionUseCase {
  constructor(private transactionRepository: TransactionRepositoryInterface) {}

  async execute({
    userId,
    category,
    description,
    price,
    type,
  }: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const transaction = await this.transactionRepository.create({
      category,
      price,
      description,
      type,
      user: { connect: { id: userId } },
    });

    if (!transaction) {
      throw new TransactionsNotFoundError();
    }

    return {
      transaction,
    };
  }
}
