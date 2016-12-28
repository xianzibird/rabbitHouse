addLoadEvent(carouselShow);
addLoadEvent(tabControl);
addLoadEvent(returnTop);
addLoadEvent(fixFooter);
addLoadEvent(scrollAnimate);
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
}

function tabControl(){
	var spanTab = $(".section7").find("h2 .span-tab");
	var tabContent = $(".section7").find(".tab-content");
	$(spanTab).each(function(){
		// 鼠标滑过事件
		$(this).mouseover(function(){
			var index = $(this).index(".span-tab");
			if($(this).hasClass(".tab-active")){
				return;
			}else{
				$(this).addClass("tab-active");
				$(this).siblings(".span-tab").removeClass("tab-active");
				$(tabContent).eq(index).show().siblings(".tab-content").hide();
			}
		})
	})
}
// 返回顶部
function returnTop(){
	var top = $("#footer").find(".t-3");
	// 点击事件
	$(top).click(function(){
		$('html,body').animate({scrollTop: 0},800);
		return false;
	})
}
function fixFooter(){
	var footer = $("#footer");
	var sectionFooter = $(".section-f1-fix");
	var offsetTop = $(footer).offset().top;
	var scrollTop = $(document).scrollTop();
	var height = $(window).height();
	$(window).scroll(function(){
		// console.log("offset:"+offsetTop);
		// console.log("scroll:"+scrollTop);
		// console.log("height:"+height);
		// console.log(scrollTop + height);
		 if (scrollTop + height > offsetTop) {
			$(sectionFooter).hide(".section-f1-fix");
		}
	})
}
function scrollAnimate(){
	console.log($(".fadeInUp").length);
	$(window).scroll(function(){
		//$('html,body').animate({scrollTop:$(".fadeInUp").offset().top},1000)
	})
	
}