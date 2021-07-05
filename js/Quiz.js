class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    
    question.hide();
    background("yellow")
    textSize(30);
    fill("red");  
    text("Result Of The Quiz", 230, 70)
    Contestant.getPlayerInfo();
    console.log(allContestants)

    if(allContestants !==undefined){
      fill("blue");
      textSize(20);
      text("*NOTE: Contestant who answered correct are highlighted in green colour", 130, 230);
      
      var pos  = 270
      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer)
          fill("green")
        else
          fill("red");

        text(allContestants[plr].name +" : " + allContestants[plr].answer, 500, pos)
        pos = pos+50;
        
      }
  }
  
  
    
  }

}
