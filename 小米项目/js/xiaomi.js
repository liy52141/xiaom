$(function () {
    //SHOP下拉显示隐藏
    $(".shop").mouseover(function () {

        $(".xiala").stop().slideDown();
    })
    $(".shop").mouseout(function () {

        $(".xiala").stop().slideUp();
    })

    $("nav .zhong").mouseout(function () {

        $(".tuxiala").stop().slideUp();
    })

    $(".tuxiala").mouseover(function () {
        $(".tuxiala").stop().slideDown();
    })
    $(".tuxiala").mouseout(function () {

        $(".tuxiala").stop().slideUp();
    })
    //顶部文字/图片请求
    $.ajax({
        url: "http://192.168.70.78:9900/api/nav",
        success: function (data) {
            // console.log(data);
            $("nav .zhong").html(template("temp", {
                data: JSON.parse(data)
            }));


            //nav的下拉框
            $("nav .zhong a").mouseover(function () {
                var $this = $(this);
                if (!$this.attr("type")) {
                    return
                }

                // console.log($this.attr("type"))
                $(".tuxiala").stop().slideDown();
                $.ajax({

                    url: "http://192.168.70.78:9900/api/nav",
                    data: {

                        type: $this.attr("type")
                    },
                    // dataType: "json",
                    success: function (data) {
                        // console.log(data);
                        $(".tuxiala-tu").html(template("templ", {
                            data: JSON.parse(data)
                        }));
                    }
                });
            })
        }
    })

    //main左边区域的请求
    $.ajax({
        url: "http://192.168.70.78:9900/api/items",
        success: function (data) {
            $(".main-left").html(template("tem", {
                data: JSON.parse(data)
            }));
            // 图片的请求
            $(".main-left li").mouseover(function () {
                var $this = $(this);
                $.ajax({
                    url: "http://192.168.70.78:9900/api/items",
                    data: {
                        type: $this.attr("type")
                    },
                    dataType: 'json',
                    success: function (data) {
                        // console.table(data);
                        $(".main-right2").html("");
                        var myArr = [];

                        for (var i = 0; i < Math.ceil(data.length / 6); i++) {
                            myArr[i] = [];
                            for (var j = i * 6; j < i * 6 + 6; j++) {
                                if (!data[j]) break;
                                myArr[i].push(data[j]);
                            }
                        }

                        for (var z = 0; z < myArr.length; z++) {
                            $(".main-right2").append(template("templa", myArr[z]))
                        }


                    }
                })
            })
            $(".main-left li").mouseout(function(){
                $(".main-right2").html("");
            })

        }
    })
    // 轮播图请求
    $.ajax({
        url: "http://192.168.70.78:9900/api/lunbo",
        dataType: "json",
        success: function (data) {
            // console.table(data);
            $(".main-lunbo").html(template("lunbo", data));
            var picindex = 0;
            var wid = $(".main-lunbo").width();
            $(".main-lunbo li").eq(0).fadeIn().show()
           function zidong(){
           
                if (picindex == 4) {
                    picindex = -1;
                }
                picindex++;
            $(".main-lunbo li").eq(picindex).fadeIn().siblings().hide();

                $(".yuandian li").removeClass("active");
                $('.yuandian>ul>li').eq(picindex).addClass('active');
            
           }
            $(".yj").click(function(){
                zidong();
            })
           $(".lj").click(function () {
            if (picindex == 0) {
                picindex =5;
            }
            picindex--;
        $(".main-lunbo li").eq(picindex).fadeIn().siblings().hide();

            $(".yuandian li").removeClass("active");
            $('.yuandian>ul>li').eq(picindex).addClass('active');
        })
        var timerid=null;
        timerid=setInterval(zidong,1000);
        $(".main-right1").hover(function(){
            clearInterval(timerid)},
            function(){
                timerid=setInterval(zidong,1000);
            }
        )

        //    var num = 0
        //    var timer = null;
        //    $(".banner li").eq(0).show();


        //    $(".bannerWrap .pre").click(function() {
        //        num--;
        //        if(num < 0)
        //            num = 4;
        //        $(".banner li").eq(num).fadeIn().siblings().hide();
        //    });
        //    $(".bannerWrap .next").click(function() {
        //        myFn();
        //    });


        //    function myFn() {
        //        num++;
        //        if(num > 4)
        //            num = 0;
        //        $(".banner li").eq(num).fadeIn().siblings().hide();
        //    }
        //    timer = setInterval(myFn, 1500);


        //    $(".banner").hover(function() {
        //        clearInterval(timer);
        //    },
        //     function() {
        //        timer = setInterval(myFn, 1500);
        //    })
        }
    })
})