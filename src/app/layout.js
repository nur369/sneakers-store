"use client"
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Provider store={store}>
          <Navbar />
          {children}
          <Footer />
        </Provider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
