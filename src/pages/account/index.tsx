"use client";

import React, { useState } from "react";

/**
 * We need:
 * first name
 * last name
 * license plate
 * brand
 * model
 */

const Account = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [licensePlate, setLicensePlate] = useState();
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <p className="text-white text-4xl">Create account</p>
    </div>
  );
};

export default Account;
