import { Component } from "react";
import { Link } from "react-router-dom";
import "../CreateTransaction/index.css";

class UpdateTransaction extends Component {
  state = {
    isSuccessful: false,
    changeStatus: "PENDING",
    isUpdateSuccessful: false,
    transactionID: "",
  };

  onChangeTransID = (event) => {
    this.setState({
      transactionID: parseInt(event.target.value),
      isUpdateSuccessful: false,
    });
  };

  onChangeStatus = (event) => {
    this.setState({
      changeStatus: event.target.value,
      isUpdateSuccessful: false,
    });
  };

  onSubmitBtn = async (event) => {
    event.preventDefault();
    const { changeStatus, transactionID } = this.state;

    if (!transactionID || isNaN(transactionID)) {
      alert("Please enter a valid Transaction ID.");
      return;
    }

    const formData = {
      status: changeStatus,
    };
    const transaction_id = transactionID;

    console.log(formData);
    try {
      const response = await fetch(
        `https://transaction-management-app-backend.onrender.com/api/transactions/${transaction_id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      this.setState({
        isUpdateSuccessful: true,
        transactionID: "",
        changeStatus: "PENDING",
      });
    } catch (error) {
      console.error("Error updating transaction:", error.message);
      alert("Failed to update transaction. Please try again.");
    }
  };

  render() {
    const { transactionID, changeStatus, isUpdateSuccessful } = this.state;

    return (
      <form className="create-form-container" onSubmit={this.onSubmitBtn}>
        <input
          placeholder="Transaction ID"
          className="input-ele mt-3"
          type="TEXT"
          onChange={this.onChangeTransID}
          value={transactionID}
        />
        <br />
        <select
          type="drop-down"
          className="input-ele mt-3"
          onChange={this.onChangeStatus}
          value={changeStatus}
        >
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="FAILED">FAILED</option>
        </select>
        <div className="mt-5">
          <button type="submit" className="create-btn mr-5">
            Update Transaction
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
        {isUpdateSuccessful && (
          <>
            <div className="message-con mt-4">
              <p className="message">Transaction Status Update Successfully!</p>
              <i
                className="fa-solid fa-square-check icon-ele"
                style={{ color: "#0f8a34" }}
              ></i>{" "}
            </div>
            <Link to="/api/transactions/all">
              <button
                type="button"
                className="create-btn home-btn"
                onClick={this.onClickHomeBtn}
              >
                Check Here
              </button>
            </Link>
          </>
        )}
      </form>
    );
  }
}

export default UpdateTransaction;
