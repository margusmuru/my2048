#pragma strict
@script ExecuteInEditMode()
var ms:MainScript;
var fm:FileManager;
var myGUI:GUISkin;

var scoreText:GUIText;
var highScoreText:GUIText;

private var tileSize:float=100;
private var mSize:float=100;
var menuState:String="main";

function Start () {
	tileSize=Screen.width/ms.myArraySize;
	mSize=Screen.width/8;
	myGUI.GetStyle("tile_template").fontSize=tileSize/2;
	myGUI.GetStyle("menuBtn").fontSize=mSize/2;
	

	scoreText.fontSize=tileSize/3;
	scoreText.pixelOffset.y=Screen.height-mSize*10;
	highScoreText.fontSize=tileSize/3;
	highScoreText.pixelOffset.y=Screen.height-mSize*10.5;
	// menuState="paused";
}

function Update () {
	if(menuState=="inGame")
	{
		scoreText.enabled=true;
		highScoreText.enabled=true;
	}
	else
	{
		scoreText.enabled=false;
		highScoreText.enabled=false;
	}	
	scoreText.text="Score: "+ms.score.ToString();
	highScoreText.text="HighScore: "+ms.highScore.ToString();
	if(Input.GetKeyDown("escape")){menuState="exit?";}
}

function OnGUI()
{
	GUI.skin=myGUI;
	if(GUI.Button(Rect(0,0,Screen.width/4*3,Screen.width/4), "","logo")){}
	if(GUI.Button(Rect(Screen.width/4*3,0,Screen.width/4,Screen.width/4), "","menu")){if(menuState=="inGame"){menuState="paused";}}
	// displays the multidimensional game array;
	if(menuState=="inGame")
	{
		for(var x=0;x<ms.myArraySize;x++){
			for(var y=0;y<ms.myArraySize;y++){
				if(ms.myArray[x,y]==0){if(GUI.Button(Rect(x*tileSize,y*tileSize+Screen.width/4,tileSize,tileSize), "","tile_template")){}}
				else{if(GUI.Button(Rect(x*tileSize,y*tileSize+Screen.width/4,tileSize,tileSize), "","tile_"+ms.myArray[x,y])){}}
			}
		}
	}
	if(menuState=="paused")
		{
			if(GUI.Button(Rect(mSize*4,mSize*3,mSize*3,mSize), "Resume","menuBtn")){menuState="inGame";}
			if(ms.canUndo){if(GUI.Button(Rect(mSize*4,mSize*4.5,mSize*3,mSize), "Undo","menuBtn")){ms.UndoMove();}}
			if(GUI.Button(Rect(mSize*4,mSize*6,mSize*3,mSize), "Quit","menuBtn")){menuState="main";}

		}

	if(menuState=="main")
	{
		if(fm.savedArraySize!=0)
		{
			if(GUI.Button(Rect(mSize*2,mSize*2.5,mSize*4,mSize), "Continue","menuBtn")){menuState="inGame";}
		}
		if(GUI.Button(Rect(mSize*2,mSize*4,mSize*4,mSize), "New Game","menuBtn")){menuState="newGame";}
		if(GUI.Button(Rect(mSize*2,mSize*5.5,mSize*4,mSize), "HighScores","menuBtn")){menuState="scores";}
		if(GUI.Button(Rect(mSize*2,mSize*7,mSize*4,mSize), "Quit Game","menuBtn")){menuState="exit?";}

		if(GUI.Button(Rect(mSize*2,Screen.height-mSize*0.7,mSize*4,mSize), "MyGameLabs "+ms.versionNr,"menuBtn")){}
	}
	if(menuState=="winGame")
	{
		if(GUI.Button(Rect(mSize*2,mSize*2.5,mSize*4,mSize), "You won the game!","menuBtn")){}

		if(GUI.Button(Rect(mSize,mSize*4,mSize*2,mSize), "Back","menuBtn")){menuState="main";}
		if(GUI.Button(Rect(mSize*4,mSize*4,mSize*2,mSize), "New Game","menuBtn")){menuState="newGame";}	
	}
	if(menuState=="endGame")
	{
		if(GUI.Button(Rect(mSize*2,mSize*2.5,mSize*4,mSize), "The game has ended!","menuBtn")){}
		if(ms.highScore>ms.score)
		{
			if(GUI.Button(Rect(mSize*2,mSize*4,mSize*4,mSize), "Your Score: "+ms.score.ToString(),"menuBtn")){}
		}
		else
		{
			if(GUI.Button(Rect(mSize*2,mSize*4,mSize*4,mSize), "New HighScore: "+ms.score.ToString(),"menuBtn")){}
		}

		if(GUI.Button(Rect(mSize,mSize*5.5,mSize*2,mSize), "Back","menuBtn")){menuState="main";}
		if(GUI.Button(Rect(mSize*4,mSize*5.5,mSize*2,mSize), "New Game","menuBtn")){menuState="newGame";}	
	}
	if(menuState=="exit?")
	{
		if(GUI.Button(Rect(mSize*2,mSize*5.5,mSize*4,mSize), "Really got enough?","menuBtn")){}

		if(GUI.Button(Rect(mSize,mSize*7,mSize*2,mSize), "Nope","menuBtn")){menuState="main";}
		if(GUI.Button(Rect(mSize*5,mSize*7,mSize*2,mSize), "Yep","menuBtn")){Application.Quit();}	
	}
	if(menuState=="newGame")
	{
		if(GUI.Button(Rect(mSize,mSize*4,mSize*3,mSize), "Grid: "+ms.myArraySize.ToString(),"menuBtn")){}
			if(GUI.Button(Rect(mSize*4.5,mSize*4,mSize,mSize), "<","menuBtn"))
				{if(ms.myArraySize>4){ms.myArraySize--;}}
			if(GUI.Button(Rect(mSize*6,mSize*4,mSize,mSize), ">","menuBtn"))
				{if(ms.myArraySize<10){ms.myArraySize++;}}

		if(GUI.Button(Rect(mSize,mSize*5.5,mSize*3,mSize), ms.gameMode,"menuBtn")){}
			if(GUI.Button(Rect(mSize*4.5,mSize*5.5,mSize,mSize), "<","menuBtn"))

				{if(ms.gameMode!="2048"){ms.gameMode="2048";}}
			if(GUI.Button(Rect(mSize*6,mSize*5.5,mSize,mSize), ">","menuBtn"))
				{if(ms.gameMode!="endless"){ms.gameMode="endless";}}

		if(GUI.Button(Rect(mSize,mSize*7,mSize*2,mSize), "Back","menuBtn")){menuState="main";}
		if(GUI.Button(Rect(mSize*5,mSize*7,mSize*2,mSize), "Start","menuBtn"))
		{
			tileSize=Screen.width/ms.myArraySize;
			ms.ResetArray();
		}
	}
	if(menuState=="scores")
	{
		for(var i=0;i<7;i++)
		{
			if(GUI.Button(Rect(mSize,mSize*i+Screen.width/4+mSize,mSize*6,mSize), (i+4).ToString()+"-Tile Score: "+fm.highScore[i].ToString(),"menuBtn")){}
		}

		if(GUI.Button(Rect(mSize,mSize*8+Screen.width/4+mSize,mSize*2,mSize), "Back","menuBtn")){menuState="main";}
	}
	
	
}