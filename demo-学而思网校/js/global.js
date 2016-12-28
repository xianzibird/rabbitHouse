addLoadEvent(carouselShow);
addLoadEvent(hoverTooltip);
addLoadEvent(updateEndTime);
addLoadEvent(tabControl);
addLoadEvent(hoverHideTips);
//文档完全加载后需要运行的函数
function addLoadEvent(func) {
	var oldload=window.onload;
	if (typeof window.onload!='function') {
		window.onload=func;
	}else{
		window.onload=function(){
			oldload();
			func();
		}
	}
}
// 轮播图
function carouselShow() {
     $("#slidershow").carousel({
     	interval: 3000
     });
     $("#carousel-page-turn-5").carousel({
     	interval: 5000
     });
     $("#carousel-page-turn-3").carousel({
     	interval: 6000
     });
     $("#carousel-page-turn-2").carousel({
     	interval: 7000
     });
     $("#carousel-page-turn").carousel({
    	interval: 9000
     });
}
// 左侧二级导航效果
function hoverTooltip() {
	var item = $("#categories .categories-dd-item");//一级菜单
	var categorySubject = $(".category-subject");//二级菜单
	$(item).each(function(){
		// 鼠标移入
		$(this).mouseover(function() {
			// 获取到当前按钮的data-id属性值
			var dataID = $(this).attr("data-id");
			$(this).addClass('hover').siblings().removeClass('hover');
			$(categorySubject).each(function(){
				// 在二级导航中找到和当前data-id属性值一样的.category-subject
				$(categorySubject).eq(dataID-1).addClass('hover').siblings().removeClass('hover').parent().addClass('hover');
			});
		});
		//鼠标移出 先判断离开前鼠标是否在二级导航上，若在，则离开二级导航时才让一级导航隐藏
	    $(this).mouseout(function(e) {
	    	var x=e.offsetX, 
	      		y=e.offsetY;
	      	var dataID = $(this).attr("data-id");
	      		// console.log("x="+x);
	      		// console.log("y="+y);
	      		// console.log($(this).width());
	      		// console.log($(this).height());
	  		if ( x > $(this).width() || y > $(this).height() + 400) {
	  			$(categorySubject).eq(dataID-1).mouseover(function(){
	  				$(this).addClass('hover').siblings().removeClass('hover').parent().addClass('hover');
	  				$(item).eq(dataID-1).addClass('hover');
	  			});

	  			$(categorySubject).eq(dataID-1).mouseout(function(){
	  				$(this).removeClass('hover').parent().removeClass('hover');
	  				$(item).eq(dataID-1).removeClass('hover');
	  			});
	  		}else {
	  			// 获取到当前按钮的data-id属性值
				$(this).removeClass('hover');
				$(categorySubject).each(function(){
				// 在二级导航中找到和当前data-id属性值一样的.category-subject
				$(categorySubject).eq(dataID-1).removeClass('hover').parent().removeClass('hover');
				});
	  		};
		}); 
	})
}	
// 倒计时效果
function updateEndTime() {
	var endTime = new Date("2016/12/18,18:00:00").getTime(),//截止时间的毫秒数
		now = new Date();//现在时间
		nowTime = now.getTime();//现在时间的毫秒数
	var leftTime = parseInt((endTime - nowTime) / 1000);//截至时间和现在时间的时间差(秒数)
	date =  parseInt(leftTime /3600 / 24);
	hour =  parseInt((leftTime /3600) % 24);
	minute = parseInt((leftTime /60) % 60);
	second = parseInt(leftTime % 60);
	if (leftTime>0) {
		$(".settime").html(date + "<span>天</span>"+hour+"<span>时</span>"+minute+"<span>分</span>"+second+"<span>秒</span>");
	}else {
		$(".settime").html("优惠活动已经结束啦");
		$(".settime").hide();
		clearInterval(timer);
	}
	var timer = setTimeout(updateEndTime,1000);
}
// 选项卡切换
function tabControl() {
	var answer = $(".problem .answer");
	var title = $(".problem .title");
	// 循环遍历每一个title
	$(title).each(function(){
		// 鼠标滑过事件
		$(this).mouseover(function(){
			var index = $(this).index();
			//console.log(index);
			console.log($(answer).eq(1).index());
			// console.log(title.length);
			$(answer).each(function(){
				$(answer).css("display","none").eq(index).css("display","block");
			})
		});
		//鼠标离开事件
		$(this).mouseout(function() {
			var index = $(this).index();
			$(answer).each(function(){
				$(answer).css("display","none").eq(index).css("display","none").eq(0).css("display","block");
			})
		})
	})
}
// 显示隐藏
function hoverHideTips(){
	var dropdown = $(".dropdown");
	var dropdownBody = $(".dropdown .dropdown-body");
	//console.log($(dropdown).length);
	$(dropdown).each(function(){
		$(this).mouseenter(function(){
			var index = $(this).index(".dropdown");
			//console.log(index);
			$(this).addClass("hover");
			$(dropdownBody).eq(index).css("display","block");
		});
		$(this).mouseleave(function(){
			var index = $(this).index(".dropdown");
			$(this).removeClass("hover");
			$(dropdownBody).eq(index).css("display","none");
		});
	})
}

