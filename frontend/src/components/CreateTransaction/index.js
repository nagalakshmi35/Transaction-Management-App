import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class CreateTransaction extends Component {
  state = {
    amount: "",
    userID: "",
    transactionType: "DEPOSIT",
    transactionsList: [],
    isSuccessful: false,
  };

  onChangeAmount = (event) => {
    this.setState({ amount: event.target.value, isSuccessful: false });
  };

  onChangeUser = (event) => {
    this.setState({ userID: event.target.value, isSuccessful: false });
  };

  onChangeTransType = (event) => {
    this.setState({ transactionType: event.target.value, isSuccessful: false });
  };

  onClickSubmitBtn = async (event) => {
    const { amount, userID, transactionType } = this.state;
    event.preventDefault();
    const formData = {
      amount: parseInt(amount),
      transaction_type: transactionType,
      user: parseInt(userID),
    };

    const response = await fetch("https://transaction-management-app-backend.onrender.com/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Parse the response body
    this.setState((prevState) => ({
      transactionsList: [prevState.transactionsList, data],
      isSuccessful: true,
      amount: "",
      transactionType: "DEPOSIT",
      userID: "",
    }));
  };

  render() {
    const { amount, userID, isSuccessful, transactionType } = this.state;
    return (
      <>
        <div className="col-12">
          <form
            className="create-form-container"
            onSubmit={this.onClickSubmitBtn}
          >
            <input
              placeholder="amount eg 1500.00"
              className="input-ele mt-3"
              type="TEXT"
              onChange={this.onChangeAmount}
              value={amount}
            />
            <br />
            <select
              type="drop-down"
              className="input-ele mt-3"
              onChange={this.onChangeTransType}
              value={transactionType}
            >
              <option value="DEPOSIT">DEPOSIT</option>
              <option value="WITHDRAWL">WITHDRAWL</option>
            </select>
            <br />
            <input
              type="TEXT"
              placeholder="user ID"
              className="input-ele mt-3"
              onChange={this.onChangeUser}
              value={userID}
            />
            <br />
            <div className="mt-4">
              <button type="submit" className="create-btn mr-4">
                Create Transaction
              </button>

              <Link to="/">
                <button
                  type="button"
                  className="create-btn home-btn mt-3"
                  onClick={this.onClickHomeBtn}
                >
                  Home
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="col-12">
          <div className="align mt-3">
            {isSuccessful && (
              <div className="align">
                <div className="message-con">
                  <p className="message">Transaction Created Successfully!</p>
                  <i
                    className="fa-solid fa-square-check icon-ele"
                    style={{ color: "#0f8a34" }}
                  ></i>
                </div>
                <Link to="/api/transactions/all">
                <button
                  type="button"
                  className="create-btn home-btn mt-3"
                  onClick={this.onClickHomeBtn}
                >
                  Check Here
                </button>
              </Link>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default CreateTransaction;
