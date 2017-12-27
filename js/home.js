let navToggle = false;
let vidPause = false;
let focus = true;
let access = true;

//
// determine if device is a mobile device or not
//
function isMobile() 
{
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
// Setting up the PageVisibility API
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document.hidden === "undefined") {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
  } else {
    // Handle page visibility change   
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------


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
}

function onPlayerStateChange(event)
{
    var status = event.data;
    if(status == 1) { vidPause = false; console.log("video play: "+vidPause); } //VIDEO IS PLAYING
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
        vidPause=false; console.log(vidPause);
    }, 100);
}

//Event handlers to handle video play pause
$(window).scroll(function()
{
    if(!vidPause)
    {
        if( !isMobile || $(window).width>963)
        {
            if($("#welcomeVideo").isOnScreen()) { player.playVideo(); }
            else { pauseYTVideo(); }
        }
        else
        {
            if(!navToggle)
            {
                if($("#welcomeVideo").isOnScreen()) { player.playVideo(); }
                else { pauseYTVideo(); }
            }
        }
    }
});

function handleVisibilityChange() {
    if (document[hidden]) {
      if(!vidPause) { pauseYTVideo(); }
      access = false;
    } else {
      scrollNudge(); //when window becomes visible, scroll to activate scroll events 
    }
  }


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function(){
    
    $(window).load(function()
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
            if(!navToggle) { navToggle=true; pauseYTVideo(); }
            else
            {
                if($("#welcomeVideo").isOnScreen()) { player.playVideo(); }
                navToggle = false;
            }
        }
        else { navToggle = !navToggle; }
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
            var scroll_speed = 4;
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