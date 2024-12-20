export class TransactionsNotFoundError extends Error {
  constructor() {
    super(`Nenhuma transação encontrada.`);
  }
}
