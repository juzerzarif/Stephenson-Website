//
// determine if device is a mobile device or not
//
function isMobile() 
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

$(document).ready(function()
{
    
    $(window).load(function()
    {
        if(!isMobile()) { $(".mainbody").css("margin-top", ($(".navbar").height() + 30)); }
        else 
        { 
            $(".mainbody").css("margin-top", $(".mobile-nav").height());
            $(".member").remove("br");
            $(".member").append("<br>");
        }
    });

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Title fade on scroll code
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $(window).scroll(function()
    {
        if(!isMobile())
        {
            var top = $(window).scrollTop();
            $("#heading").css("opacity", 1 - top/200);
        }
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Go to Top button code
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $(window).bind("scroll resize load", function()
    {
        if(!isMobile())
        {
            horizontalOver = ($(window).width() < 720);
            verticalOver = ($(window).height() < 900);
            let x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            let y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let offsetX = -x + 50 + "px";
            let offsetY = -y + 50 + "px";
            if(horizontalOver) { $(".dialog").css({"left":offsetX, "margin":"auto 0"}); }
            if(!horizontalOver) { $(".dialog").css({"left":"0", "margin":"0 auto"}); }
            if(verticalOver) { $(".dialog").css({"top":offsetY, "margin":"0 auto"}); }
            if(!verticalOver) { $(".dialog").css({"top":"0", "margin":"auto 0"}); }
            if(verticalOver && horizontalOver) { $(".dialog").css("margin", "0"); }
            if(!verticalOver && !horizontalOver) { $(".dialog").css("margin", "auto"); }
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