let BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/";
let dropdown= document.querySelectorAll(".dropdown select");
const button= document.querySelector("button");
const fromcurr= document.querySelector(".from select");
const tocurr= document.querySelector(".To select");
const msg= document.querySelector(".msg")


for(let select of dropdown){
    for(currcode in countryList){
        let element= document.createElement("option");
        element.innerText= currcode;
        element.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            element.selected="selected";
        }else if(select.name==="to" && currcode==="INR"){
            element.selected="selected";
        }
        select.append(element)
    }
    select.addEventListener("change",(e)=>{
        updateflag(e.target);
    });
}

const updateflag=(element)=> {
    let currcode=element.value;
    let country=countryList[currcode];
    let newsrc=`https://flagsapi.com/${country}/shiny/32.png`
    let img= element.parentElement.querySelector("img")
    img.src=newsrc;
}

button.addEventListener("click", async (e)=>{
    e.preventDefault();
    updateexchange();
})



const updateexchange= async ()=>{
    let amount= document.querySelector("form input")
    let amountval=amount.value;
    if(amountval==="" ||amountval<1){
        amountval=1;
        amount.value="1"
    }
    // console.log(fromcurr,tocurr)
    let url= `${BASE_URL}currencies/${fromcurr.value.toLowerCase()}.json`
    let response= await fetch(url);
    let data= await response.json();
    let rate= data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let exchange= rate*amountval;
    
    msg.innerText= `${amountval} ${fromcurr.value} : ${exchange} ${tocurr.value}`


}
window.addEventListener("load",updateexchange)



