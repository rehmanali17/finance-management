import React from "react";
import Login from "views/Login";
import Registration from "views/Registration";
import UserListing from "../views/dashboard/TransactionListing";
import { Route } from "react-router-dom";
import EditProfile from "views/dashboard/EditProfile";
import AddBalance from "../views/dashboard/AddBalance";
import WithdrawBalance from "../views/dashboard/WithdrawBalance";
import TransferBalance from "../views/dashboard/TransferBalance";

export const routes = {
  public: [
    <Route key={0} index element={<Login />} />,
    <Route key={1} path="signup" element={<Registration />} />,
  ],
  protected: [
    <Route key={0} index element={<UserListing />} />,
    <Route key={1} path="edit-profile" element={<EditProfile />} />,
    <Route key={2} path="add-balance" element={<AddBalance />} />,
    <Route key={3} path="withdraw-balance" element={<WithdrawBalance />} />,
    <Route key={4} path="transfer-balance" element={<TransferBalance />} />,
  ],
};
