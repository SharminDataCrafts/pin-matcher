const pinMatch = document.getElementById('pin-match');
const pinUnmatch = document.getElementById('pin-unmatch');
const trialWait = document.getElementById('trial-wait');
const generatePin = document.getElementById('generate-pin');
const inputBtns = document.querySelectorAll('.button');
const submitBtn = document.getElementById('submit-btn');

pinMatch.style.display = 'none';
pinUnmatch.style.display = 'none';
trialWait.style.display = 'none';


// handle generate pin
generatePin.addEventListener('click',()=>{
    const pinInput = document.getElementById('pin-input');
    pinInput.value = Math.floor(Math.random()*(999-100+1))+100;

    pinMatch.style.display = 'none';
    pinUnmatch.style.display = 'none';
    document.getElementById('trial-tag').style.display='block';
});

// input Buttons
inputBtns.forEach(button => {
    button.addEventListener('click',()=>{
        let userPin = document.getElementById('user-pin');

        // for numbers
        if('0123456789'.includes(button.innerHTML)){
            userPin.value=userPin.value+button.innerHTML;
        }
        // clearBtn
        if(button.innerHTML==='C'){
            userPin.value = '';
        }
        // &lt; Erase btn
        if(button.innerHTML==='&lt;'){
            userPin.value = userPin.value.slice(0,-1);
        }

    })
});

// handle submit button
submitBtn.addEventListener('click',()=>{
    const userPin = document.getElementById('user-pin');
    const pinInput = document.getElementById('pin-input');

    // pinMatched
    if(userPin.value===pinInput.value){
        pinMatch.style.display = 'block';
        pinUnmatch.style.display = 'none';
        document.getElementById('action-left').innerHTML = 3;
    

    }else if(userPin.value!=='' && userPin.value!==pinInput.value){
        pinUnmatch.style.display = 'block';
        pinMatch.style.display = 'none';
        submitOptionLeft(userPin);
      
    }
    userPin.value='';
});


// handle trial option left
function submitOptionLeft(userPin){
    const actionLeft = document.getElementById('action-left');
        let actionLeftNumber = parseInt(actionLeft.innerHTML);
        
        actionLeftNumber = actionLeftNumber-1;
        actionLeft.innerHTML = actionLeftNumber;
        
        if(actionLeftNumber<=0){
            Btnability(true, 0.5, 'block');
           
            userPin.value='';
            
            pinUnmatch.style.display = 'none';

            setTimeout(()=>{           
                Btnability(false, 1, 'none');
                actionLeft.innerHTML = 3;
            },3000);
        }
}

function Btnability(flag, opacity, disVal){
    submitBtn.disabled = flag;
    submitBtn.style.opacity = opacity;
    trialWait.style.display = disVal;
}