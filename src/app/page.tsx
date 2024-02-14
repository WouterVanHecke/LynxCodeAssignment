"use client";

import Account from "@/pages/account";
import Home from "@/pages/home";
import { useEffect, useState } from "react";

const Root = () => {
  const [hasAccount, setHasAccount] = useState<boolean | undefined>();

  useEffect(() => {
    const account = localStorage.getItem("account");
    setHasAccount(!!account);
  }, []);

  if (typeof hasAccount === "undefined") {
    return null;
  }

  if (!hasAccount) {
    return <Account setHasAccount={setHasAccount} />;
  }

  return <Home setHasAccount={setHasAccount} />;
};

export default Root;
