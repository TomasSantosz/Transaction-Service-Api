import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Transaction type is invalid!');
    }
    const { total } = this.transactionsRepository.getBalance();

    if (value > total && type === 'outcome') {
      throw Error('Value not allowed!');
    }

    const repositorie = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return repositorie;
  }
}

export default CreateTransactionService;
