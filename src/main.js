const $code = document.getElementById("code");
const $button = document.getElementById("button");
const $token = document.getElementById("token");
const $ast = document.getElementById("ast");
const $generate = document.getElementById("generate");

const url = "http://localhost:3000/input";
const urlGet = "http://localhost:3000/generate";

async function getCompiler() {
  try {
    let res = await fetch(urlGet),
      data = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    console.log(data);
    $token.innerHTML = data.tokens;
    $ast.innerHTML = data.ast;
    $code.innerHTML = data.code;
  } catch (error) {
    console.log(error);
  }
}

async function postCode() {
  try {
    const inputCode = {
      code: $code.value,
    };
    let options = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(inputCode),
      },
      res = await fetch(url, options),
      json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

async function Main() {
  await postCode();
  setTimeout(() => {
    getCompiler();
  }, 1000);
}

$button.addEventListener("click", Main);
