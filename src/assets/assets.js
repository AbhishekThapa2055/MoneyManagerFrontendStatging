import { LayoutDashboard } from "lucide-react";
import login_bg from "./login-bg.png";
import logo from "./logo.png";
import { FaGauge, FaList } from "react-icons/fa6";
import { FaMoneyBill, FaMoneyBillTransfer } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa6";
export const assets = {
  logo,
  login_bg,
};

export const SIDE_BAR_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: FaGauge,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Category",
    icon: FaList,
    path: "/category",
  },
  {
    id: "03",
    label: "Income",
    icon: FaMoneyBill,
    path: "/income",
  },
  {
    id: "04",
    label: "Expense",
    icon: FaMoneyBillTransfer,
    path: "/expense",
  },
  {
    id: "05",
    label: "Filters",
    icon: FaFilter,
    path: "/filter",
  },
];
