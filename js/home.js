<<<<<<< HEAD
let navToggle = false;
let vidPause = true;
let focus = true;
let access = true;

//
//fades out pre-loader after page is ready
//
$(window).load(function()
{
    $("#spinner").fadeOut("slow");
    $(".pre-load").fadeOut("slow");
});

//
// determine if device is a mobile device or not
//
function isMobile()
{
    if(/iPad/i.test(navigator.userAgent) && $(window).width() > 980) {return false;}
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

//
// jQuery function to determine if an element is entriely on screen. Will return false if element is even partially off-screen
//
$.fn.isOnScreen = function(){

        var win = $(window);

        var viewport = {
            top : win.scrollTop() + 40,
            left : win.scrollLeft()
        };
        viewport.right = win.scrollLeft() + win.width();
        viewport.bottom = win.scrollTop() + win.height();

        var bounds = this.offset();
        bounds.horizontalLimit = bounds.left + (this.outerWidth()/2);
        bounds.verticalLimit = bounds.top + (this.outerHeight()/2);

        return (!(viewport.right < bounds.horizontalLimit || viewport.left > bounds.horizontalLimit || viewport.bottom < bounds.verticalLimit || viewport.top > bounds.verticalLimit));
    };

//
// scrolls screen a little bit - helps to trigger some scroll bound functionality on page focus or load
//
function scrollNudge()
{
    let z = $(window).scrollTop();
    if( z==0 ) { $(window).scroll(); }
    else { $(window).scrollTop(z-1); }
    $(window).focus();
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// LOADING THE YOUTUBE API
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// YOUTUBE PLAYER FUNCTIONS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var player;
function onYouTubeIframeAPIReady()
{
    console.log("youtube api ready");
    player = new YT.Player('welcomeVideo', {
    events: {
        'onStateChange': onPlayerStateChange
    }
    });
    scrollNudge();
}

function onPlayerStateChange(event)
{
    var status = event.data;
    if(status == 0) { vidPause = true; console.log("video end: "+vidPause); } //VIDEO ENDED
    else if(status == 1) { vidPause = false; console.log("video play: "+vidPause); } //VIDEO IS PLAYING
    else if(status == 2) //VIDEO IS PAUSED
    {
        vidPause = true; console.log("video pause: "+vidPause);
    }
}

//Soft Pause Youtube video
function pauseYTVideo()
{
    player.pauseVideo();
    setTimeout(function(){
        vidPause=false; console.log("video soft pause: "+vidPause);
    }, 100);
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

$(document).ready(function(){

    /*if(!isMobile()) { $(".mainbody").css("margin-top", ($(".navbar").height() + 30)); }
    else { $(".mainbody").css("margin-top", $(".mobile-nav").height()); }
    $(window).resize(function()
    {
        if(!isMobile()) { $(".mainbody").css("margin-top", ($(".navbar").height() + 30)); }
        else { $(".mainbody").css("margin-top", $(".mobile-nav").height()); }
    });*/


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Video pause on navbar trigger on mobile
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $("#nav-trig").click(function()
    {
        if(!vidPause)
        {
            if(!navToggle) { navToggle=true; pauseYTVideo(); } //navbar out
            else //navbar in
            {
                player.playVideo();
                navToggle = false;
            }
        }
        else { navToggle = !navToggle; }
    });
    $(".navbar-overlay").click(function()
    {
        navToggle = false;
        if(!vidPause) { player.playVideo(); }
    });
    $(document).on('click', 'a[href^="#"]', function (event)
    {
        event.preventDefault();
        if(isMobile())
        {
          navToggle = false;
          if(!vidPause)
          {
            player.playVideo();
          }
        }
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // topBadge Secret Site Code
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    window.addEventListener("click", function(){ access=false; console.log("click happened"); }, true);
    window.addEventListener("scroll", function(){ access=false; console.log("scroll happened"); }, true);
    window.addEventListener("blur", function(){ access=false; console.log("blur happened"); }, true);
    window.addEventListener("mousemove", function(){ access=false; /*console.log("mousemove happened");*/ }, true);
    window.addEventListener("focus", function(){ console.log("window has focus"); }, true);
    $("#topBadge").one("click", function()
    {
        console.log("inside topBadge");
        setTimeout(function()
        {
            access = true;
            console.log("topBadge turned on access");
        }, 500);
        setTimeout(function()
        { if(access) { window.location.href = "secret.html"; } }, 5000);
    });

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Title fade on scroll code
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $(window).scroll(function()
    {
        if(!isMobile())
        {
            var top = $(window).scrollTop() + $(".navbar").height() + 30;
            $("#titleText").css("opacity", 1 - top/700);
        }
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Parallax scrolling code
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var $win = $(window);

    $('div.background').each(function(){
        if(!isMobile())
        {
            var scroll_speed = 3;
            var $this = $(this);
            $(window).scroll(function() {
                var bgScroll = -(($win.scrollTop() - $this.offset().top)/ scroll_speed);
                var bgPosition = 'center '+ bgScroll + 'px';
                $this.css({ backgroundPosition: bgPosition });
            });
        }
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Go to Top button code
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $("#toTop").click(function ()
    {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------

});
||||||| merged common ancestors
let navToggle = false;
let vidPause = true;
let focus = true;
let access = true;

//
//fades out pre-loader after page is ready
//
$(window).load(function()
{
    $("#spinner").fadeOut("slow");
    $(".pre-load").fadeOut("slow");
});

//
// determine if device is a mobile device or not
//
function isMobile()
{
    if(/iPad/i.test(navigator.userAgent) && $(window).width() > 980) {return false;}
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

//
// jQuery function to determine if an element is entriely on screen. Will return false if element is even partially off-screen
//
$.fn.isOnScreen = function(){

        var win = $(window);

        var viewport = {
            top : win.scrollTop() + 40,
            left : win.scrollLeft()
        };
        viewport.right = win.scrollLeft() + win.width();
        viewport.bottom = win.scrollTop() + win.height();

        var bounds = this.offset();
        bounds.horizontalLimit = bounds.left + (this.outerWidth()/2);
        bounds.verticalLimit = bounds.top + (this.outerHeight()/2);

        return (!(viewport.right < bounds.horizontalLimit || viewport.left > bounds.horizontalLimit || viewport.bottom < bounds.verticalLimit || viewport.top > bounds.verticalLimit));
    };

//
// scrolls screen a little bit - helps to trigger some scroll bound functionality on page focus or load
//
function scrollNudge()
{
    let z = $(window).scrollTop();
    if( z==0 ) { $(window).scroll(); }
    else { $(window).scrollTop(z-1); }
    $(window).focus();
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// LOADING THE YOUTUBE API
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// YOUTUBE PLAYER FUNCTIONS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var player;
function onYouTubeIframeAPIReady()
{
    console.log("youtube api ready");
    player = new YT.Player('welcomeVideo', {
    events: {
        'onStateChange': onPlayerStateChange
    }
    });
    scrollNudge();
}

function onPlayerStateChange(event)
{
    var status = event.data;
    if(status == 0) { vidPause = true; console.log("video end: "+vidPause); } //VIDEO ENDED
    else if(status == 1) { vidPause = false; console.log("video play: "+vidPause); } //VIDEO IS PLAYING
    else if(status == 2) //VIDEO IS PAUSED
    {
        vidPause = true; console.log("video pause: "+vidPause);
    }
}

//Soft Pause Youtube video
function pauseYTVideo()
{
    player.pauseVideo();
    setTimeout(function(){
        vidPause=false; console.log("video soft pause: "+vidPause);
    }, 100);
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

$(document).ready(function(){

    if(!isMobile()) { $(".mainbody").css("margin-top", ($(".navbar").height() + 30)); }
    else { $(".mainbody").css("margin-top", $(".mobile-nav").height()); }
    $(window).resize(function()
    {
        if(!isMobile()) { $(".mainbody").css("margin-top", ($(".navbar").height() + 30)); }
        else { $(".mainbody").css("margin-top", $(".mobile-nav").height()); }
    });


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Video pause on navbar trigger on mobile
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $("#nav-trig").click(function()
    {
        if(!vidPause)
        {
            if(!navToggle) { navToggle=true; pauseYTVideo(); } //navbar out
            else //navbar in
            {
                player.playVideo();
                navToggle = false;
            }
        }
        else { navToggle = !navToggle; }
    });
    $(".navbar-overlay").click(function()
    {
        navToggle = false;
        if(!vidPause) { player.playVideo(); }
    });
    $(document).on('click', 'a[href^="#"]', function (event)
    {
        event.preventDefault();
        if(isMobile())
        {
          navToggle = false;
          if(!vidPause)
          {
            player.playVideo();
          }
        }
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // topBadge Secret Site Code
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    window.addEventListener("click", function(){ access=false; console.log("click happened"); }, true);
    window.addEventListener("scroll", function(){ access=false; console.log("scroll happened"); }, true);
    window.addEventListener("blur", function(){ access=false; console.log("blur happened"); }, true);
    window.addEventListener("mousemove", function(){ access=false; /*console.log("mousemove happened");*/ }, true);
    window.addEventListener("focus", function(){ console.log("window has focus"); }, true);
    $("#topBadge").one("click", function()
    {
        console.log("inside topBadge");
        setTimeout(function()
        {
            access = true;
            console.log("topBadge turned on access");
        }, 500);
        setTimeout(function()
        { if(access) { window.location.href = "secret.html"; } }, 5000);
    });

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Title fade on scroll code
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $(window).scroll(function()
    {
        if(!isMobile())
        {
            var top = $(window).scrollTop() + $(".navbar").height() + 30;
            $("#titleText").css("opacity", 1 - top/700);
        }
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Parallax scrolling code
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var $win = $(window);

    $('div.background').each(function(){
        if(!isMobile())
        {
            var scroll_speed = 3;
            var $this = $(this);
            $(window).scroll(function() {
                var bgScroll = -(($win.scrollTop() - $this.offset().top)/ scroll_speed);
                var bgPosition = 'center '+ bgScroll + 'px';
                $this.css({ backgroundPosition: bgPosition });
            });
        }
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Go to Top button code
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $("#toTop").click(function ()
    {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------

});
=======
let navToggle=false;let vidPause=true;let focus=true;let access=true;$(window).load(function(){$("#spinner").fadeOut("slow");$(".pre-load").fadeOut("slow");});function isMobile(){if(/iPad/i.test(navigator.userAgent)&&$(window).width()>980){return false;}return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);}$.fn.isOnScreen=function(){var win=$(window);var viewport={top:win.scrollTop()+40,left:win.scrollLeft()};viewport.right=win.scrollLeft()+win.width();viewport.bottom=win.scrollTop()+win.height();var bounds=this.offset();bounds.horizontalLimit=bounds.left+(this.outerWidth()/2);bounds.verticalLimit=bounds.top+(this.outerHeight()/2);return(!(viewport.right<bounds.horizontalLimit||viewport.left>bounds.horizontalLimit||viewport.bottom<bounds.verticalLimit||viewport.top>bounds.verticalLimit));};function scrollNudge(){let z=$(window).scrollTop();if(z==0){$(window).scroll();}else{$(window).scrollTop(z-1);}$(window).focus();}var tag=document.createElement('script');tag.id='iframe-demo';tag.src='https://www.youtube.com/iframe_api';var firstScriptTag=document.getElementsByTagName('script')[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var player;function onYouTubeIframeAPIReady(){console.log("youtube api ready");player=new YT.Player('welcomeVideo',{events:{'onStateChange':onPlayerStateChange}});scrollNudge();}function onPlayerStateChange(event){var status=event.data;if(status==0){vidPause=true;console.log("video end: "+vidPause);}else if(status==1){vidPause=false;console.log("video play: "+vidPause);}else if(status==2){vidPause=true;console.log("video pause: "+vidPause);}}function pauseYTVideo(){player.pauseVideo();setTimeout(function(){vidPause=false;console.log("video soft pause: "+vidPause);},100);}$(document).ready(function(){if(!isMobile()){$(".mainbody").css("margin-top",($(".navbar").height()+30));}else{$(".mainbody").css("margin-top",$(".mobile-nav").height());}$(window).resize(function(){if(!isMobile()){$(".mainbody").css("margin-top",($(".navbar").height()+30));}else{$(".mainbody").css("margin-top",$(".mobile-nav").height());}});$("#nav-trig").click(function(){if(!vidPause){if(!navToggle){navToggle=true;pauseYTVideo();}else{player.playVideo();navToggle=false;}}else{navToggle=!navToggle;}});$(".navbar-overlay").click(function(){navToggle=false;if(!vidPause){player.playVideo();}});$(document).on('click','a[href^="#"]',function(event){event.preventDefault();if(isMobile()){navToggle=false;if(!vidPause){player.playVideo();}}});window.addEventListener("click",function(){access=false;console.log("click happened");},true);window.addEventListener("scroll",function(){access=false;console.log("scroll happened");},true);window.addEventListener("blur",function(){access=false;console.log("blur happened");},true);window.addEventListener("mousemove",function(){access=false;},true);window.addEventListener("focus",function(){console.log("window has focus");},true);$("#topBadge").one("click",function(){console.log("inside topBadge");setTimeout(function(){access=true;console.log("topBadge turned on access");},500);setTimeout(function(){if(access){window.location.href="secret.html";}},5000);});$(window).scroll(function(){if(!isMobile()){var top=$(window).scrollTop()+$(".navbar").height()+30;$("#titleText").css("opacity",1-top/700);}});var $win=$(window);$('div.background').each(function(){if(!isMobile()){var scroll_speed=3;var $this=$(this);$(window).scroll(function(){var bgScroll=-(($win.scrollTop()-$this.offset().top)/scroll_speed);var bgPosition='center '+bgScroll+'px';$this.css({backgroundPosition:bgPosition});});}});$("#toTop").click(function(){$("html, body").animate({scrollTop:0},600);});});
>>>>>>> a94798a7d4d20ec7ede7699fb234feeaa65fc375
