const form = document.querySelector("form");
const input = document.querySelector("#input");
const message = document.querySelector(".message");
const contain= document.querySelector(".contain");
const errSymbolAtInput= document.querySelector(".err");
const correctnessSymbolAtInput= document.querySelector(".fa-check");
const loc = document.getElementsByClassName("location");
const loading= document.querySelector(".loading");
// add event listener to input
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //first remove all previously search pincode result
  Array.from(loc).forEach(l=>{
    l.remove();
  });
  pincode = input.value;
  const check = checkFunction(pincode);


  // check if it is valid number and Pincode
  if (!check) {
    console.log("im here")
    message.textContent = "Please enter valid pincode...";
    // change the symbol for input
    errSymbolAtInput.style.display="block";
    correctnessSymbolAtInput.style.display="none";
    setTimeout(() => {
      message.textContent = "";
    }, 3000);
  } else {
    // loading....
    loading.style.display="block";

    // change the symbol for input
    errSymbolAtInput.style.display="none";
    correctnessSymbolAtInput.style.display="block";

    // get data from api for Pincode
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(res => res.json())
      .then(data =>{
        //remove loading..
        loading.style.display="none";

        // display the data in info
        data[0].PostOffice.forEach(post=>{
          const div=document.createElement("div");
          const body=`<div class="heading">
            <h3>Location Info for Pincode: ${post.Pincode}</h3>
            <span class="close material-symbols-outlined">close</span>
          </div>
          <div class="info">
            <p><strong>Name: </strong><span>${post.Name}</span></p>
            <p><strong>Block: </strong><span>${post.Block}</span></p>
            <p><strong>District: </strong><span>${post.District}</span></p>
            <p><strong>State: </strong><span>${post.State}</span></p>
            <p><strong>BranchType: </strong><span>${post.BranchType}</span></p>
          </div>`;
          div.classList.add("mt-3");
          div.classList.add("location");
          div.innerHTML=body;
          contain.appendChild(div);
        })
      })
  }
})

// add event listener to close button
contain.addEventListener("click",(e)=>{
  if(e.target.classList.contains("close"))
  {
    e.target.parentElement.parentElement.remove();
  }
})

function checkFunction(pincode)
{
  const pattern = new RegExp("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$");
  return pincode.match(pattern);
}
