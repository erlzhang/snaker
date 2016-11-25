

var speed = 500,
	operation = setInterval(Snake.Move.bind(Snake),speed),
	score = 0,
	topScore = historyScore(),
	scoreContainer = document.getElementById("score"),
	pauseButton = document.getElementById("pause"),
	if_on = 1;
	
Snake.Create();

putPea();
pauseButton.onclick = offon;

function offon(){
	if(if_on == 0){
		Start(speed);
		if_on = 1
		pauseButton.innerText = "暂停";
	}else{
		Pause();
		if_on = 0
		pauseButton.innerText = "继续";
	}
}


function Pause(){
	clearInterval(operation);
}

function Start(s){
	operation = setInterval(Snake.Move.bind(Snake),s);
}


function Reset(){
	Snake.Create();
	operation = setInterval(Snake.Move.bind(Snake),speed);
	score = 0;
	scoreContainer.innerText = "0";
	putPea();
	document.getElementById("failure").style.display = "none";
	pauseButton.onclick = offon;
}
function Fail(){
	Pause();
	document.getElementById("failure").style.display = "block";
	document.getElementById("result").innerText = score;
	updateHisScore(score);
	pauseButton.onclick = "";
}



//键盘操作移动
document.onkeydown = function(event){
	if(event && event.keyCode == 40){
		if(Snake.direction != "down" && Snake.direction != "up"){
			Snake.Turn("down");
		}/*else if(Snake.direction == "down"){
			Pause();
			Start(300);
			document.onkeyup = function(){
				Pause();
				Start(speed);
			}
		}*/
	}
	if(event && event.keyCode == 39){
		if(Snake.direction != "right" && Snake.direction != "left"){
			Snake.Turn("right");
		}
	}
	if(event && event.keyCode == 38){
		if(Snake.direction != "down" && Snake.direction != "up"){
			Snake.Turn("up");
		}
	}
	if(event && event.keyCode == 37){
		if(Snake.direction != "right" && Snake.direction != "left"){
			Snake.Turn("left");
		}
	}
	if(event && event.keyCode == 32){
		offon();
	}
}

function updateScore(){
	score += 10;
	scoreContainer.innerText = score;
}

function historyScore(){
	var s,
		reg = new RegExp("(^| )snakescores=([^;]*)(;|$)")
	if( s = document.cookie.match(reg) ){
		document.getElementById("history").innerText = s[2];
		return s[2];
	}else{
		document.cookie = "snakescores = 0";
		return;
	}
}

function updateHisScore(n){
	if( n > topScore ){
		var d= new Date();
		d.setHours(d.getHours() + (24 * 30)); //保存一个月
		document.cookie = "snakescores=" + n + ";expires=" + d.toGMTString();
		document.getElementById("history").innerText = n;
	}
}
