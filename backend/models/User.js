const User = `
CREATE TABLE IF NOT EXISTS User (
user_id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(200) NOT NULL
);`;

const createUserTable = async (db) => {
    try {
        await db.run(User)
        console.log('User Table Initialized') ;
    }catch(error) {
        console.log("Transaction Table was not initialized", error);
    }
}

module.exports = { createUserTable } ;