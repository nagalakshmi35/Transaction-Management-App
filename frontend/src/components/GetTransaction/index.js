import { Component } from "react";
import { Link } from "react-router-dom";
import "../CreateTransaction/index.css";
import "./index.css";

class GetTransaction extends Component {
  state = { transactionID: "", error: null, transactionData: null };

  onChangeTransactionID = (event) => {
    this.setState({ transactionID: parseInt(event.target.value), transactionData: null, error: null });
  };

  onSubmitGetTransaction = async (event) => {
    event.preventDefault();
    const { transactionID } = this.state;

    if (!transactionID) {
      this.setState({ error: "Transaction ID is required" });
      return;
    }

    try {
      const url = `http://localhost:5003/api/transactions/${transactionID}/`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error! ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      this.setState({ transactionData: data, error: null, transactionID: "" }); // Store data in state
    } catch (error) {
      this.setState({ error: error.message, transactionData: null, transactionID: "" });
    }
  };

  render() {
    const { transactionID, transactionData, error } = this.state;
    return (
      <div>
        <h5 className="get-transaction-heading text-center mt-4">
          Get Transaction Based On Transaction ID
        </h5>
        <form
          className="create-form-container"
          onSubmit={this.onSubmitGetTransaction}
        >
          <input
            placeholder="Transaction ID"
            className="input-ele mt-5"
            onChange={this.onChangeTransactionID}
            value={transactionID}
          />
          <br />
          <div className="mt-5">
            <button type="submit" className="create-btn mr-5">
              Get Transaction
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
        <div className="get-transaction-details col-12">
          {transactionData && (
            <div className="mt-5">
              <h3>Transaction Details:</h3>
              <p>Transaction ID: {transactionData.transaction_id}</p>
              <p>Amount: {transactionData.amount}</p>
              <p>Transaction Type: {transactionData.transaction_type}</p>
              <p>Status: {transactionData.status}</p>
              <p>User: {transactionData.user}</p>
              <p>Created At: {transactionData.timestamps}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GetTransaction;
