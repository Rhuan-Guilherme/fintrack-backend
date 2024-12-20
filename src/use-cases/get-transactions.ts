import { TransactionRepositoryInterface } from '@/repositories/transactions-repository-interface';
import { Transaction } from '@prisma/client';
import { TransactionsNotFoundError } from './errors/transactions-not-found-error';

interface GetTransactionRequest {
  userId: string;
  page?: number;
  query?: string | number | undefined;
}

interface GetTransactionResponse {
  transactions: Transaction[] | null;
}

export class GetTransactionUseCase {
  constructor(private transactionRepository: TransactionRepositoryInterface) {}

  async execute({
    userId,
    page = 1,
    query,
  }: GetTransactionRequest): Promise<GetTransactionResponse> {
    const transactions = await this.transactionRepository.findAllTransactions(
      userId,
      page,
      query
    );

    if (!transactions) {
      throw new TransactionsNotFoundError();
    }

    return {
      transactions,
    };
  }
}
