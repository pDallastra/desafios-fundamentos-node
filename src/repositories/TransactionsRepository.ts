import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all() {
    const balance = this.getBalance();

    const value = {
      transactions: this.transactions,
      balance,
    };

    return value;
  }

  public getBalance(): Balance {
    let totalIncome = 0;
    let totalOutcome = 0;

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.value;
      } else if (transaction.type === 'outcome') {
        totalOutcome += transaction.value;
      }
    });
    const total = totalIncome - totalOutcome;
    const balance = { income: totalIncome, outcome: totalOutcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionsDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
