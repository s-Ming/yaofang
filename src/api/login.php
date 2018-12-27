<?php
  // 商品列表信息
     
    
    // 1.接受前端传过来的currentId : $_GET[]
    // * isset()判断是否有传递参数，如果有才获取，没有设置""
    $user_ = isset($_GET['username_'])? $_GET['username_'] : "";
    $pass_ = isset($_GET['password_'])? $_GET['password_'] : "";

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'yaofangwang';

    // 1.创建与数据库的连接
    $conn = new mysqli($servername, $username, $password, $dbname);
    // 2. 检测连接失败
    if ($conn->connect_error) {
        die($conn->connect_error);
    } 
    //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
    // 3. 操作数据库：增删改查
    // （1）书写sql语句
    // （2）执行sql语句 $conn->query(sql语句)
        //* 查找：返回值为查询结果集
        //* 增删改：返回值为布尔值
    // (3) 若为查询语句，对查询结果集进行操作
    //   * 查询结果集的属性及方法
    //      * num_rows 得到查询结果集的数量
    //      * fetch_all(MYSQLI_ASSOC); 得到查询结果集组成数组(重要)
    //      * fetch_assoc() 得到第一个结果
    //      * fetch_row() 得到第一个结果,只得到值，没有键
    // (4) 若为查询语句，关闭查询结果集
    //   * 查询结果集->close()
    // (5) 关闭与数据库的连接 $conn -> close()
    $sql = "select * from user where username='$user_'";
    // 外层用双引号,内部用单引号
    // $sql = "select * from user where password='111111'";
    // $sql = "select * from user where id=1";
    $result = $conn->query($sql);
    $content = $result->fetch_all(MYSQLI_ASSOC);
    if(count($content)==0){
            echo "no";
    }else{
        if($content[0]['password'] != $pass){
            echo "no";
        }else{
            echo "yes";
        }
    }
   
    // $arr = $result->fetch_all(MYSQLI_ASSOC);(得到数组)
    // $res = $result->fetch_row();
    // echo json_encode($res,JSON_UNESCAPED_UNICODE);
    // $result->close();
    // $conn->close();
    // =================增加========================
   // var_dump($result->num_rows);
    // 4.将json数据传回给前端，进行局部渲染
    // echo json_encode($content,JSON_UNESCAPED_UNICODE);
    $result->close();
    $conn -> close();



?>