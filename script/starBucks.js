(function($, window, document ){

    class starBucks{
        init(){
              this.header();
              this.section1();
              this.section2Notice();  //cnt  mainSlide() ... 변수, 함수 충돌
              this.section2Slide();   //cnt  mainSlide() ... 
              this.section3();
              this.section4();
              this.section5();
              this.section6();
              this.section7();
              this.section8();
              this.goTop();
              this.quickMenu();
        }
        header(){
            const bergerBtn =$('.berger-btn');
            const mobileNav =$('#mobileNav');
            const mobileContainer =$('.mobile-container');
            const mobileClose =$('.mobile-close');
            const mobileContainerlia = $('.mobile-container li a');
            const findBtn = $('.find-btn');
            const findBox = $('.find-box');
            const mainBtn = $('.main-btn');
            const nav = $('#nav');



            //모바일 버튼 이벤트
            bergerBtn.on({
              click: function(){
                mobileNav.addClass('addMobile');
                    mobileContainer.stop().animate({left:0},600);
              }
            });
            // 반응형
            // 화면 너비가 960 초과이면 left:110+'%'로 안으로 들어간다 메뉴가 사라진다
            let t=false;
            $(window).resize(()=>{
              if( $(window).width()>960){
                mobileNavFn();

                // 강제클릭 제이쿼리 함수 trigger(이벤트), 비추
                // if(t == false ){
                //   t=true;
                //   $('.mobile-close').trigger('click');
                // }
              }
              // else{/* 960이하이면 */ 
              //   t=false;
              // }
            });
            function mobileNavFn(){
                mobileContainer.stop().animate({left:110+'%'},500,function(){
                mobileNav.removeClass('addMobile');
              });
            }



            mobileClose.on({
              click:function(){
                mobileNavFn();
                
              }
            });
            
            mobileContainerlia.on({
              click: function(){
                
                $(this).toggleClass('addMobile');
                $(this).next('div').slideToggle(300);
                $('.mobile-container li a.none-sub').removeClass('addMobile');

              }
             });


            //통합검색 버튼 클릭 이벤트
            findBtn.on({
                click: function(){
                    findBox.toggleClass('addInput');
                }
            });

            //네비게이션 : 메인메뉴의 마우스 이벤트
            mainBtn.on({
                mouseenter: function(){
                 mainBtn.removeClass('addCurrent');
                  $(this).addClass('addCurrent');
                  $('.sub').stop().slideUp(0);
                  $(this).next().stop().slideDown(600,'easeOutExpo');
                },
                focusin: function(){
                    mainBtn.removeClass('addCurrent');
                  $(this).addClass('addCurrent');
                  $('.sub').stop().slideUp(0);
                  $(this).next().stop().slideDown(600,'easeOutExpo');
                }
            });

            //네비게이션을 마우스가 떠나면 
            //모두 초기화
            nav.on({
                mouseleave: function(){
                    mainBtn.removeClass('addCurrent');
                  $('.sub').stop().slideUp(600,'easeOutExpo');
                }
            });



        }
        section1(){
            const img = $('.img');
            function ani(){
                img.eq(0).stop().animate({opacity:1},600, function(){
                    img.eq(1).stop().animate({opacity:1},600, function(){
                        img.eq(2).stop().animate({opacity:1},600, function(){
                            img.eq(3).stop().animate({opacity:1},600, function(){
                                img.eq(4).stop().animate({opacity:1},600);
                            });
                        });
                    });
                });
             }
             setTimeout(ani, 600);
        }
        section2Notice(){
            let cnt = 0;
            const notice = $('.notice') ;

            // 1. 메인 슬라이드 함수
            function mainSlide(){
                notice                   .css({zIndex:1}).stop().animate({top:24},0);
                notice.eq(cnt==0?4:cnt-1).css({zIndex:2}).stop().animate({top: 0},0);
                notice.eq(cnt)           .css({zIndex:3}).stop().animate({top:24},0).animate({top:0},1000);
            }

            // 2. 다음 카운트 함수
            function nextCount(){
                cnt++;  //1 2 3 4 0 1 2 3 4 
                if(cnt>4){cnt=0}
                mainSlide();
            }

            // 3. 자동타이머 함수(셋인터발)
            function autoTimer(){
                setInterval(nextCount, 3000);
            }

            setTimeout(autoTimer, 100);

        }
        section2Slide(){
            let cnt = 0;
            let setId = null;
            let winW = $(window).innerWidth()*0.9;    //창너비의 90% 크기
            const slide = $('.slide');
            const slideWrap = $('.slide-wrap');
            const pageBtn = $('.page-btn');
            const playBtn = $('.play-btn');
            const nextBtn = $('.next-btn');
            const prevBtn = $('.prev-btn');
            const promotionBtn = $('.promotion-btn');
            const Slide = $('#slide');
              // 반응형
              
              function resizeFn(){

                  if( $(window).innerWidth()<=819 ){
                    winW = $(window).innerWidth()*0.9;
                  }
                  else{ 
                    winW = 819;
                  }
                  
                  slide.css({width: winW }); //슬라이드 너비
                  //mainSlide(); //실시간으로 메인슬라이드 연동 반응 즉각
                  slideWrap.stop().animate({left:-winW*cnt}, 0);
              }
              resizeFn();


              $(window).resize(function(){
                  resizeFn();
              });


              //   1. 메인슬라이드함수
                function mainSlide(){
                    slideWrap.stop().animate({left:-winW*cnt}, 600, function(){
                       if(cnt>2){cnt=0}
                       if(cnt<0){cnt=2}
                       slideWrap.stop().animate({left:-winW*cnt}, 0);
                      //  슬라이드 번호별 스타일 적용 addClass
                       slide.removeClass('addCurrent');         //밝아지는 효과 삭제
                       slide.eq(cnt+1).addClass('addCurrent');  //밝아지는 효과 설정
                   });
                   pageEvent();
                }

              //   2-1. 다음카운트함수
                function nextCount(){
                  cnt++;
                  mainSlide();
                }
              //   2-2. 이전카운트함수
                function prevCount(){
                  cnt--;
                  mainSlide();
                }

              //   3. 자동타이머함수(셋인터발)
                function autoTimer(){
                  setId = setInterval(nextCount, 3000);
                }
               


              // 4. 페이지 이벤트 함수
              
                function pageEvent(){
                  // console.log( cnt );
                  pageBtn        .children().attr('src','./images/main_prom_off.png')
                  pageBtn.eq(cnt==3?0:cnt).children().attr('src','./images/main_prom_on.png')

                }

              //  5. 페이지버튼 클릭 이벤트
             

               //배열 반복처리
               pageBtn.each(function(idx){
                  $(this).on({
                    click: function(e){
                      e.preventDefault();
                      cnt = idx;
                      mainSlide();
                      stopFn() // 정지
                    }
                  });
               });

              // 6. 일시정지와 플레이버튼 클릭 이벤트
              

                function stopFn(){
                    playBtn.children().attr('src','./images/main_prom_play.png');
                    playBtn.removeClass('on'); //삭제
                  // 슬라이드정지
                  clearInterval(setId);
                }
                function playFn(){
                    playBtn.children().attr('src','./images/main_prom_stop.png');
                    playBtn.addClass('on');  //꺼짐 클래스 추가
                  // 슬라이드플레이
                  autoTimer();
                }


                playBtn.on({
                   click: function(e){
                     e.preventDefault();

                        if( $(this).hasClass('on') ){ //참이면
                        // if( $(this).is('.on') ){ //클래스 아이디 요소
                          stopFn();
                        }
                        else{
                          playFn();
                        }
                   }
                 });

                    //  이 버틑에 on 클래스가 있니? 
                    // var a=1   //숫자  Integer
                    // var b='1' //문자  String
                    // console.log('a===b 결과 논리값 까지 비교 정확하게 비교 : ', a===b ); //false
                    // console.log('a==b  결과 형태만 비교해서 불정확하게 비교 : ',  a==b  ); //true
                
                    // console.log( $(this).hasClass('on') );
                    // if( $(this).hasClass('on') === true ){ //참이면                          


                 //7-1. 다음화살버튼 클릭 이벤트
                 nextBtn.on({
                   click: function(e){
                     e.preventDefault();
                     stopFn(); // 정지
                     nextCount();
                   }
                 });


                 //7-2. 이전화살버튼 클릭 이벤트
                 prevBtn.on({
                  click: function(e){
                    e.preventDefault();
                    stopFn(); // 정지
                    prevCount();
                  }
                });


                // 8. 프로모션 버튼 클릭 이벤트
                // 클릭하면
                // (슬라이드)#slide 박스가 부드럽게 슬라이드 업
                promotionBtn.on({
                  click: function(e){
                    e.preventDefault();

                    if( $(this).hasClass('close')  ){ //오픈
                        Slide.stop().slideDown(600);
                      $(this).removeClass('close');
                      playFn();
                    }
                    else{ //닫기 close
                        Slide.stop().slideUp(600);
                      $(this).addClass('close');
                      //정지
                      stopFn();
                      cnt=0;
                      // $('.slide-wrap').stop().animate({left:-819*cnt}, 0);
                      mainSlide(); //처음으로 초기화
                    }
                    
                  }
                });


                // 슬라이드 랩 박스 위에 마우스 올라가면 슬라이드 정지
                slideWrap.on({
                  mouseenter: function(e){
                    e.preventDefault();
                    stopFn();
                  },
                  mouseleave: function(e){
                    e.preventDefault();
                    playFn();
                  }
                });

                //슬라이드 콘테이너 박스 위에 마우스 떠나면 슬라이드 재실행

        }
        section3(){

        }
        section4(){
            const section4 = $('#section4');
            $(window).scroll(function(){

                if( $(window).scrollTop() == 0 ){
                    section4.removeClass('addAni');
                }

                if( $(window).scrollTop() > 500 ){
                    section4.addClass('addAni');
                }

            });

        }
        section5(){
            let sec3Top = $('#section3').offset().top-200;
            const section5 = $('#section5');

            $(window).scroll(function(){

                if( $(window).scrollTop() == 0 ){
                    section5.removeClass('addFadein');
                }

                if( $(window).scrollTop() >= sec3Top ){
                    section5.addClass('addFadein');
                }
            });
        }
        section6(){
            let sec4Top = $('#section4').offset().top;
            const section6 = $('#section6');

            $(window).scroll(function(){

                if( $(window).scrollTop() == 0 ){
                    section6.removeClass('addAni')
                }
                
                if( $(window).scrollTop() >= sec4Top ){
                    section6.addClass('addAni')
                }

            });
        }
        section7(){
            let sec6Top = $('#section6').offset().top-200;
            const section7 = $('#section7');

            $(window).scroll(function(){

                if( $(window).scrollTop() == 0 ){
                    section7.removeClass('addFade')
                }
                
                if( $(window).scrollTop() >= sec6Top ){
                    section7.addClass('addFade')
                }

            });
        }
        section8(){
            let sec6Top = $('#section6').offset().top+200;
            const section8 = $('#section8');

            $(window).scroll(function(){
                if( $(window).scrollTop() == 0 ){
                    section8.removeClass('addAni')
                }
                if( $(window).scrollTop() >= sec6Top ){
                    section8.addClass('addAni')
                }
            });

            //반응형
            let leftW=null;
            let leftH=null;
            

            function leftResize(){

             
            let winW = $(window).innerWidth();          
              if( winW <= 960 ){    // 창너비가 
                leftW = winW * 0.38125;                 
                leftH = leftW * 0.85246; //높이 = 너비*비율(85.246%)
              }
              else{
                leftW = 366;
                leftH = 312;
              }
              $('#section8 .left').css({ width:leftW, height:leftH });

            }
            leftResize();

            $(window).resize(function(){
              leftResize();
            });
        }
        goTop(){
            const goTop =$('.go-top');
           
            goTop.stop().fadeOut(1000);

            $(window).scroll(function(){
                if( $(window).scrollTop() >=100 ){
                    goTop.stop().fadeIn(1000);
                }
                else{
                    goTop.stop().fadeOut(1000);
                }
            });

        }
        quickMenu(){
            let quicTop1 = ($(window).height() - 96)/2;
            let quicTop2 = 150;
            const quickMenu =$('.quick-menu');
                
                function quickMenuFn(){
                    quickMenu.stop().animate({top: $(window).scrollTop() + quicTop2 }, 600, "easeOutExpo");
                }                               
            
                quickMenuFn(); //로딩시

            $(window).scroll(function(){
                quickMenuFn();
            });
        }




    }
    const newstarBucks = new starBucks();

        newstarBucks.init();

})(jQuery, window, document);