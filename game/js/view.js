//全局变量
var game;//每局游戏对象;
var game_num = 0;//几局游戏


var countdown = {
	much:0,
	i:0,
	show:[	function() {$(".num3").show(500);},
			function() {$(".num3").hide(500);},
			function() {$(".num2").show(500);},
			function() {$(".num2").hide(500);},
			function() {$(".num1").show(500);},
			function() {$(".num1").hide(500);},
			function() {$(".start").show(500);},
			function() {$(".start").hide(500);},
	],
	display:function(){
		//播放中
		if (this.much > 0) {
			countdown.much++;
			setTimeout(function() {countdown.i = 0;},60);
		}
		//空闲中
		else{
			this.much++;
			var ttt = window.setInterval(function(){
				if (countdown.much > 1) {
					var mark = countdown.i;
					if (mark%2 == 0) {
						countdown.show[mark+1]();
					}
					countdown.much--;
				}
				countdown.show[countdown.i]();
				countdown.i++;
				clock.re_run();
				if (countdown.i==8) {
					clearInterval(ttt);
					countdown.i = 0;
					countdown.much--;
					//启动倒计时
					if (game_num == 0) {
						clock.run(level.time(game.lev));
					}
					game_num++;
					clock.con = 1;

					//新游戏入口
					if (game.point == 0) {
						game.new_game();
						animals.clear();
						$(".pl_su").click(game.play_game);
					}
					//重新开始当前关卡
					else{

					}

					return 1;};
			},500)
		}
	}
}
//数据 分数 等级  图像数据
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
	disp:function(p,where){
		;
	}
}
//小动物坐标
var animals = {
	mouse:"-10px 0px",
	dog:"-15px -115px",
	cat:"-13px -228px",
	liyuying:"-13px -350px",
	rabbit:"-13px -470px",
	all_normal:[
	"-10px 0px","-15px -115px","-13px -228px","-13px -350px","-13px -470px"],
	mouse_:"-415px -20px",
	dog_:"-415px -125px",
	cat_:"-415px -240px",
	liyuying_:"-415px -377px",
	rabbit_:"-415px -500px",
	all_:["-415px -20px","-415px -125px","-415px -240px","-415px -377px","-415px -500px"],
	status:1,

	disp:function () {
		$("#line").css("width")=="360px";
		var much_animal = 0;
		var hole = parseInt(Math.random()*10+1,10);//1-9洞
		var animal = parseInt(Math.random()*100,10);//1-100动物
		var time1 = parseInt(Math.random()*1500+1200,10)
		var time2 =  parseInt(Math.random()*200+1800,10);//1500-1800毫秒消失；
		var h = ".hole"+hole;
		var m = 0;//具体动物
		var p = 0;
		if ($(h).css("display")=="block" || $(".hoe"+hole).css("display")=="block") {
			animals.disp();
			return 0;
		};
		//随机洞
		if (animal > 98) {m = 0 ;p = game.point}
		else if (animal > 95) {m = 4 ;p = -(game.point/2)}
		else if (animal > 90) {m = 2; p = 500}
		else if (animal > 10) {m = 1; p = 100}
		else{m = 3; p = -100};
		if ($("#line").css("width") != "0px"){

			//动物出现
				if (animals.status) {
					$(h).css("background-position",animals.all_normal[m]);
					//击打事件
					$(h).bind("click",function(){
						game.point += p;
						$(h).css("display","none");
						$(h).unbind();
						$(".hoe"+hole).css("background-position",animals.all_[m]);
						$(".hoe"+hole).css("display","block");
						//隐藏击中的正常块
						setTimeout(function (){
							if (animals.status){
							$(".hoe"+hole).css("display","none");
							}
						},500);
						console.log("当前分数:"+game.point);
					});
						setTimeout(function(){
							if (animals.status) {
								$(h).css("display","block");
							}else{return 0};
						},time1)
					
				}else{return 0};
			//动物消失
			setTimeout(function (){
				if (animals.status) {
				$(h).css("display","none");
				$(h).unbind();
				animals.disp();
				}else{return 0};
			},time2+time1);
		}
		//到时间
		else{
			//下一关
			$(h).unbind();
			if (game.point >= level.point(game.lev)){
				
			}
			//未通关
			else{
				;
			}
		}
	},
	clear:function(){
		for (var i = 1; i < 10; i++) {
			$(".hole"+i).css("display","none");
			$(".hoe"+i).css("display","none");

		}
	}

}
//计时器函数
var clock = {
	t:1, //t为时间参数控制进度条快慢(s,ms)
	con:0,//i为控制器参数，启动与停止1.启动0.停
	now_long:320,
	ttt:0,
	run:function(t){
		var n = t*20;//循环多少次
		var onece = 320/n;//每0.1秒长度
		this.ttt = window.setInterval(
			function(){
			$("#line").css("width",(clock.now_long)+"px");
			if(clock.con){
				clock.now_long-=onece};},50);
	},
	re_run:function(){
		this.con = 0;
		this.now_long = 320;
	},
	stop:function(){
		clearInterval(this.ttt);
	}
};

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
	this.last_point = 0;//暂存上关，通关分数
	var state = "play";
	this.state_out = state;
	//开始游戏!!重点!!
	//出精灵，计分打印总分
	Game.prototype.new_game = function(){
		animals.status = 1;
		animals.disp();
		animals.disp();
		animals.disp();
	};
	Game.prototype.next_level = function(){
		if (this.point > level.point(this.lev)) {
			//打印分数等级
			num.disp(this.point,$(""));
			if (this.lev < 5) {
				num.disp(level.point(this.lev+1),);
			}
			$("#point_bg").css("display","block");
		}
	};
	Game.prototype.play_game = function(){
		//暂停
		if(state == "play"){
			state = "pause";
			animals.status = 0;
			this.state_out = state;
			$(".pl_su").css("background","url(images/icon.png) no-repeat -390px -197px");
			clock.stop();
		}
		//继续
		else{
			animals.status = 1;
			state = "play";
			this.state_out = state;
			$(".pl_su").css("background","url(images/icon.png) no-repeat -328px -197px");
			animals.clear();
			clock.run(level.time(game.lev));
			game.new_game();
		}
	};
	Game.prototype.now_state = function(){
		return state;
	}
}

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
		$("[class *= 'menu2']").mousedown(menu2.down);
		$("[class *= 'menu2']").mouseup(menu2.up);
		$("[class *= 'menu1']").css("background","url(images/icon.png) no-repeat -15px -698px");
		animals.status = 0;
		game = new Game();
		//倒计时3秒且新游戏
		countdown.display();
		//鼠标事件:点击通关按钮
		(function () {
			$("#point_bg").click(function(){$("#point_bg").css("background","none")});
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
		if (game.now_state() == "pause") {
			game.play_game();
		}
		//打印总分
		
		//启动倒计时
		countdown.display();
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
		var ok = confirm("是否退出游戏？");
		if(ok){
			window.location.href="about:blank";
		}
	}
};
//音乐控制
//鼠标事件1.锤子的点击变化2.菜单点击3.音量设置
(function () {
	$("#game").bind({
	"mousedown":function () {
		$("#game").css("cursor","url('images/new2.ico'),default");
	},
	"mouseup": function () {
		$("#game").css("cursor","url('images/new1.ico'),default");
	}});


	$("[class *= 'menu1']").mousedown(menu1.down);
	$("[class *= 'menu3']").click(menu3.down);
	$("[class *= 'menu4']").click(menu4.down);
	$("[class *= 'menu5']").mousedown(menu5.down);
	$("[class *= 'menu1']").mouseup(menu1.up);
	$("[class *= 'menu5']").mouseup(menu5.up);

	$("#set_sound").click(song_btn.down);
})();