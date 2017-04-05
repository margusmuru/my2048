#pragma strict
import System.IO;
@script ExecuteInEditMode()
var fm:FileManager;
var guiScript:GUIScript;

var versionNr:String;
var score:int=0;
private var savedScore:int;
var highScore:int;

var myArraySize:int=4;
var myArray:int[,]=new int[10,10];
var savedArray:int[,]=new int[10,10];

var gameMode:String="endless";
private var tile2048:boolean=false;
var canUndo:boolean=false;

//touch variables
//distance between two positions
private var f_touch_delta:float;
//end-touch position
private var v2_current_Position:Vector2;
//start-touch position
private var v2_previous_Position:Vector2;
//active gameObject
// var Object_to_move:GameObject;
//how much movement is a swipe
var i_comfort:int;


function Start () 
{
	
	
}

function Update () 
{
	if(guiScript.menuState=="inGame")
	{
		if(Input.GetKeyDown(KeyCode.LeftArrow))		{ToLeft();}
		if(Input.GetKeyDown(KeyCode.RightArrow))	{ToRight();}
		if(Input.GetKeyDown(KeyCode.UpArrow))		{ToUp();}
		if(Input.GetKeyDown(KeyCode.DownArrow))		{ToDown();}
		
		

		if (Input.touchCount ==1 && Input.GetTouch(0).phase == TouchPhase.Began)
		{
			v2_previous_Position=Input.GetTouch(0).position;
		}
		if (Input.touchCount ==1 && Input.GetTouch(0).phase == TouchPhase.Ended) 
		{
			v2_current_Position=Input.GetTouch(0).position;

			f_touch_delta=v2_current_Position.magnitude - v2_previous_Position.magnitude;

			if(Mathf.Abs(f_touch_delta)>i_comfort)
			{
				//its a slide
				if(f_touch_delta>=0)
				{
					if(v2_current_Position.x - v2_previous_Position.x > v2_current_Position.y - v2_previous_Position.y)
					{
						ToRight();
					}
					else
					{
						ToUp();
					}
				}
				else if(f_touch_delta<0)
				{
					if(v2_current_Position.x - v2_previous_Position.x > v2_current_Position.y - v2_previous_Position.y)
					{
						ToDown();
					}
					else
					{
						ToLeft();
					}
				}
				
			}
		}
	}
	else
	{
		
	}
}
function ToLeft()
{
	SaveLastState();
	var movements:boolean=false;
	for(var counter=0;counter<(myArraySize-1);counter++){
		for(var i=0;i<myArraySize;i++){
			for(var j=0;j<myArraySize;j++){if(i<(myArraySize-1) && myArray[i,j]==0 && myArray[i+1,j]!=0)
				{myArray[i,j]=myArray[i+1,j]; myArray[i+1,j]=0; movements=true;}}
		} //for i
	}
	for(i=0;i<myArraySize;i++){
		for(j=0;j<myArraySize;j++){
			if(i<(myArraySize-1) && myArray[i,j]!=0 && myArray[i,j]==myArray[i+1,j])
			{
				myArray[i,j]=myArray[i,j]+myArray[i+1,j];
				score+=myArray[i,j];
				myArray[i+1,j]=0;
				movements=true;
			}
		} //for j
	} //for i
	for(counter=0;counter<(myArraySize-1);counter++){
		for(i=0;i<myArraySize;i++){
			for(j=0;j<myArraySize;j++){if(i<(myArraySize-1) && myArray[i,j]==0 && myArray[i+1,j]!=0)
				{myArray[i,j]=myArray[i+1,j]; myArray[i+1,j]=0; movements=true;}}
		} //for i
	}
	if(movements){SpawnNumber();}
}
function ToRight()
{
	SaveLastState();
	var movements:boolean=false;
	for(var counter=0;counter<(myArraySize-1);counter++){
		for(var i=0;i<myArraySize;i++){
			for(var j=0;j<myArraySize;j++){if(i>0 && myArray[i,j]==0 && myArray[i-1,j]!=0)
				{myArray[i,j]=myArray[i-1,j]; myArray[i-1,j]=0; movements=true;}}
		} //for i
	}
	for(i=(myArraySize-1);i>=0;i--){
		for(j=0;j<myArraySize;j++){
			if(i>0 && myArray[i,j]!=0 && myArray[i,j]==myArray[i-1,j])
			{
				myArray[i,j]=myArray[i,j]+myArray[i-1,j];
				score+=myArray[i,j];
				myArray[i-1,j]=0;
				movements=true;
			}
		} //for j
	} //for i
	for(counter=0;counter<(myArraySize-1);counter++){
		for(i=0;i<myArraySize;i++){
			for(j=0;j<myArraySize;j++){if(i>0 && myArray[i,j]==0 && myArray[i-1,j]!=0)
				 {myArray[i,j]=myArray[i-1,j]; myArray[i-1,j]=0; movements=true;}}
		} //for i
	}
	if(movements){SpawnNumber();}
}
function ToUp()
{
	SaveLastState();
	var movements:boolean=false;
	for(var counter=0;counter<(myArraySize-1);counter++){
		for(var i=0;i<myArraySize;i++){
			for(var j=0;j<myArraySize;j++){if(j<(myArraySize-1) && myArray[i,j]==0 && myArray[i,j+1]!=0)
				{myArray[i,j]=myArray[i,j+1]; myArray[i,j+1]=0; movements=true;}}
		} //for i
	}
	for(i=0;i<myArraySize;i++){
		for(j=0;j<myArraySize;j++){
			if(j<(myArraySize-1) && myArray[i,j]!=0 && myArray[i,j]==myArray[i,j+1])
			{
				myArray[i,j]=myArray[i,j]+myArray[i,j+1];
				score+=myArray[i,j];
				myArray[i,j+1]=0;
				movements=true;
			}
		} //for j
	} //for i
	for(counter=0;counter<(myArraySize-1);counter++){
		for(i=0;i<myArraySize;i++){
			for(j=0;j<myArraySize;j++){if(j<(myArraySize-1) && myArray[i,j]==0 && myArray[i,j+1]!=0)
				{myArray[i,j]=myArray[i,j+1]; myArray[i,j+1]=0; movements=true;}}
		} //for i
	}
	if(movements){SpawnNumber();}
}
function ToDown()
{
	SaveLastState();
	var movements:boolean=false;
	for(var counter=0;counter<(myArraySize-1);counter++){
		for(var i=0;i<myArraySize;i++){
			for(var j=0;j<myArraySize;j++){if(j>0 && myArray[i,j]==0 && myArray[i,j-1]!=0)
				{myArray[i,j]=myArray[i,j-1]; myArray[i,j-1]=0; movements=true;}}
		} //for i
	}
	for(i=0;i<myArraySize;i++){
		for(j=(myArraySize-1);j>=0;j--){
			if(j>0 && myArray[i,j]!=0 && myArray[i,j]==myArray[i,j-1])
			{
				myArray[i,j]=myArray[i,j]+myArray[i,j-1];
				score+=myArray[i,j];
				myArray[i,j-1]=0;
				movements=true;
			}
		} //for j
	} //for i
	for(counter=0;counter<(myArraySize-1);counter++){
		for(i=0;i<myArraySize;i++){
			for(j=0;j<myArraySize;j++){if(j>0 && myArray[i,j]==0 && myArray[i,j-1]!=0)
				{myArray[i,j]=myArray[i,j-1]; myArray[i,j-1]=0; movements=true;}}
		} //for i
	}
	if(movements){SpawnNumber();}
}


