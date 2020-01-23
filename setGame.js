

let numbers=[27,27,27];
let shapes=[27,27,27];
let shadings=[27,27,27];
let colors=[27,27,27];
let desk=[];
let cardInDesk=0;
let cardSeleted=[];


function shuffle(){
    numbers=[27,27,27];
    shapes=[27,27,27];
    shadings=[27,27,27];
    colors=[27,27,27];
    document.getElementById("cardsLeft").innerText=checkCardsRemain();
}
function checkCardsRemain(){
    let amount=numbers[0]+numbers[1]+numbers[2];
    return amount;
}

function RandomCardGenerator(){
    if(checkCardsRemain()==0){
        return null;
    }
    let number = Math.floor(Math.random()*3);
    while (numbers[number]-1 < 0){
        number = (number+1)%3;
    }
    numbers[number]--;
    let shape = Math.floor(Math.random()*3);
    while (shapes[shape]-1 < 0){
        shape = (shape+1)%3
    }
    shapes[shape]--;
    let shading = Math.floor(Math.random()*3);
    while (shadings[shading]-1 < 0){
        shading = (shading+1)%3
    }
    shadings[shading]--;
    let color = Math.floor(Math.random()*3);
    while (colors[color]-1 < 0){
        color = (color+1)%3;
    }
    colors[color]--;

    let card=[number,shape,shading,color];
    return card;
}

function WinCheck(cards){
    let win = true;
    let i = 0;
    while(i<3){
        let j = 0;
        let sum = 0;
        while(j<3){
            sum = sum+cards[j][i];
            j++;
        }
        if(sum%3!=0){
            win = false;
            break;
        }
        i++;
    }
    return win;

}

function findOneWin(){
    let i=0;
    while (i<12){
        let j=i+1;
        while (j<12){
            let k=j+1;
            while (k<12){
                let cards=[desk[i],desk[j],desk[k]];
                if (WinCheck(cards)){
                    return [i+1,j+1,k+1];
                }
                k++;
            }
            j++;
        }
        i++;
    }
    return [0];
}

function hint(){

}

function deal(number){
    let i = 0;
    while (i<number){
        let card=RandomCardGenerator();
        if(card==null){
            break;
        }
        desk.push(card);
        cardInDesk=cardInDesk+1;

        i++;
    }
}

function cardImageProducer(card){
    let shape=['circle','triangle','worm'];
    let color=['B','R','G'];
    let cardHTML=
        '<div class="card" id='+card+'>\n' +
        '<img class="img1" src="image/frame'+color[card[3]]+'.png"/>\n' +
        '<div class="pattern">';
    let image2=shape[card[1]]+color[card[3]]+(card[2]+1).toString();
    let i;
    for(i=0;i<card[0]+1;i++){
        cardHTML+='<img class="img2" src="image/'+image2+'.png"/>\n';
    }
    cardHTML+='</div></div>';
    return cardHTML;
}

function showCard(){
    deal(12);
    let i;
    let len=desk.length;
    let column=Math.floor(len/4)+1;
    let row=4;
    for(i=0;i<column;i++){
        let imageRow=document.createElement("div");
        imageRow.setAttribute("class","row");
        let j;
        if(i==column-1){
            row=len%4;
        }
        for(j=0;j<row;j++){
            imageRow.innerHTML+=cardImageProducer(desk[j+4*i]);
        }
        document.getElementsByClassName("column")[0].append(imageRow);
    }
    addEventLisenersForCards();
    document.getElementById("cardsLeft").innerText=checkCardsRemain();
}

function clean(){
    desk=[];
    cardInDesk=0;
    document.getElementsByClassName("column")[0].innerHTML="";
}

function selectCard(){
    console.log(cardSeleted);
    let card=this.getAttribute("id").split(',').map(Number);
    if(this.style.border=="solid gold"){
        this.style.border="";
        cardSeleted.splice(cardSeleted.indexOf(card),1);
    }else{
        this.style.border="solid gold";
        cardSeleted.push(card);
    }
    if(cardSeleted.length==3){
        checkResult();
        cardSeleted=[];

        let cards=document.getElementsByClassName("card");
        console.log(cards);
        let i;
        let len=cards.length
        for(i=0;i<cards.length;i++){
            cards[i].style.border="";
        }
    }
}

function checkResult(){
    let result=WinCheck(cardSeleted);
    if(result){
        document.getElementById("result").innerText="Win!";
    }else{
        document.getElementById("result").innerText="Wrong!";
    }

}

function addEventLisenersForCards() {
    let cardClass = document.getElementsByClassName("card");
    let len = cardClass.length;
    let i;
    for (i = 0; i < len; i++) {
        cardClass[i].addEventListener('click', selectCard);
    }
}

document.getElementById("cardsLeft").innerText=checkCardsRemain();

