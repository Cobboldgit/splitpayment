import React from "react";

const Uuid = (length) => {
  let arr =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  let mainArr = [];
  for (let i = 0; i < length; i++) {
    let ranIndex = (Math.random() * (arr.length - 1)).toFixed(0);
    mainArr[i] = arr[ranIndex];
  }
  return mainArr.join("");
};

export default Uuid;
