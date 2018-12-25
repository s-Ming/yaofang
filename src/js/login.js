require(['config'],function(){
	require(['jquery'],function($){
    	//tab切换
    	
    		var tab_1 = $(".form-tab div");
    		var tab_2 = $(".form_div_total>div");
    		console.log(tab_2)
    		for(var i=0;i<tab_1.length;i++){
    			tab_1[i].idx = i;
    			tab_1[i].onclick = function(){
    				for(var j=0;j<tab_1.length;j++){
              //去除高亮
              tab_1[j].className = '';
              tab_2[j].style.display = 'none';
            }
            tab_1[this.idx].className = 'gaoliang';
            tab_2[this.idx].style.display = 'block';  
          }  
        }
      

    })
})