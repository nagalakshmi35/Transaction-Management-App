import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class GetUserTransactions extends Component {
  state = { userID: "", getTransactionData: null, error: null };

  onChangeUser = (event) => {
    this.setState({ userID: parseInt(event.target.value), getTransactionData: null, error: null });
  };

  onSubmitGetTransactions = async (event) => {
    event.preventDefault();

    const { userID } = this.state;

    if (!userID && isNaN(userID)) {
      alert("Please Enter a valid userID");
      return;
    }

    try {
      const url = `http://localhost:5003/api/transactions?user_id=${userID}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      if (data["transactions"].length === 0) {
        this.setState({ error: "No User Found" });
      } else {
        this.setState({
          getTransactionData: data["transactions"],
          error: null,
          userID: "",
        });
      }
    } catch (error) {
      console.log(`Getting User Transactions Failed: ${error}`);
      this.setState({
        error: error.message,
        getTransactionData: null,
        userID: "",
      });
    }
  };

  render() {
    const { userID, getTransactionData, error } = this.state;

    return (
      <div>
        <h5 className="get-transaction-heading text-center mt-4">
          Get Transactions Of Speicific User
        </h5>
        <form
          className="create-form-container"
          onSubmit={this.onSubmitGetTransactions}
        >
          <input
            placeholder="User ID"
            className="input-ele mt-5"
            onChange={this.onChangeUser}
            value={userID}
          />
          <br />
          <div className="mt-5">
            <button type="submit" className="create-btn mr-5">
              Get Transactions
            </button>

            <Link to="/">
              <button
                type="button"
                className="create-btn home-btn"
                onClick={this.onClickHomeBtn}
              >
                Home
              </button>
            </Link>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}

        {getTransactionData && getTransactionData.length > 0 ? (
          <div className="get-transaction-details col-12">
            <div className="mt-5">
              <h3>Transaction Details:</h3>
              {getTransactionData.map((transaction, index) => (
                <div key={transaction.transaction_id} className="mt-3">
                  <h4 className="transaction-details-heading">
                    Transaction {index + 1}:
                  </h4>
                  <p>Transaction ID: {transaction.transaction_id}</p>
                  <p>Amount: {transaction.amount}</p>
                  <p>Transaction Type: {transaction.transaction_type}</p>
                  <p>Status: {transaction.status}</p>
                  <p>User: {transaction.user}</p>
                  <p>Created At: {transaction.timestamps}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          null
        )}
      </div>
    );
  }
}

export default GetUserTransactions;
