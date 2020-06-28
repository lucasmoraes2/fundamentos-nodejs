import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactionsIncome: Transaction[] = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const totalBalanceIncome = transactionsIncome.reduce(
      (totalTransations, transaction) => totalTransations + transaction.value,
      0,
    );

    const transactionsOutcome: Transaction[] = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const totalBalanceOutcome = transactionsOutcome.reduce(
      (totalTransations, transaction) => totalTransations + transaction.value,
      0,
    );

    const totalBalance = totalBalanceIncome - totalBalanceOutcome;

    return {
      income: totalBalanceIncome,
      outcome: totalBalanceOutcome,
      total: totalBalance,
    };
  }

  public findByTitle(title: string): Transaction | null {
    const findTransaction = this.transactions.find(
      transaction => transaction.title === title,
    );

    return findTransaction || null;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
