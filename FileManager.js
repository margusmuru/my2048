#pragma strict
var ms:MainScript;
var filePath:String;

var highScore:int[];
var savedArraySize:int;


function Start () {
	filePath= Application.persistentDataPath+"/settings.txt";
	ReadFile();
}


function WriteFile()
{
    savedArraySize=ms.myArraySize;

    var sw : StreamWriter = new StreamWriter(filePath);
    for(var i=0;i<7;i++){sw.WriteLine(highScore[i]);}

    sw.WriteLine(savedArraySize);
    for(i=0;i<savedArraySize;i++){
    	for(var j=0;j<savedArraySize;j++)
    	{
    		sw.WriteLine(ms.myArray[i,j]);
    	}
    }	
    sw.Flush();
    sw.Close();
}
 
function ReadFile() 
{    
  
    try {
    	var sr = new File.OpenText(filePath);
	    var input:String;
	    for(var i=0;i<7;i++)
	    {
	    	input = sr.ReadLine(); if (input == null) {break;}
        	highScore[i]=System.Int32.Parse(input);
	    }
	    input = sr.ReadLine();
        savedArraySize=System.Int32.Parse(input);
	    for(i=0;i<savedArraySize;i++){
	    	for(var j=0;j<savedArraySize;j++)
	    	{
	    		input = sr.ReadLine(); if (input == null) {break;}
        		ms.myArray[i,j]=System.Int32.Parse(input);
	    	}
    	}	
    	sr.Close();
    	if(savedArraySize!=0){ms.myArraySize=savedArraySize;}
    	ms.highScore=highScore[savedArraySize-4];
    	Debug.Log("settings file read");
    }
    catch (e){print(e.Message);Debug.Log("settings file failed to read");}
    
}

