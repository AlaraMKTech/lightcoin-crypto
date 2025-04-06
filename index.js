class Account {
  
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => total + transaction.value, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
``
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  get value() {
    return this.amount;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }

  isAllowed() {
    return true;
  }
}

class Deposit extends Transaction {
  commit() {
    super.commit();
    this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  isAllowed() {
    return this.account.balance >= this.amount;
  }

  commit() {
    if (super.commit()) {
      this.account.balance -= this.value;
    }
  }
}

// Testing the implementation

// Creating an account for a user
const myAccount = new Account("snow-patrol");

console.log("Account Balance (initial):", myAccount.balance);

// Performing deposits and withdrawals
const t1 = new Deposit(120.00, myAccount);
t1.commit();
console.log("Transaction 1:", t1);
console.log("Account Balance:", myAccount.balance);

const t2 = new Withdrawal(50.25, myAccount);
t2.commit();
console.log("Transaction 2:", t2);
console.log("Account Balance:", myAccount.balance);

const t3 = new Withdrawal(9.99, myAccount);
t3.commit();
console.log("Transaction 3:", t3);
console.log("Account Balance:", myAccount.balance);

// Testing withdrawal validation
const t4 = new Withdrawal(1000.00, myAccount);
const success = t4.commit();
console.log("Transaction 4 (attempted withdrawal of $1000):", success ? t4 : "Failed - Insufficient funds");
console.log("Account Balance:", myAccount.balance);

// Displaying all transactions
console.log("Transaction History:");
myAccount.transactions.forEach((transaction, index) => {
  console.log(`Transaction ${index + 1}:`, transaction);
});




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

t1 = new Withdrawal(50.25);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99);
t2.commit();
console.log('Transaction 2:', t2);

console.log('Balance:', balance);
