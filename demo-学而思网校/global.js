addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(highlightRows);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
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
//insertAfter函数
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if (parent.lastChild==targetElement) {
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
//addClass函数
function addClass(element,value){
	if (!element.className) {
		element.className=value;
	}else{
		newClassName=element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className=newClassName;
	}
}

function highlightPage(href){
	if (!document.getElementsByTagName) {
		return false;
	};
	if (!document.getElementById) {
		return false;
	}
	var headers=document.getElementsByTagName('header');
	if (headers.length==0) {
		return false;
	}
	var navs=document.getElementsByTagName('nav');
	if (navs.length==0) {
		return false;
	}
	var links=document.getElementsByTagName('a');
	var linkurl;
	//遍历导航链接a
	for (var i = 0; i < links.length; i++) {
		linkurl=links[i].getAttribute('href');//获得导航链接的url地址
		currenturl=window.location.href//当前页面的url；
		if (currenturl.indexOf(linkurl)!=-1) {
			links[i].className="here";//给当前页面添加class
			var linktext=links[i].lastChild.nodeValue.toLowerCase();//保存链接的文本
			document.body.setAttribute("id",linktext);//给当前页面的body添加id，id值等于当前页面链接的文本
		}
	}
}

function moveElement(elementID,final_x,final_y,interval){
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById(elementID)) {
		return false;
	}
	var elem=document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left="0px";
	}
	if (!elem.style.top) {
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if (xpos==final_x && ypos==final_y) {
		return true;
	}
	if (xpos<final_x) {
		var dist=Math.ceil((final_x-xpos)/10);
		xpos=xpos+dist;
	}
	if (xpos>final_x) {
		var dist=Math.ceil((xpos-final_x)/10);
		xpos=xpos-dist;
	}
	if (ypos<final_y) {
		var dist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if (ypos>final_y) {
		var dist=Math.ceil((ypos-final_y)/10);
		ypos=ypos-dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}

function prepareSlideshow(){
	if (!document.getElementsByTagName) {
		return false;
	};
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById("intro")) {
		return false;
	}
	var intro=document.getElementById("intro");
	var slideshow=document.createElement("div");//创建幻灯片的容器
	var frame=document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	slideshow.setAttribute("id","slideshow");
	var preview=document.createElement("img");//幻灯片
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);//调用insertAfter函数，将幻灯片放在段落后面
	var links=document.getElementsByTagName("a");//获取段落里的a标签
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover=function(){
			destination=this.getAttribute("href");//将a标签的链接href属性放在destination中
			if(destination.indexOf("index.html") !=-1) {//链接的href值中若包含'index.html'字符串，就将图片移动到某个位置
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html") !=-1) {//链接的href值中若包含'index.html'字符串，就将图片移动到某个位置
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html") !=-1) {//链接的href值中若包含'index.html'字符串，就将图片移动到某个位置
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html") !=-1) {//链接的href值中若包含'index.html'字符串，就将图片移动到某个位置
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html") !=-1) {//链接的href值中若包含'index.html'字符串，就将图片移动到某个位置
				moveElement("preview",-600,0,5);
			}
		}	
	}
}

function showSection (id){
	var sections=document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i++) {
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display="none";
		} else {
			sections[i].style.display="block";
		}
	}
}

function prepareInternalnav(){
	if (!document.getElementsByTagName) {
		return false;
	};
	if (!document.getElementById) {
		return false;
	}
	var articles=document.getElementsByTagName("article");
	if (articles.length==0) {
		return false;
	}
	var navs=articles[0].getElementsByTagName("nav");
	if (navs.length==0) {
		return false;
	}
	var nav=navs[0];
	var links=nav.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display="none";
		links[i].destination=sectionId;//把当前的id存到当前元素的属性中，这个属性的作用域是永久存在的
		links[i].onclick=function(){
			showSection(this.destination);
			return false;
		}
	}
}

function showPic(whichpic){
	if (!document.getElementById("placeholder")) {
		return false;
	}
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if (!document.getElementById("description")) {
		return false;
	}
	if (whichpic.getAttribute("title")) {
		var text=whichpic.getAttribute("title");
	}else{
		var text="";
	}
	var description=document.getElementById("description");
	if (description.firstChild.nodeType==3) {
		description.firstChild.nodeValue=text;
	}
	return false;
}
function preparePlaceholder(){
	if (!document.createElement) {
		return false;
	}
	if (!document.createTextNode) {
		return false;
	}
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById("imagegallery")) {
		return false;
	}
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
    placeholder.setAttribute("alt","my image gallery");
    var description=document.createElement("p");
    description.setAttribute("id","description");
    var desctext=document.createTextNode("Choose an image");
    description.appendChild(desctext);
    var gallery=document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}
