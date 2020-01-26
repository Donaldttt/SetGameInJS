
let allCards=[];//Deck of cards
let desk=[];//Card in the desk
let cardSeleted=[];
let hintTimes=0;
let setHint=[];// Win set for current cards

//This function creates 81 cards for set and shuffle them and update the cards reminded in the HTML page.
function initialization(){
    allCards=[];
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            for(let k=0;k<3;k++){
                for(let y=0;y<3;y++){
                    allCards.push([i,j,k,y]);
                }
            }
        }
    }
    document.getElementsByClassName("column")[0].innerHTML="";
    cardInDesk=0;
    desk=[];
    hintTimes=0;
    shuffle();
    showCard();
}

function shuffle(){
    let index=allCards.length-1;
    let temp;
    while(index!=0){
        let rand=Math.floor(Math.random()*81);
        temp=allCards[rand];
        allCards[rand]=allCards[index];
        allCards[index]=temp;
        index--;
    }
    updateCardsRemain();
}

function updateCardsRemain(){
    document.getElementById("cardsLeft").innerText=allCards.length;
}

function RandomCardGenerator(){
    return allCards.pop();
}

function WinCheck(cards){
    let win = true;
    let i = 0;
    while(i<4){
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
    let len=desk.length;
    let i=0;
    while (i<len){
        let j=i+1;
        while (j<len){
            let k=j+1;
            while (k<len){
                let cards=[desk[i],desk[j],desk[k]];
                if (WinCheck(cards)){
                    return [i,j,k];
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
    let setHint=findOneWin();
    let win=setHint[hintTimes];
    if(setHint==[0]){
        window.alert("No win set");
    }else{
        while(cardSeleted.length>0){
            document.getElementById(cardSeleted.pop()).style.border="";
        }

        let cardHTML=document.getElementsByClassName("card")[win];
        selectCard.call(cardHTML,1);
        hintTimes=(hintTimes+1)%3;
    }
}

//deal number of cards to the desk
function deal(number){
    let i = 0;
    while (i<number){
        if(allCards.length==0){
            break;
        }
        let card=RandomCardGenerator();
        desk.push(card);
        i++;
    }
    return i;
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
    cleanDesk();
    let cardsDealed=deal(12);
    if(cardsDealed!=0){
        let i;
        let len=desk.length;
        let column=Math.floor(len/4)+1;
        let row=4;
        for(i=0;i<column;i++){
            let imageRow=document.createElement("div");
            imageRow.setAttribute("class","row");
            if(i==column-1){
                row=len%4;
            }
            let j;
            for(j=0;j<row;j++){
                imageRow.innerHTML+=cardImageProducer(desk[j+4*i]);
            }
            document.getElementsByClassName("column")[0].append(imageRow);
        }
        addEventLisenersForCards();
        updateCardsRemain();
        setHint=findOneWin();
    }else{
        window.alert("Desk is empty!")
    }

}

function addThree(){
    let len=desk.length;
    let cardDealed=deal(3);
    let imageRow=document.createElement("div");
    imageRow.setAttribute("class","row");
    let j;

    for(j=0;j<cardDealed;j++){
        imageRow.innerHTML+=cardImageProducer(desk[j+len-1]);
    }
    document.getElementsByClassName("column")[0].append(imageRow);
    addEventLisenersForCards();
    updateCardsRemain();
    setHint=findOneWin();
}

function noWin(){
    if(setHint==[0]){
        addThree();
    }else{
        window.alert("There is one!")
    }
}

function cleanDesk(){
    desk=[];
    cardSeleted=[];
    document.getElementsByClassName("column")[0].innerHTML="";
    hintTimes=0;
}

//mode: in 1 the border can not be canceled
function selectCard(mode=0){
    let card=this.getAttribute("id");
    if(this.style.border=="7px solid gold"&&mode!=1){
        this.style.border = "";
        cardSeleted.splice(cardSeleted.indexOf(card), 1);
    }else{
        if(cardSeleted.length<3) {
            this.style.border = "7px solid gold";
            cardSeleted.push(card);
        }
    }
    return card;
}

function checkResult(){
    if(cardSeleted.length==3){
        let cardSet=[];
        let i=0;
        while(i<3){
            cardSet.push(cardSeleted[i].split(',').map(Number));
            i++;
        }
        let result=WinCheck(cardSet);
        if(result){
            window.alert("Win!");
            cardSeleted=[];
            cleanDesk();
            showCard();
        }else{
            window.alert("Wrong!");
        }
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

updateCardsRemain();

