import React, { useState, useEffect } from "react";

function usePersisted(name, initialValue) {
  const [value, setValue] = useState(() => {
    const storageValue = window.localStorage.getItem(name);

    if (
      storageValue === 0 ||
      storageValue === "undefined" ||
      storageValue === null
    ) {
      console.log("no value");
      return initialValue;
    } else {
      console.log("we have value");
      return JSON.parse(storageValue);
    }
  });

  console.log("this is the value", value);

  //   Take the value and put it in Local Storage
  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(value));
  }, [value]);

  //Very Important
  return [value, setValue];
}

export default usePersisted;
