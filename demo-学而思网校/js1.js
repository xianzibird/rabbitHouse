addLoadEvent(carouselShow);
addLoadEvent(hoverTooltip);
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
//一级导航hover显示二级菜单
function hoverTooltip() {
	var item = $("#categories .categories-dd-item");//一级菜单
	var categorySubject = $(".category-subject");//二级菜单
	var categoriesLayer = $(".category-layer");
	var last_state = 0;
	var state1 = 0; //0不在菜单上；1在1级菜单上；2在2级菜单上
	var state2 = 0;
	var tmp;

	$(item).each(function(){
		
		$(this).mouseover(function(){
			state1 = 1;
			console.log("item_over.state1="+state1);
			show1($(this), state1);
			show2($(this), state1);
			tmp = $(this);
		});
		$(this).mouseout(function(){
			state1 = 0;
			console.log("item_leave.state1="+state1);
			tmp = $(this);
			setTimeout(function(){
				var _state2 = state2;
				hide1(tmp, state1, _state2);
				hide2(tmp, state1, _state2);
				return 0;
			}, 500);

			
		});
	});

	$(categorySubject).each(function(){
		$(this).mouseover(function(){
			state2 = 2;
			console.log("cate_over.state2="+state2);
			show1(tmp, state2);
			show2(tmp, state2);
		});
		$(this).mouseout(function(){
			state2 = 0;
			console.log("cate_leave.state2="+state2);
			setTimeout(function(){
				var _state1 = state1;
				hide1(tmp, _state1, state2);
				hide2(tmp, _state1, state2);
				return 0;
			}, 500);
			
		});
	});

	

	function show1(e, s){
		e.addClass('hover').siblings().removeClass('hover');
		last_state = 1;
		console.log("show1.last_state="+last_state);
	}

	function hide1(e, s1, s2){
		console.log("hide1.e="+e+"hide1.state1="+s1+",hide1.state2="+s2);
		if(s1 == 0 && s2 == 0){
			e.removeClass('hover');
			last_state = 0;
			
			console.log("hide1.last_state="+last_state);
		};
	}

	function show2(e, s){
		var dataID = e.attr("data-id");
		$(categorySubject).each(function(){
			$(categorySubject).eq(dataID-1).addClass('hover').siblings().removeClass('hover').parent().addClass('hover');
		})
		last_state = 1;
		console.log("show2.last_state="+last_state);
	};

	function hide2(e, s1,s2){
		console.log("hide2.e="+e+"hide2.state1="+s1+",hide2.state2="+s2);
		if(s1 == 0 && s2 == 0){
			var dataID = e.attr("data-id");
			$(categorySubject).each(function(){
				$(categorySubject).eq(dataID-1).removeClass('hover').parent().removeClass('hover');
			});
			last_state = 0;
			
			console.log("hide2.last_state="+last_state);
		};
		
	};





	// $(item).each(function(count){
	// 	// 鼠标移入
	// 	$(this).hover(function(e) {
	// 		// 获取到当前按钮的data-id属性值
	// 		var dataID = $(this).attr("data-id");
	// 		$(this).addClass('hover').siblings().removeClass('hover');
	// 		$(categorySubject).each(function(){
	// 			// 在二级导航中找到和当前data-id属性值一样的.category-subject
	// 			$(categorySubject).eq(dataID-1).addClass('hover').siblings().removeClass('hover').parent().addClass('hover');
	// 		});
	// 	});
	// 	// 鼠标移出 先判断离开前鼠标是否在二级导航上，若在，则离开二级导航时才让一级导航隐藏
	//     $(this).mouseleave(function(e) {
	//     	var x=e.offsetX, 
	//       		y=e.offsetY;
	//       	var dataID = $(this).attr("data-id");
	//       		// console.log("x"+x);
	//       		// console.log($(this).width())
 //      		if ( x > $(this).width() || y > $(this).height()) {
 //      			$(categorySubject).eq(dataID-1).mouseleave(function(){
 //      				$(this).removeClass('hover').parent().removeClass('hover');
 //      				$(item).eq(dataID-1).removeClass('hover');
 //      			}) 
 //      		}else {
 //      			// 获取到当前按钮的data-id属性值
				
	// 			$(this).removeClass('hover');
	// 			$(categorySubject).each(function(e){
	// 			// 在二级导航中找到和当前data-id属性值一样的.category-subject
	// 			$(categorySubject).eq(dataID-1).removeClass('hover').parent().removeClass('hover');
	// 			});
 //      		}
	// 	}); 

	// });
}         
