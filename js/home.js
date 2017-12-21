function isMobile() 
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

$(document).ready(function(){
    
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 600);
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
        var z = parseInt($(".navbar").css("z-index"), 10);
        if(z == 1) {$(".navbar").css("z-index", 4);}
        else {$(".navbar").css("z-index", 1);}
    });

});