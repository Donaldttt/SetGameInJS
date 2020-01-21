

let numbers=[27,27,27];
let shapes=[27,27,27];
let shadings=[27,27,27];
let colors=[27,27,27];
let desk=[];
let cardInDesk=0;


function checkCardsRemain(){
    let amount=numbers[0]+numbers[1]+numbers[2];
    return amount;
}

function RandomCardGenerator(){
    let number = Math.round(Math.random()*3);
    while (numbers[number]-1 < 0){
        number = (number+1)%3;
    }
    numbers[number]=numbers[number]-1;
    let shape = Math.round(Math.random()*3);
    while (shapes[shape]-1 < 0){
        shape = (shape+1)%3
    }
    shapes[shape] = shapes[shape]-1;
    let shading = Math.round(Math.random()*3);
    while (shadings[shading]-1 < 0){
        shading = (shading+1)%3
    }
    shadings[shading] = shadings[shading]-1;
    let color = Math.round(Math.random()*3);
    while (colors[color]-1 < 0){
        color = (color+1)%3;
    }
    colors[color] = colors[color]-1;

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
            j = j+1;
        }
        if(sum%3!=0){
            win = false;
            break;
        }
        i = i+1;
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
                k=k+1;
            }
            j=j+1;
        }
        i=i+1;
    }
    return [0];
}

function deal(number){
    let i = 0;
    while (i<number){
        desk.push(RandomCardGenerator());
        cardInDesk=cardInDesk+1;
        i=i+1
    }
}


document.addEventListener()



