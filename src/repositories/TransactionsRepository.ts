import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
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
    const findIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const findoutcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const totalIncome = findIncome.reduce((sum, valueIncome) => {
      return sum + valueIncome.value;
    }, 0);

    const totaloutcome = findoutcome.reduce((sum, valueIncome) => {
      return sum + valueIncome.value;
    }, 0);

    const totalBalance = totalIncome - totaloutcome;
    return { income: totalIncome, outcome: totaloutcome, total: totalBalance };
  }

  public create({ value, title, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
