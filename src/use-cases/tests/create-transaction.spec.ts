import { TransactionRepositoryInterface } from '@/repositories/transactions-repository-interface';
import { describe, expect, test, beforeEach } from 'vitest';
import { InMemoryTransactionRepository } from '@/repositories/im-memory/in-memory-transactions-repository';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { hash } from 'bcryptjs';
import { CreateTransactionUseCase } from '../create-transaction';

let transactionRepository: TransactionRepositoryInterface;
let sup: CreateTransactionUseCase;

describe('Teste para obter daddos do transações.', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    sup = new CreateTransactionUseCase(transactionRepository);
  });

  test('Deve ser possível resgatar criar uma transação.', async () => {
    const user: User = {
      id: randomUUID(),
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    };

    const { transaction } = await sup.execute({
      description: 'Description',
      type: 'INCOME',
      price: 20,
      category: 'Category',
      userId: user.id,
    });

    expect(transaction.userId).toEqual(user.id);
  });
});
