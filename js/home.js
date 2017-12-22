let isNavShow = false;

function isMobile() 
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


$(document).ready(function(){
    
    alert($(window).width() + " " + $(window).height());
    
    $(window).resize(function()
    {
        if(!isMobile())
        {
            if($(window).width() > 963) 
            { 
                $(".navbar").css({"display":"grid","left":"0"});
                $("#nav-trig").removeClass("change");
                $(".mainbody").fadeTo("normal", 1);
                isNavShow = false;
            }
            else 
            { 
                $(".navbar").css({"display":"none","left":"-40%"});
                $("#nav-trig").removeClass("change");
                $(".mainbody").fadeTo("normal", 1); 
                isNavShow=false; 
            }
        }
    });

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 600);
        console.log($(window).width);
        if($(window).width() <= 980)
        {
           $(".navbar").css({"display":"none","left":"-40%"});
           $("#nav-trig").removeClass("change");
           $(".mainbody").fadeTo("normal", 1); 
           isNavShow=false;  
        }
    });

    var $win = $(window);

    $('div.background').each(function(){
        if(!isMobile())
        {
            var scroll_speed = 5;
            var $this = $(this);
            $(window).scroll(function() {
                var bgScroll = -(($win.scrollTop() - $this.offset().top)/ scroll_speed);
                var bgPosition = 'center '+ bgScroll + 'px';
                $this.css({ backgroundPosition: bgPosition });
            });
        }
    });

    $("#toTop").click(function ()
    {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
    });

    $(window).scroll(function()
    {
        if(!isMobile())
        {
            $("#titleText").css("opacity", 1 - $(window).scrollTop()/700);
        }
    });

    $("#nav-trig").click(function()
    {
        $(this).toggleClass("change");
        //var z = $(".navbar").css("display");
        if(!isNavShow) 
        {
            $(".navbar").css("display", "grid"); 
            $(".navbar").animate({left: '+=40%'});
            $(".mainbody").fadeTo("normal", 0.5); 
            isNavShow=true;
        }
        else 
        {
            $(".navbar").animate({left: '-=40%'});
            /*$(".navbar").css("display", "none");*/
            $(".mainbody").fadeTo("normal", 1); 
            isNavShow=false;
        }
        
    });

});