function SpawnNumber()
{
	var freeTile:boolean=false;
	var movesLeft:boolean=false;
	for(var i=0;i<myArraySize;i++){
		for(var j=0;j<myArraySize;j++){if(myArray[i,j]==0) freeTile=true;}}

	if(freeTile){SetNumber();}
	//check if any moves left

	for(i=0;i<myArraySize;i++){
		for(j=0;j<myArraySize;j++)
		{
			if(myArray[i,j]==0){movesLeft=true;}
			if(myArray[i,j]==2048){tile2048=true;}
		}
	}
	if(!movesLeft)
	{
		for(i=0;i<myArraySize;i++){
			for(j=0;j<myArraySize;j++)
			{
				if(i<(myArraySize-1) && myArray[i,j]==myArray[i+1,j]){movesLeft=true;}
				if(j<(myArraySize-1) && myArray[i,j]==myArray[i,j+1]){movesLeft=true;}
			}
		}
	}
	//no moces left? end game!
	if(!movesLeft){guiScript.menuState="endGame";}
	//check GameMode end condition
	if(gameMode=="2048" && tile2048){guiScript.menuState="winGame";}

	//after-procedures
	if(score>highScore)
	{
		highScore=score;
		fm.highScore[myArraySize-4]=highScore;
	}
	//save state
	fm.WriteFile();
}
function SaveLastState()
{
	for(var i=0;i<myArraySize;i++){
			for(var j=0;j<myArraySize;j++){
				savedArray[i,j]=myArray[i,j];
			}}
	savedScore=score;
	canUndo=true;
}
function ResetArray()
{
	while(Input.touchCount!=0){yield WaitForSeconds(0.1);}
	for(var i=0;i<10;i++){
		for(var j=0;j<10;j++){myArray[i,j]=0;}}
	score=0;
	highScore=fm.highScore[myArraySize-4];
	
	SetNumber();
	SetNumber();	
	guiScript.menuState="inGame";
}
function UndoMove()
{
	while(Input.touchCount!=0){yield WaitForSeconds(0.1);}
	//remove last score adding
	score=savedScore;
	for(var i=0;i<myArraySize;i++){
		for(var j=0;j<myArraySize;j++){
			myArray[i,j]=savedArray[i,j];
		}}
	canUndo=false;
	guiScript.menuState="inGame";
}
function SetNumber()
{
	var x:int;
	var y:int;
	var tmp:int;
	Random.seed=score+1;
	while(true)
	{
		x=Random.Range(0,myArraySize);
		y=Random.Range(0,myArraySize);
		if(myArray[x,y]==0)
		{
			tmp=Random.Range(0,12);
			if(tmp==3){myArray[x,y]=4; break;}
			else{myArray[x,y]=2; break;}
		}
	}
}