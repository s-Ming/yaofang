require(['config'],function(){
	require(['jquery'],function($){
  	//tab切换
  	
    var tab_1 = $(".form-tab div");
    var tab_2 = $(".form_div_total>div");
    // console.log(tab_2)
    // 默认高亮
    tab_1[0].className = 'tab-item gaoliang';
    for(var i=0;i<tab_1.length;i++){
      tab_1[i].idx = i;
      tab_1[i].onclick = function(){
        for(var j=0;j<tab_1.length;j++){
            //去除高亮
            tab_1[j].className = 'tab-item';
            tab_2[j].style.display = 'none';
        }
          tab_1[this.idx].className = 'tab-item gaoliang';
          tab_2[this.idx].style.display = 'block';  
      }  
    }

    var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
      'y', 'z'];

    drawCode();
    // 绘制验证码
    var arr_;
    function drawCode() {
      var canvas = document.getElementById("verifyCanvas");  //获取HTML端画布
      var context = canvas.getContext("2d");                 //获取画布2D上下文
      context.fillStyle = "cornflowerblue";                  //画布填充色
      context.fillRect(0, 0, canvas.width, canvas.height);   //清空画布
      context.fillStyle = "white";                           //设置字体颜色
      context.font = "25px Arial";                           //设置字体
      var rand = new Array();
      var x = new Array();
      var y = new Array();
      for (var i = 0; i < 5; i++) {
        rand[i] = nums[Math.floor(Math.random() * nums.length)]
        x[i] = i * 16 + 10;
        y[i] = Math.random() * 20 + 20;
        context.fillText(rand[i], x[i], y[i]);
      }
      arr_ = rand;
      console.log( arr_)
      //alert(rand);
      //画3条随机线
      for (var i = 0; i < 3; i++) {
        drawline(canvas, context);
      }

      // 画30个随机点
      for (var i = 0; i < 30; i++) {
        drawDot(canvas, context);
      }
      convertCanvasToImage(canvas)
    }

    // 随机线
    function drawline(canvas, context) {
        context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));             //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
        context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));  //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
        context.lineWidth = 0.5;                                                  //随机线宽
        context.strokeStyle = 'rgba(50,50,50,0.3)';                               //随机线描边属性
        context.stroke();                                                         //描边，即起点描到终点
      }
    // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
    function drawDot(canvas, context) {
      var px = Math.floor(Math.random() * canvas.width);
      var py = Math.floor(Math.random() * canvas.height);
      context.moveTo(px, py);
      context.lineTo(px + 1, py + 1);
      context.lineWidth = 0.2;
      context.stroke();

    }
    // 绘制图片
    function convertCanvasToImage(canvas) {
      document.getElementById("verifyCanvas").style.display = "none";
      var image = document.getElementById("code_img");
      image.src = canvas.toDataURL("image/png");
      return image;
    }

    // 点击图片刷新
    document.getElementById('code_img').onclick = function () {
      $('#verifyCanvas').remove();
      $('#verify').after('<canvas width="100" height="40" id="verifyCanvas"></canvas>')
      drawCode();
    }

    //验证码验证
    var check = false;
    //登录验证
    $('.btn2').on('click',function(){
      //获取验证码
      var input = $('.topAlign').val();
      //获取输入的账户、密码
      var $user = $('#phone').val();
      var $pass = $('#password').val();
      console.log(input,$user,$pass)
      for(var i = 0;i<arr_.length;i++){
        if(input[i].toLowerCase()!=arr_[i].toLowerCase()){
          alert('请重新输入验证码');
          return;
        }
      }
      //验证码正确则请求数据库数据，验证密码是否正确
       $.get('../api/login.php','username_='+$user+'&password_='+$pass,function(data){
        console.log(data)
          if(data == 'yes'){
              // 跳转到首页
              location.href = '../index.html?user='+$user;
          }else{
              alert('账号或密码不正确');
          }
      })
    })

  })
})