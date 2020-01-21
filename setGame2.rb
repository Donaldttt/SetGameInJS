require "mini_magick"

$numbers=[27,27,27]
$shapes=[27,27,27]
$shadings=[27,27,27]
$colors=[27,27,27]
$desk = Array.new 21
$cardInDesk=0

def checkCardsRemain()
  amount=numbers[0]+numbers[1]+numbers[2]
  return amount
end

def RandomCardGenerator()
  number = rand(3)
  while $numbers[number]-1 < 0
    number = (number+1)%3
  end
  $numbers[number]=$numbers[number]-1
  shape = rand(3)
  while $shapes[shape]-1 < 0
    shape = (shape+1)%3
  end
  $shapes[shape] = $shapes[shape]-1

  shading = rand(3)
  while $shadings[shading]-1 < 0
    shading = (shading+1)%3
  end
  $shadings[shading] = $shadings[shading]-1

  color = rand(3)
  while $colors[color]-1 < 0
    color = (color+1)%3
  end
  $colors[color] = $colors[color]-1

  card=[number,shape,shading,color]
  return card
end

def WinCheck(cards)
  win = true
  i = 0
  while i<3
    j = 0
    sum = 0
    while j<3
      sum = sum+cards[j][i]
      j = j+1
    end
    if sum%3!=0
      win = false
      break
    end
    i = i+1
  end
  return win
end

def CardImage(card)
  shape=['circle','triangle','worm']
  color=['B','R','G']
  frameName="frame"+color[card[3]]
  patternName=shape[card[1]]+color[card[3]]+(card[2]+1).to_s
  firstI=MiniMagick::Image.new("image/"+frameName+".png")
  secondI=MiniMagick::Image.new("image/"+patternName+".png")


  result=firstI.composite(secondI) do |c|
    c.compose "Over"
    c.geometry "+73+150"
  end
  i=0
  spaceValue=100
  while i<card[0]
    result=result.composite(secondI) do |c|
      c.compose "Over"
      c.geometry "+73+"+spaceValue.to_s
    end
    spaceValue=spaceValue+100
    i=i+1
  end

  return result
end

def showDesk()
  shape=['Circle','Triangle','Worm']
  color=['Black','Red','Green']
  shading=['Empty','Full','Line']
  i=0
  while i<12
    card=$desk[i]
    puts "Card "+(i+1).to_s+": "+color[card[3]]+" card, "+(card[0]+1).to_s+" "+shape[card[1]]+", "+shading[card[2]]
    i=i+1
  end
end

def findOneWin()
  i=0
  while i<12
    j=i+1
    while j<12
      k=j+1
      while k<12
        cards=[$desk[i],$desk[j],$desk[k]]
        if WinCheck(cards)
          return [i+1,j+1,k+1]
        end
        k=k+1
      end
      j=j+1
    end
    i=i+1
  end
  return [0]
end

i = 0
while i<12
  $desk[i]=RandomCardGenerator()
  $cardInDesk=$cardInDesk+1
  i=i+1
end
showDesk
puts findOneWin
puts "Choose 3 cards separate by space, enter 'q' to quit"
input=gets
while !input.equal? 'q'
  selection=input.split
  cardOne=selection[0].to_i-1
  cardTwo=selection[1].to_i-1
  cardThree=selection[2].to_i-1
  cards=[$desk[cardOne],$desk[cardTwo],$desk[cardThree]]
  ifWin=WinCheck(cards)
  if ifWin
    puts "Win!"
    $desk[cardOne]=RandomCardGenerator()
    $desk[cardTwo]=RandomCardGenerator()
    $desk[cardThree]=RandomCardGenerator()
    puts findOneWin
    showDesk
  elsif
  puts "Wrong set!"
  end
  puts "Choose 3 cards separate by space, enter 'q' to quit"
  input=gets
end
