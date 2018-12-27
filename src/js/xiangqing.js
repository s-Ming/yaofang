require(['config'],function(){
	require(['jquery'],function($){
		// 加载html结构
      // 加载头部
      $('.header_top').load('./common.html .header_top .container');
      //加载搜索
      $('.header').load('./common.html .header .container');
      //加载导航
      $('.nav').load('./common.html .nav .container');
      //加载尾部
      // $('#dibu').load('../index.html #dibu');
      // $('#dibu').load('../html/commin/dibu.html #dibu .container');


      

	})
})