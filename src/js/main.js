const util = require("util");
const exec = util.promisify(require("child_process").exec);

const tokenizer = require("./tokenizer.js");
const Parser = require("./parser.js");
const generate = require("./generate.js");

const $code = document.getElementById("code");
const $button = document.getElementById("button");
const $token = document.getElementById("token");
const $ast = document.getElementById("ast");
const $generate = document.getElementById("generate");

async function inputCode() {
  let tokens = await tokenizer.token($code.value);
  $token.innerHTML = JSON.stringify(tokens, null, 2);
  let ast = await Parser($code.value);
  $ast.innerHTML = JSON.stringify(ast, null, 2);
  let codeJs = await generate(ast);
  $generate.innerHTML = codeJs;
  runCode();
}

$button.addEventListener("click", inputCode);

async function runCode() {
  await myExec(`node code.js`);
}

async function myExec(command) {
  const output = await exec(command);
  if (output.stdout) {
    console.log(output.stdout);
  }
  if (output.stderr) {
    console.log(output.stderr);
  }
}
