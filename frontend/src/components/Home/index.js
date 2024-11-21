import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="btn-container">
              <Link to={"/api/transactions/"}>
                <button className="main-btn mt-4">
                  Create New Transaction
                </button>
              </Link>
              <br />
              <Link to={"/api/transactions/transaction_id/update/"}>
                <button className="main-btn mt-3">
                  Update Transaction Status
                </button>
              </Link>

              <br />
              <Link to="/api/transactions/user">
                <button className="main-btn mt-3">
                  Get Transactions Of Specific User
                </button>
              </Link>

              <br />
              <Link to={"/api/transactions/transaction_id/get/"}>
                <button className="main-btn mt-3">
                  Get Specific Transaction
                </button>
              </Link>

              <br />
              <Link to="/api/transactions/all/">
                <button className="main-btn mt-3">All Transactions</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
