import { TransactionRepositoryInterface } from '@/repositories/transactions-repository-interface';
import { describe, expect, test, beforeEach } from 'vitest';
import { GetTransactionUseCase } from '../get-transactions';
import { InMemoryTransactionRepository } from '@/repositories/im-memory/in-memory-transactions-repository';
import { $Enums, User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { hash } from 'bcryptjs';

let transactionRepository: TransactionRepositoryInterface;
let sup: GetTransactionUseCase;

describe('Teste para obter daddos do transações.', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    sup = new GetTransactionUseCase(transactionRepository);
  });

  test('Deve ser possível resgatar transações pelo ID do usuário.', async () => {
    const user: User = {
      id: randomUUID(),
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    };

    const transaction = {
      description: 'Description',
      type: $Enums.TypeTransaction.INCOME,
      price: 20,
      category: 'Category',
      user: { connect: user },
    };

    await transactionRepository.create({ ...transaction });

    const transactions = await sup.execute({ userId: user.id });

    expect(transactions).toEqual({
      transactions: [expect.objectContaining({ userId: user.id })],
    });
  });
});
