const tokenizer = require("./tokenizer.js");
const Parser = require("./parser.js");

const $code = document.getElementById("code");
const $button = document.getElementById("button");
const $token = document.getElementById("token");
const $ast = document.getElementById("ast");

async function inputCode() {
  let tokens = await tokenizer.token($code.value);
  $token.innerHTML = JSON.stringify(tokens, null, 2);
  let ast = await Parser($code.value);
  console.log(ast);
  $ast.innerHTML = JSON.stringify(ast, null, 2);
}

$button.addEventListener("click", inputCode);
