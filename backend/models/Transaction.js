const Transaction = `
  CREATE TABLE IF NOT EXISTS "Transaction" (
   transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
   amount FLOAT NOT NULL,
   transaction_type TEXT NOT NULL,
   status TEXT DEFAULT 'PENDING',
   user INTEGER NOT NULL,
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY(user) REFERENCES User(user_id)
  )`;

const createTransactionModel = async (db) => {
  try {
    await db.run(Transaction);
    console.log("Transaction Table initialized");
  } catch (error) {
    console.log("Transaction Table was not initialized", error);
  }
};

module.exports = { createTransactionModel };
