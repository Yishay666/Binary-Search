// apps navigations
var prev_app = document.getElementById('prev-app');
var main_app = document.getElementById('main-app');


// range
var submitRangeBtn = document.getElementById('submitRange');
var range = document.getElementById('range');
var inputRange = document.getElementById('inputRange');

// main app elems
var headline = document.getElementById('headline');
var StartBtn = document.getElementById('btn');
var number = document.getElementById('number');

// steps variables
var stepsElem = document.getElementById('steps');
var ForwardStep = document.getElementById('ForWardBtn');
var BackWardsBtn = document.getElementById('BackWardsBtn');
var stepsBtn = document.getElementById('stepsBtn');
var showStep = document.getElementById('showStep');
var steps = [];
var counter = 0;
var addH2 = '';

// script vars
var primes = [];
var reload = false;

StartBtn.addEventListener('click', () => {
    if(reload) document.location.reload();

    var number = document.getElementById('number');

    if(primes.includes(Number(number.value)) && inputRange.max == '150' && inputRange.min == '5'){
        search(Number(number.value));
        number.style.display = 'none';
        reload = true;
        StartBtn.style.display = 'none';
    } else {
        headline.children[1].innerHTML = `Target Out OF Range (1 - ${inputRange.value})`;
        headline.children[1].classList.add('blink');
    }
})
function search(n){
    createH2(primes, n)
        
    var p = primes;
    var midN = p[Math.floor(p.length /2)];

    var seatchInterval = setInterval(() => {
        steps.push({step: addH2})
        if(midN === n){
            p = [midN];
        } else if(midN > n){
            p = p.slice(0, Math.floor(p.length / 2))
        } else if(midN < n){
            p = p.slice(Math.ceil(p.length / 2), p.length)
        }
        midN = p[Math.floor(p.length / 2)];

        createH2(p, n);
        
        if(p == n){
            clearInterval(seatchInterval);
            steps.push({step: addH2})
            stepsBtn.style.display = 'block';
        } 
    },500);
}


function createH2(primes, n){
    addH2 = `<h2 data-aos="fade-right">[`;
    primes.map(i => {
        if(i == n) {
            addH2 += `, <span class="yellow">${i}</span>`
        } else {
            addH2 += `, ${i}`;
        }
    });
    addH2 = addH2.replace(', ', '');
    addH2 += ']</h2>';

    document.getElementById('arrs').innerHTML += addH2;
}
function setTarget(v){
    if(v.length){
        if(v <= inputRange.value && v >= 1){
            headline.children[1].innerHTML = `Target: ${v}`;
        } else {
            headline.children[1].innerHTML = `Target Out OF Range (1 - ${inputRange.value})`;
        }
    } else {
        headline.children[1].innerHTML = ``;
    }
}
function setInputRange(){
    inputRange.value = range.value;
    headline.children[1].innerHTML = `Set Range (1 - ${inputRange.value})`;
}
function setRange(){
    range.value = inputRange.value;
    headline.children[1].innerHTML = `Set Range (1 - ${inputRange.value})`;
}
submitRangeBtn.addEventListener('click', () => {
    if(inputRange.max == '150' && inputRange.min == '5'){
        for(var i = 1; i<=inputRange.value; i++){
            primes.push(i);
        }
        prev_app.style.display = 'none';
        main_app.style.display = 'flex';
    } else {
        document.location.reload();
    }
})

// stpes
stepsBtn.addEventListener('click', () => {
    main_app.style.display = 'none';
    stepsElem.style.display = 'flex';

    headline.children[1].innerHTML = "Step 1";
    showStep.innerHTML = steps[counter].step;
})
ForwardStep.addEventListener('click', () => {
    counter = counter != steps.length-1 ? counter + 1 : 0;

    steps[counter].step = steps[counter].step.replace('fade-left', 'fade-right');
    showStep.innerHTML = steps[counter].step;
    headline.children[1].innerHTML = `Step ${counter+1}`;
})
BackWardsBtn.addEventListener('click', () => {
    counter = counter != 0 ? counter - 1 : steps.length-1;
    
    steps[counter].step = steps[counter].step.replace('fade-right', 'fade-left');
    showStep.innerHTML = steps[counter].step;
    headline.children[1].innerHTML = `Step ${counter+1}`;
})
