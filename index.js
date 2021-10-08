function wordDef(){
    let word = document.getElementById('wordInput').value;
    if(word === ''){
        showMsg('danger', {head:'Error!', body: "Search field can't be empty! Please fill it and try again."});
    }
    else{
        getWordDef(word);
    }
}


function showMsg(type, msg){
    str = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>${msg.head}</strong> ${msg.body}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
           </div>`

    let msgDiv = document.getElementById('msgDiv');
    msgDiv.innerHTML = str;

    setTimeout( function() {
        msgDiv.innerHTML = '';
    }, 10000);
}

function getWordDef(word){
    const xhr = new XMLHttpRequest();

    xhr.onload = function(){
        if(this.status==200){
            let wordMeanings = JSON.parse(this.responseText);
            wordDefFilter(wordMeanings);
        }
        else if(this.status==404){
            showMsg('danger', {head: "Error!", body: "There is no meaning of this word. Please check and type different word."});
        }
    }

    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, true);
    xhr.send();
}

function wordDefFilter(wordDef){
    let defs = []
    let defin, ex;
    
    wordDef.forEach(element => {
        element.meanings.forEach(ele => {
            ele.definitions.forEach(elem => {
                defin = elem.definition;
                ex = elem.example;
                defs.push({definition: defin, example: ex});
            });
        });
    });


    showWordDef(defs);
}

function showWordDef(defs){
    let str='';
    defs.forEach(ele => {
        str += `<li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Definition</div>
                        ${ele.definition}`;
        if(ele.example!==undefined){
            str += `<div class="">
                        <div class="fw-bold">Example</div>
                        ${ele.example}
                    </div>`;
        }
        str += `</li>`;
    });

    displayStr = `<ol class="list-group list-group-numbered mt-3 mb-3">
                    <h4> ${document.getElementById('wordInput').value} </h4>
                    ${str}
                  </ol>`;

    let wordDefList = document.getElementById('wordDefList');
    wordDefList.innerHTML = displayStr;
}

let wordSearchBtn = document.getElementById('wordSearchBtn');
wordSearchBtn.addEventListener('click',wordDef);