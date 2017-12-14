//全局变量
var game;//每局游戏对象;

//倒计时
var countdown = {
	three:0,
	two:0,
	one:0,
	start:0,

}
//小动物
var animals = {
	mouse:0,
	dog:0,
	
}

//计时器函数
var gotime = {
	t:1, //t为时间参数控制进度条快慢(s,ms)
	con:1,//i为控制器参数，启动与停止1.启动0.停
	runtime:function(t){
		var ttt;
		if(this.con) {
			var long = t*20;//循环多少次
			var onece = 320/long;//每0.1秒长度
			var i = 0;
			//鼠标事件在游戏中点击暂停的行为
			$(".pl_su").mouseup(function(){
				alert(game.state_out);
				if (game.state_out == "play"){
					alert(123);
					clearInterval(ttt);
				}
				else{
					ttt = window.setInterval(function(){$("#line").css("width",(320-onece*i)+"px");i++;},50);
				}
				game.play_game();//暂停按钮样式变换
			});
			//鼠标事件在游戏中点击重新开始的行为
			$("[class *= 'menu2']").mousedown(menu2.down);
			$("[class *= 'menu2']").mouseup(function(){clearInterval(ttt);$("#line").css("width","320px");menu2.up();});
			//鼠标事件在游戏中点击新游戏的行为
			$("[class *= 'menu1']").click(function(){clearInterval(ttt);$("#line").css("width","320px");menu1.up()});
			ttt = window.setInterval(
				function(){
				$("#line").css("width",(320-onece*i)+"px");i++;},50);
		}
}}
//数据 分数 等级
var num = {
	//图像数据
	zero:"url(images/icon.png) no-repeat -25px -241px",
	one:"url(images/icon.png) no-repeat -42px -241px",
	two:"url(images/icon.png) no-repeat -60px -241px",
	three:"url(images/icon.png) no-repeat -79px -241px",
	four:"url(images/icon.png) no-repeat -97px -241px",
	five:"url(images/icon.png) no-repeat -115px -241px",
	six:"url(images/icon.png) no-repeat -133px -241px",
	seven:"url(images/icon.png) no-repeat -151px -241px",
	eight:"url(images/icon.png) no-repeat -168px -241px",
	nine:"url(images/icon.png) no-repeat -187px -241px",
	point_size_width:"16px",
	point_size_heigth:"27px",
	points_size_width:0,
	disp:function(p){
		;
	}
}
//等级时间与过关分数
var level = {
	"time":function(l){
		switch (l) {
			case 1:
				return 60;
				break;
			case 2:
				return 50;
				break;
			case 3:
				return 45;
				break;
			case 4:
				return 35;
				break;
			case 5:
				return 30;
				break;
		}
	},
	point:function(l){
		switch (l) {
			case 1:
				return 6000;
				break;
			case 2:
				return 13000;
				break;
			case 3:
				return 21000;
				break;
			case 4:
				return 29000;
				break;
			case 5:
				return 40000;
				break;
		}
	}
}
//游戏对象,开始游戏 暂停游戏 继续游戏
function Game() {
	this.id = "name";
	this.point = 0;
	this.lev = 1;
	this.last_point = 0;
	var state = "play";
	this.state_out = state;
	//开始游戏！！！重点！！
	Game.prototype.new_game = function(){
		;
	};
	Game.prototype.next_level = function(){
		$("#point_bg").css("display","none");
	};
	Game.prototype.play_game = function(){
		//暂停
		if(state == "play"){
			state = "pause";
			this.state_out = state;
			$(".pl_su").css("background","url(images/icon.png) no-repeat -390px -197px");
		}
		//继续
		else{
			state = "play";
			this.state_out = state;
			$(".pl_su").css("background","url(images/icon.png) no-repeat -328px -197px");
		}
	};
}
//定义菜单类
//声音菜单
var song_btn = {
	down:function () {
		if ($("#bgsound")[0].paused){
			$("#bgsound")[0].play();
			$("#set_sound").css("background","url(images/icon.png) no-repeat -330px -130px")
		}
		else{
			$("#bgsound")[0].pause();
			$("#set_sound").css("background","url(images/icon.png) no-repeat -330px -80px")
		}
	}
}
//新游戏
var menu1 = {
	down:function(){
		$("[class *= 'menu1']").css("background","url(images/icon.png) no-repeat -193px -695px");
	},
	up:function(){
		$("[class *= 'menu1']").mouseup(menu1.up);
		$("[class *= 'menu1']").css("background","url(images/icon.png) no-repeat -15px -698px");
		game = new Game();
		//新游戏
		game.new_game();
		//倒计时3秒

		//启动倒计时
		gotime.runtime(level.time(game.lev));

		//打印分数等级
		num.disp(game.point);
		num.disp(game.lev);
		//鼠标事件:点击通关按钮
		(function () {
			$("#point_bg").click(game.next_level);
		})();
	}
};

//重新开始
var menu2 = {
	down:function(){
		$("[class *= 'menu2']").css("background","url(images/icon.png) no-repeat -192px -767px");
	},
	up:function(){
		$("[class *= 'menu2']").css("background","url(images/icon.png) no-repeat -15px -770px");
		game.point = game.last_point;
		//启动倒计时
		gotime.runtime(level.time(game.lev));
	}
};
//设置
var menu3 = {
	down:function(){
		//处于显示
		if ($("#root_set").css("display") != "none"){
			$("[class *= 'menu3']").css("background","url(images/icon.png) no-repeat -15px -552px");
			$("#root_set").hide(1000);
		}
		//处于隐藏
		else {
			$("[class *= 'menu3']").css("background","url(images/icon.png) no-repeat -193px -552px");
			$("#explain").hide(1000);
			$("[class *= 'menu4']").css("background","url(images/icon.png) no-repeat -15px -622px");
			$("#root_set").show(1000);
		}
	}
};
//游戏说明
var menu4 = {
	down:function(){
		if ($("#explain").css("display") != "none"){
			$("[class *= 'menu4']").css("background","url(images/icon.png) no-repeat -15px -622px");
			$("#explain").hide(1000);
		}
		else{
			$("[class *= 'menu4']").css("background","url(images/icon.png) no-repeat -192px -622px");
			$("[class *= 'menu3']").css("background","url(images/icon.png) no-repeat -15px -552px");
			$("#root_set").hide(1000);
			$("#explain").show(1000);
	}
	},
};
//退出
var menu5 = {
	down:function(){
		$("[class *= 'menu5']").css("background","url(images/icon.png) no-repeat -196px -838px");
	},
	up:function(){
		$("[class *= 'menu5']").css("background","url(images/icon.png) no-repeat -18px -838px");
	}
};
//音乐控制
//鼠标事件1.锤子的点击变化
(function () {
	$("#game").bind({
	"mousedown":function () {
		$("#game").css("cursor","url('images/hammer2.ico'),default");
	},
	"mouseup": function () {
		$("#game").css("cursor","url('images/hammer1.ico'),default");
	}});
})();
//鼠标事件2.菜单点击
(function () {
	$("[class *= 'menu1']").mousedown(menu1.down);
	$("[class *= 'menu3']").click(menu3.down);
	$("[class *= 'menu4']").click(menu4.down);
	$("[class *= 'menu5']").mousedown(menu5.down);
	$("[class *= 'menu1']").mouseup(menu1.up);
	$("[class *= 'menu5']").mouseup(menu5.up);
})();
//鼠标事件3.音量设置
(function () {
	$("#set_sound").click(song_btn.down);
})();

