var Snake = {
	body : document.getElementById("snake"),
	unit : 10,
	Origin : function(){
		this.body.innerHTML = "";//清空全部数据
		this.poLeft = 3;
		this.poTop = 3;
		this.len = 5;
		this.secNumber = 0;
		this.direction = "right";
	},
	Create : function(){
		this.Origin();
		var section = document.createElement("div");
		
		this.body.appendChild(section);
		section.className = "section";
		
		section.style.left = this.Caculate(this.poLeft);
		section.style.top = this.Caculate(this.poTop);
		
		section.setAttribute("data-len",this.len);
		section.setAttribute("data-dir",this.direction);

		section.style.width = this.unit*this.len + 'px';
		
		this.poLeft = this.poLeft + this.len - 1;
		
		this.current = section;
		this.tail = section;
		
		
		return section;
	},
	addSection : function(dir){
		var section = document.createElement("div");
		this.body.appendChild(section);
		section.className = "section";
		section.setAttribute("data-len",1);
		section.setAttribute("data-dir",dir);
		return section;
	},
	Turn:function(dir){
		var section = this.addSection(dir);
		this.secNumber++;
		if ( this.direction == "left" || this.direction == "right"){
			section.style.left = this.Caculate(this.poLeft);
			if(dir == "up"){
				this.poTop = this.poTop - 1;
				section.style.top = this.Caculate(this.poTop);
			}else{
				section.style.top = this.Caculate(++this.poTop);
			}
		}else{
			section.style.top = this.Caculate(this.poTop);
			if(dir == "left"){
				section.style.left = this.Caculate(--this.poLeft);
			}else{
				section.style.left = this.Caculate(++this.poLeft);
			}
		}
		
		this.current = section;
		this.direction = dir;
		this.Decrement(this.tail);
		this.Test();
		return;
	},
	Move : function(){
		if(this.secNumber == 0){
			switch(this.direction){
				case "right":
					var f = this.tail.style.left.slice(0,-2)/10;
					this.tail.style.left = this.Caculate(f+1);
					this.poLeft++;
					break;
				case "left":
					var f = this.tail.style.left.slice(0,-2)/10;
					this.tail.style.left = this.Caculate(f-1);
					this.poLeft--;
					break;
				case "up":
					var f = this.tail.style.top.slice(0,-2)/10;
					this.tail.style.top = this.Caculate(f-1);
					this.poTop--;
					break;
				case "down":
					var f = this.tail.style.top.slice(0,-2)/10;
					this.tail.style.top = this.Caculate(f+1);
					this.poTop++;
					break;
				}
		}else{
			this.Increment(this.current);
			this.Decrement(this.tail);
		}
		this.Test();
	},
	Decrement : function(section){
		var dataLen = section.getAttribute("data-len"),
			dir = section.getAttribute("data-dir");
		section.setAttribute("data-len",--dataLen);
		if(dataLen == 0){
			this.secNumber--;
			this.body.removeChild(this.tail);
			this.tail = document.getElementsByClassName("section")[0];
			return;
		}else{
			switch(dir){
				case "right":
					var f = section.style.left.slice(0,-2)/10;
					section.style.left = this.Caculate(f+1);
					section.style.width = this.Caculate(dataLen);
					break;
				case "left":
					var f = section.style.left.slice(0,-2)/10;
					section.style.width = this.Caculate(dataLen);
					break;
				case "up":
					var f = section.style.top.slice(0,-2)/10;
					section.style.height = this.Caculate(dataLen);
					break;
				case "down":
					var f = section.style.top.slice(0,-2)/10;
					section.style.top = this.Caculate(f+1);
					section.style.height = this.Caculate(dataLen);
					break;
			}
		}
	},
	Increment : function(section){
		var dataLen = section.getAttribute("data-len");
		section.setAttribute("data-len",++dataLen);
		switch(this.direction){
			case "right":
				section.style.width = this.Caculate(dataLen);
				this.poLeft++;
				break;
			case "left":
				section.style.width = this.Caculate(dataLen);
				section.style.left = this.Caculate(--this.poLeft);
				break;
			case "up":
				section.style.height = this.Caculate(dataLen);
				section.style.top = this.Caculate(--this.poTop);
				break;
			case "down":
				section.style.height = this.Caculate(dataLen);
				this.poTop++;
				break;
		}
	},
	Caculate : function(n){
		return this.unit*n + "px";
	},
	Test : function(){
		//撞墙失败
		if (this.poLeft >= 50 || this.poLeft <= 0 || this.poTop <= 0 || this.poTop >= 40 ){
			Fail();
			return false;
		}
		
		//咬到身体失败
		if(this.secNumber >= 3){
			for (var i = (this.secNumber-3); i >= 0 ; i--){
				var item = document.getElementsByClassName("section")[i],
					l = item.style.left.slice(0,-2)/10,
					w = item.style.width.slice(0,-2)/10,
					h = item.style.height.slice(0,-2)/10,
					t = item.style.top.slice(0,-2)/10;
				if(    (this.poLeft >= l) 
					&& (this.poLeft <= ( l + w )) 
					&& (this.poTop >= t) 
					&& (this.poTop <= ( t + h )) 
				){
					Fail();
					return false;
				}
			}
		}
		
		//吃到豆豆
		var peaLeft = pea.style.left.slice(0,-2)/10,
			peaTop = pea.style.top.slice(0,-2)/10;
		
		if( this.poLeft == peaLeft && this.poTop == peaTop ){
			updateScore();
			this.Increment(this.current);
			putPea();
			this.len++;
		}
		
	}
}
