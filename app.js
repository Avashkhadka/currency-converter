const dropdown = document.querySelectorAll(".dropdown select");

const fromcurr=document.querySelector(".form select");
const tocurr=document.querySelector(".to select");


for (let select of dropdown) {
  for (let codes in countryList) {
    let option = document.createElement("option");
    option.innerText = codes;
    option.value = codes;
    select.append(option);

    if (select.name === "from" && codes === "USD") {
      option.selected = "selected";
    }else if (select.name === "to" && codes === "NPR") {
        option.selected = "selected";
      }
  }

  select.addEventListener("change",(evt)=>{
    updateflag(evt.target)
    
  })
}

const updateflag=(event)=>{

let countrycode=event.value;
let flagcode=countryList[countrycode];

let newsrc=`https://flagsapi.com/${flagcode}/flat/64.png`
let flag=event.parentElement.querySelector(" img");
flag.src=newsrc;
}


const getupdatecurr=async ()=>{
let amount=document.querySelector(".amount input")
let amtvalue=amount.value;
if(amtvalue<1||amtvalue===""){
    amtvalue=1;
    amount.value="1"
}

const url=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr.value.toLowerCase()}.json`;
const Response=await fetch(url);
const data= await Response.json();
const rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]

const final_currency=amtvalue*rate;
let msg=document.querySelector(".msg");
msg.innerText= `${amtvalue} ${fromcurr.value} is equal to ${final_currency} ${tocurr.value} `
}


const btn=document.querySelector("button");
btn.addEventListener("click",(event)=>{
    event.preventDefault();
getupdatecurr()
})

window.addEventListener("load",()=>{
    getupdatecurr();
})