/*function readLog(file){
    var rawFile = new XMLHttpRequest();
    var allText;
    var lines;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function(){
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                lines = allText.split('\n');
                alert(lines);
            }
        }
        else{
        }
    }
    rawFile.send(null);
}*/
//this bit is for taking the file which is on the server
