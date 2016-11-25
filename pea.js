var Pea = document.getElementById("pea");

//随机生成豆豆
function putPea(){
	var randomLeft = Math.floor(Math.random()*50);
	var randomTop = Math.floor(Math.random()*40);
	pea.style.left = randomLeft*10 + "px";
	pea.style.top = randomTop*10 + "px";
}