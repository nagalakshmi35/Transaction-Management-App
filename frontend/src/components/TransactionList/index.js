import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class TransactionList extends Component {
  state = { allTransactionsList: [], isSuccessful: false };
  componentDidMount() {
    this.getAllTransactionsList();
  }

  getAllTransactionsList = async () => {
    const url = "http://localhost:5003/api/transactions/all";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! :  ${response.status}`);
    }

    try {
      const data = await response.json();

      const formatedData = data.map((eachItem) => ({
        transactionID: eachItem.transaction_id,
        amount: eachItem.amount,
        transactionType: eachItem.transaction_type,
        status: eachItem.status,
        user: eachItem.user,
        timestamps: eachItem.timestamps,
      }));

      if (formatedData.length > 0) {
        this.setState({
          allTransactionsList: formatedData,
          isSuccessful: true,
        });
      } else {
        this.setState({
          allTransactionsList: formatedData,
          isSuccessful: false,
        });
      }
      console.log(formatedData);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { allTransactionsList, isSuccessful } = this.state;
    return (
      <>
        <div className="container">
          <div className="row all-transactions-list">
            {isSuccessful ? (
              <div className="table-container">
                <h4 className="transaction-details">Transaction Details : </h4>
                <table className="transaction-table">
                  <thead>
                    <tr>
                      <th> Transaction ID</th>
                      <th> Amount</th>
                      <th> Transaction Type</th>
                      <th> Status</th>
                      <th> Created Time</th>
                      <th>User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTransactionsList.map((eachItem) => (
                      <tr key={eachItem.transactionID}>
                        <td>{eachItem.transactionID}</td>
                        <td>{eachItem.amount}</td>
                        <td>{eachItem.transactionType}</td>
                        <td>{eachItem.status}</td>
                        <td>{eachItem.timestamps}</td>
                        <td>{eachItem.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 col-12">
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
              </div>
            ) : (
              <div>
                <h4 className="no-transaction">
                  No Transactions Yet!
                </h4>
                <div className="mt-5 p-3">
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
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default TransactionList;
