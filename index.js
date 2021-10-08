function wordDef(){
    let word = document.getElementById('wordInput').value;

    getWordDef(word);
}

function getWordDef(word){
    const xhr = new XMLHttpRequest();

    xhr.onload = function(){
        let wordMeanings = JSON.parse(this.responseText);
        wordDefFilter(wordMeanings);
    }

    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, true);
    xhr.send();
}

function wordDefFilter(wordDef){

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