"use client";

import FieldInput from "@/components/FieldInput";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

/**
 * We need:
 * first name
 * last name
 * license plate
 * brand
 * model
 */

interface Props {
  setHasAccount: Dispatch<SetStateAction<boolean | undefined>>;
}

const Account = (props: Props) => {
  const { setHasAccount } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const submitAccountInfo = useCallback(() => {
    const account = { firstName, lastName, licensePlate, brand, model };

    localStorage.setItem("account", JSON.stringify(account));
    setHasAccount(true);
  }, [brand, firstName, lastName, licensePlate, model, setHasAccount]);

  const handleFirstNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  }, []);

  const handleLastNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  }, []);

  const handleLicensePlateNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLicensePlate(event.target.value);
  }, []);

  const handleBrandNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(event.target.value);
  }, []);

  const handleModelNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value);
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center flex-col">
      <p className="text-white text-4xl mb-8">Create account</p>
      <form action={submitAccountInfo}>
        <div className="mb-6 flex">
          <FieldInput
            label={"firstName"}
            value={firstName}
            handleValueChange={handleFirstNameChange}
          />

          <FieldInput
            label={"lastName"}
            value={lastName}
            handleValueChange={handleLastNameChange}
          />
        </div>
        <div className="mb-6 flex">
          <FieldInput label={"brand"} value={brand} handleValueChange={handleBrandNameChange} />

          <FieldInput label={"model"} value={model} handleValueChange={handleModelNameChange} />
        </div>
        <div className="flex justify-center">
          <FieldInput
            label={"license plate"}
            value={licensePlate}
            handleValueChange={handleLicensePlateNameChange}
          />
          <div className="w-full flex justify-center items-end">
            <button
              type="submit"
              className="text-white bg-blue-500 rounded p-2 px-6 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Account;