function prepareGallery(){
	if (!document.getElementsByTagName) {
		return false;
	} 
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById("imagegallery")) {
		return false;
	}
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick=function(){
			showPic(this);
			return false;
		}                                 
	}
}
function highlightRows(){
	if (!document.getElementsByTagName) {
		return false;
	}
	var rows=document.getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassName=rows[i].className;//当前的class名存到当前变量的属性中
		rows[i].onmouseover=function(){
			addClass(this,"highlight");
		}
		rows[i].onmouseout=function(){
			this.className=this.oldClassName;
		}
	}
}
function focusLabels(){
	if (!document.getElementsByTagName) {
		return false;
	}
	var labels=document.getElementsByTagName("label");
	for (var i = 0; i < labels.length; i++) {
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick=function(){
			var id=this.getAttribute("for");
			if (!document.getElementById(id)) {
				return false;
			}
			var element=document.getElementById(id);
			element.focus();
		}
	}
}
//占位符在获得焦点和离开时的行为
function resetFields(whichform){
	if (Modernizr.input.placeholder) return;
	for (var i = 0; i < whichform.elements.length; i++) {
		var element=whichform.elements[i];
		if (element.type="submit") continue;
		var check=element.placeholder||element.getAttribute("placeholder");
		if (!check) continue;
		element.onfocus=function(){
			var text=this.placeholder ||this.getAttribute("placeholder");
			if(this.value==text){//若输入的值等于默认的值，则将字段的值设为空
				this.className="";
				this.value="";
			}
		}
		element.onblur=function(){
			if(this.value==""){
				this.className="placeholder";
				this.value=this.placeholder||this.getAttribute("placeholder");
			}
		}
		element.onblur();
	}
}
function prepareForms(){
	for (var i = 0; i < document.forms.length; i++) {
		var thisform=document.forms[i];
		resetFields(thisform);
		thisform.onsubmit=function(){
			if(!validateForm(this)) {
				return false;
			}
			var article=document.getElementsByTagName("article")[0];
			if (submitFormWithAjax(this,article)) {
				return false;
			}
			return true;
		}
	}
}
function isFilled(field) {
	if (field.value.replace(' ','').length == 0) {return false};
		var placeholder=field.placeholder||field.getAttribute("placeholder");
	return(field!=placeholder);
}
function isEmail(field){
	return (field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);
}
function validateForm(whichform){
	for (var i = 0; i < whichform.elements.length; i++) {
		var element=whichform.elements[i];
		if (element.required=="required") {
			if(!isFilled(element)){
				alert("Please fill in the"+element.name+"field.");
				return false;
			}
		}
		if (element.type=="email") {
			if (!isEmail(element)) {
				alert("The"+element.name+"field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}
function getHTTPObject(){
	if (typeof XMLHttpRequest=="undefined") {
		XMLHttpRequest=function(){
			try { return new ActiveObject("Msxml2.XMLHTTP.6.0");}
			catch (e) {};
			try { return new ActiveObject("Msxml2.XMLHTTP.3.0");}
			catch (e) {};
			try { return new ActiveObject("Msxml2.XMLHTTP");}
			catch (e) {};
			return false;
		}
	}
	return new XMLHttpRequest();
}
function displayAjaxLoading(element) {
	while (element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content=document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","loading...");
	element.appendChild(content);
}
function submitFormWithAjax(whichform,thetarget){
	var request=getHTTPObject();
	if (!request) {return false;}
	displayAjaxLoading(thetarget);
	var dataParts=[];
	for (var i = 0; i < whichform.elements.length; i++) {
		var element=whichform.elements[i];
		dataParts[i]=element.name+"="+encodeURIComponent(element.value)
	}
	var data=dataParts.join("&");//收集到的项用和号连接起来
	request.open("POST",whichform.getAttribute("action"),true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if (request.readyState==4) {//可以访问服务器发回来的数据
			if (request.state==200||request.state==0) {
				var matches=request.resposeText.match(/<article>([\s\S]+)<\/article/);//查找一个字符串，这个字符串以<article>开头，后面跟一个或多个空格或非空格以</article>结束
				if (matches.length>0) {
					thetarget.innerHTML=matches[1];//把捕获组内匹配的部分赋值给目标元素
				}else{
					thetarget.innerHTML="<p>0ops,there was an error.Sorry</p>"
				}
			}
			else{
				thetarget.innerHTML="<p>"+request.stateText+"</p>"
			}
		}
	};
	request.send(data);
	return true;
}
