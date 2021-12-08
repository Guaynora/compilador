const $code = document.getElementById("code");
const $button = document.getElementById("button");
const $token = document.getElementById("token");
const $ast = document.getElementById("ast");
const $generate = document.getElementById("generate");
const $titleGenerate = document.getElementById("generateTitle");
const $titleOutput = document.getElementById("compileTitle");
const $output = document.getElementById("output");

const url = "http://localhost:3000/input";
const urlGet = "http://localhost:3000/generate";

let outputCompiler = "";

async function getCompiler() {
  try {
    let res = await fetch(urlGet),
      data = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    console.log(data);
    //console.log(data.output);
    $token.innerHTML = data.tokens;
    $ast.innerHTML = data.ast;
    $generate.innerHTML = data.code;
    outputCompiler = data.output;
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
  }, 2000);
}

function clickTitle(type) {
  if (type === "generate") {
    console.log("generate");
    $generate.style.display = "block";
    $output.style.display = "none";
    $titleGenerate.style.background = "#3bec23";
    $titleGenerate.style.color = "#ffffff";
    $titleOutput.style.background = "#ffffff";
    $titleOutput.style.color = "black";
  } else if (type === "output") {
    console.log("output");
    $output.innerHTML = outputCompiler;
    $generate.style.display = "none";
    $output.style.display = "block";
    $titleGenerate.style.background = "#ffffff";
    $titleGenerate.style.color = "black";
    $titleOutput.style.background = "#3bec23";
    $titleOutput.style.color = "#ffffff";
  }
}

$button.addEventListener("click", Main);
$titleGenerate.addEventListener("click", (e) => clickTitle("generate"));
$titleOutput.addEventListener("click", (e) => clickTitle("output"));
