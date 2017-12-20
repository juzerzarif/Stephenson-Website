
function isMobile() {
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
            var scroll_speed = 10;
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

});
