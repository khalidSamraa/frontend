$(document).ready(function () {


    //  $(".open-composer").click(function () {
    //    $('.search-controls-item').removeClass("active");
    //    $(this).toggleClass("active");
    //    
    //    $('.search-actions-item').slideUp();
    //    $('.search-actions-item.composer').slideToggle();
    //    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    //  });


    $('.sign-up .text-input:first input').blur(function () {
        tmpval = $(this).val();
        if (tmpval == '') {
            $(".sign-in .submit-input input").addClass('black');
            $(".sign-up .submit-input input").removeClass('black');
        } else {
            $(".sign-in .submit-input input").removeClass('black');
            $(".sign-up .submit-input input").addClass('black');
        }
    });





    $(".open-modal").click(function () {
        $('.modal').toggleClass('show');
    });


    $("button.open-menu").click(function () {
        $(this).toggleClass('active');
        $('.nav').toggleClass('show');
        $('header').toggleClass('big');
    });


    $(".open-search-box").click(function () {
        $(this).toggleClass('active');
        $('.search-header-box').slideToggle(200);
    });



    $('.slider-artist').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        vertical: true,
        dots: false,
        arrows: false,
        cssEase: 'none',
        autoplay: true,

        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        autoplaySpeed: 2000
    });





    $(function () {

        $('.jtab-content').hide();
        $('#tab_description').show();

        $('.jtab-ul a').click(function () {
            $('.jtab-ul a').parent().removeClass('active');
            $(this).parent().toggleClass('active');
            var idvar = this.id;
            var selected_item = $('#tab_' + idvar);
            var visible_item = $('.jtab-content:visible');

            if (visible_item.length > 0 && selected_item.attr('id') !== visible_item.attr('id')) {
                visible_item.slideUp(function () { selected_item.slideToggle(200) });
            } else {
                selected_item.slideToggle(200);
            }

            return false;
        });

    });














});









