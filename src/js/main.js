const tokenizer = require("./tokenizer.js");

const $code = document.getElementById("code");
const $button = document.getElementById("button");
const $token = document.getElementById("token");

async function inputCode() {
  console.log($code.value);
  let tokens = await tokenizer.token($code.value);
  console.log("inputCode", tokens);
  console.log(typeof tokens);
  let tok = JSON.stringify(tokens);
  console.log(typeof tok);
  $token.innerHTML = JSON.stringify(tokens, null, 2);
}

$button.addEventListener("click", inputCode);
