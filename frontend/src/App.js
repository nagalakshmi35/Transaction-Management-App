import { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CreateTransaction from "./components/CreateTransaction";
import UpdateTransaction from "./components/UpdateTransaction";
import GetUserTransactions from "./components/GetUserTransactions";
import TransactionList from "./components/TransactionList";
import GetTransaction from "./components/GetTransaction";
import Home from "./components/Home";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="main-heading text-center mt-5">
                Transaction Management App
              </h2>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route
            path="/api/transactions/"
            exact
            Component={CreateTransaction}
          />
          <Route
            path="/api/transactions/transaction_id/update"
            exact
            Component={UpdateTransaction}
          />
          <Route
            path={`/api/transactions/user`}
            exact
            Component={GetUserTransactions}
          />
          <Route
            path="/api/transactions/transaction_id/get/"
            exact
            Component={GetTransaction}
          />
          <Route
            path="/api/transactions/all/"
            exact
            Component={TransactionList}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
