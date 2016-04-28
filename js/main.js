$(function () {

    $me = $('#me');
    $dizzy = $('#dizzy');
    $coffcoff = $('#coffcoff');

    $bolle = $('.bolla');

    setLang();

    $(window).resize(function () {		
		if (window.innerWidth > 550) {
			center_container_vert();
			$bigBubble = $('.bigBubble');
			$bigBubble.css({
				width: $bigBubble.height(),
				"margin-left": -$bigBubble.height() / 2
			});

			resize_linkedin_logo();
			
		} else {
			$('.bigBubble').css({
				"width": "",
				"margin-left": ""
			});
			$('#big_me').find('a').css("height","");
		}
    });

    center_container_vert();
    resize_linkedin_logo();

    /*$("#dizzy").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
     function(){
     enableBubbleClick();
     });*/

    bubbleComeIn();
});

var enableBubbleClick = function (enableHtmlClick) {
    console.log('bubble click ENABLED');
    $('.bolla').css("cursor", "pointer");


    $bolle.on('click', function (e) {
        e.stopImmediatePropagation();
        $bolle.removeClass("hoverable");
        $(this).addClass("active");

        //var diametro = Math.floor($(window).height()*0.95);
        //var bottom = ($(window).height() - diametro)*50 / $(window).height();

        $bigBubble = $('.bigBubble');

        $('#big_' + $(this).attr("id")).addClass('active').css({
            "background-color": $(this).css("background-color"),
            // height : diametro+"px",
            width: $bigBubble.height(),//diametro+"px",
            "margin-left": -$bigBubble.height() / 2,
            "opacity": 0.9
        }).animate({
            bottom: "4%"
        }, 1000);


        $('.bigBubble h1').fitText();
        $('.bigBubble p').fitText(2);

        bubbleGoOut();
    });

    if (enableHtmlClick) {
        $("html").on('click', function () {
            $bolle.removeClass("active").addClass("hoverable");

            $('.bigBubble.active').animate({
                bottom: "200%"
            }, 1000, function () {
                $(this).css("bottom", "-100%");
                $('.bigBubble').removeClass('active');
            });

            bubbleComeIn();
        });
    }

    $('.bigBubble').on('click', function (e) {
        e.stopImmediatePropagation();
    });
};

var disableBubbleClick = function () {
    console.log('bubble click DISABLED');
    $bolle.off('click');
    //$('.bigBubble').off('click');
    $('html').off('click');
    $('.bigBubble, .bolla').css("cursor", "auto");
};

var bubbleFadeOut = function () {
    $bolle.fadeOut("slow");
};

var bubbleFadeIn = function () {
    $bolle.fadeIn("slow");
};

var center_container_vert = function () {
    var newTop = ($(window).height() - $('#container').height() ) / 2;
    $('#cont-container').css("top", newTop);
};

var resize_linkedin_logo = function () {
	$bigMe = $('#big_me');
	$bigMe.find('a').height(Math.round($bigMe.height() / 11));
};

var bubbleGoOut = function () {

    disableBubbleClick();

    // Animations
    $dizzy.transition({
        bottom: "150%"
    }, 1500, "linear", function () {
        $(this).css({
            "bottom": "-150%",
            "visibility": "hidden"
        });
        enableBubbleClick(true);
    });
    //$dizzy.css("bottom", "15%").removeClass("comeIn").addClass("goOut");

    $me.transition({
        bottom: "150%"
    }, 500, "linear", function () {
        $(this).css({
            "bottom": "-150%",
            "visibility": "hidden"
        });
    });

    $coffcoff.transition({
        bottom: "150%"
    }, 800, "linear", function () {
        $(this).css({
            "bottom": "-150%",
            "visibility": "hidden"
        });
    });
};

var bubbleComeIn = function () {

    disableBubbleClick();

    $bolle.css({
        "bottom": "-150%",
        "visibility": "visible"
    });

    var rand_me_start = Math.random() * 66 + 1;

    // me, dizzy, coffcoff
    var start_conf1 = [16, 32, 7];
    var start_conf2 = [40, 2, 56];

    var confs = [start_conf1, start_conf2];

    var choosen = Math.floor((Math.random() * 2));

    // Starting configuration
    $me.css("right", rand_me_start + "%"); //me ignores confs
    $dizzy.css("right", confs[choosen][1] + "%");
    $coffcoff.css("right", confs[choosen][2] + "%");

    //$bolle.addClass("comeIn");

    // Animations
    $dizzy.transition({
        bottom: "25%"
    }, 2000, "linear", function () {
        $(this).animate({bottom: "15%"});
        enableBubbleClick(false);
    });

    $me.transition({
        bottom: "64%"
    }, 1000, "linear", function () {
        $(this).animate({bottom: "54%"});
    });

    $coffcoff.transition({
        bottom: "14%"
    }, 1500, "linear", function () {
        $(this).animate({bottom: "4%"});
    });
};

var setLang = function () {

    var locale = navigator.language || navigator.userLanguage;
    var lang = locale.substr(0, 2);

    // en is default
    if (lang != "en") {
        $pars = $('*[lang="' + lang + '"]');
        if ($pars.length > 0) {
            showParsByLang($pars);

        } else if (lang == "it") {
            showParsByLang($('*[lang="it"]'));
        }
    }
};

var showParsByLang = function ($pars) {
    $('.bigBubble > div > p').addClass('hidden');
    $pars.removeClass('hidden');
};

