let rating_state = document.querySelector('.rating-state');
let thank_state = document.querySelector(".thank-state");

let btn = document.querySelector('.num');
let rated = document.querySelector('span');

let submit = document.querySelector('.sub-btn');

btn.addEventListener("click", (e) => {
  let ratednum = e.target.innerText;
    rated.innerHTML = ratednum;
    submit.addEventListener('click', () =>{
        if(ratednum >0 && ratednum <=5){
            rating_state.style.display='none';
            thank_state.style.display = 'block';
        }
        else{
            alert("Please rate the app");
        }
    })
});