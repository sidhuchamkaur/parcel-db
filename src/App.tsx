/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CustomerDash from "./pages/CustomerDash";
import TravelerDash from "./pages/TravelerDash";
import AdminDash from "./pages/AdminDash";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="customer" element={<CustomerDash />} />
        <Route path="traveler" element={<TravelerDash />} />
        <Route path="admin" element={<AdminDash />} />
      </Route>
    </Routes>
  );
}
