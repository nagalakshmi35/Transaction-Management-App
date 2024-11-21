const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const cors = require("cors");
const { createTransactionModel } = require("./models/Transaction");
const { createUserTable } = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://transaction-management-app-frontend.onrender.com"
}));

const PORT = process.env.PORT || "https://transaction-management-app-backend.onrender.com"; //PORT Number
const dbPath = path.join(__dirname, "transactions.db"); //database path

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database Initialised and Connected to transactions.db");
    await createUserTable(db); //creating createUserTable
    await createTransactionModel(db); //creating createTransactionModel

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`DB Error: ${error}`);
    process.exit(1);
  }
};

initializeDBAndServer();

//create new Transaction
app.post("/api/transactions", async (req, res) => {
  const { amount, transaction_type, user } = req.body;

  const createTransactionQuery = `
  INSERT INTO "Transaction" (amount, transaction_type, user) VALUES (?, ?, ?)
  `;
  try {
    const { lastID } = await db.run(createTransactionQuery, [
      amount,
      transaction_type,
      user,
    ]);

    const getDetails = `
    SELECT * FROM "Transaction" WHERE transaction_id = ${lastID}
    `;

    const result = await db.get(getDetails);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Failed to create Transaction" });
  }
});

//retrieve all transactions of specific user
app.get("/api/transactions", async (req, res) => {
  const { user_id } = req.query;

  const getAllTransactionsQuery = `
   SELECT * FROM "Transaction" WHERE user= ? ;
   `;

  console.log(user_id);
  try {
    const result = await db.all(getAllTransactionsQuery, [user_id]);
    console.log(result);
    res.status(200).json({ transactions: result });
  } catch (error) {
    res.status(500).json({ error: "Fetching All Transactions is Failed" });
  }
});

//update transaction status
app.put("/api/transactions/:transaction_id/", async (req, res) => {
  const { transaction_id } = req.params;
  const { status } = req.body;

  const updateTransactionQuery = `
   UPDATE "Transaction" SET status = ? WHERE transaction_id = ?; `;

  const getUpdateDetails = `SELECT * FROM "Transaction" WHERE transaction_id= ?;`;

  try {
    await db.run(updateTransactionQuery, [status, transaction_id]);

    const result = await db.get(getUpdateDetails, [transaction_id]);

    if (!result) {
      return res.status(404).json({
        error: "Transaction not found and transaction_id start from 6",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Fetching Transactions Failed" });
  }
});

//retrieving all transactions
app.get("/api/transactions/all", async (req, res) => {
  const getAllTransactions = `
   SELECT * FROM "Transaction" ;
   `;

  try {
    const resultArray = await db.all(getAllTransactions);
    res.status(200).json(resultArray);
  } catch (error) {
    res.status(500).json({ error: "Fetching All Transactions is Failed" });
  }
});

//retrieve specific transaction based on transaction_id
app.get("/api/transactions/:transaction_id/", async (req, res) => {
  const { transaction_id } = req.params;

  const getTransactionQuery = `SELECT * FROM "Transaction" WHERE transaction_id= ?;`;

  try {
    const result = await db.get(getTransactionQuery, [transaction_id]);

    if (!result) {
      return res.status(404).json({
        error: "Transaction not found and transaction_id start from 6",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Transaction Not Found" });
  }
});

//creating user details
app.post("/users", async (req, res) => {
  const { name } = req.body;

  const createUserQuery = `
  INSERT INTO "User" (name) VALUES(?)
  ;`;

  try {
    const { lastID } = await db.run(createUserQuery, name);

    const userDetails = `
    SELECT * FROM "User" WHERE user_id = ?
    ;`;

    const result = await db.get(userDetails, lastID);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Creating User Details are Failed" });
  }
});
