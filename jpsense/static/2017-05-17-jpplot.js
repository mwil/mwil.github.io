var selected_unit = null;
var selected_box = null;

$(window).on('load', function() {
    $('#btn_reset_jp_input').on('click',function() {
        $('textarea[name=jp_input]').val('').focus();
    });

    $('#btn_toggle_ratings').on('click',function() {
        $(".rating").toggle();
    });

    $('#btn_toggle_subsumed').on('click',function() {
        $(".subsumed").toggle();
    });

    $('#btn_toggle_knp').on('click',function() {
        $(".knp").toggle();
    });

    $('.vis').find('.unit-front').hoverIntent(
        function() {
            if (selected_unit !== null) {
                selected_unit.fadeOut();
                selected_unit = null;
            }

            var unit_back = $('~ .unit-back', this)
            unit_back.fadeIn();

            // move clipped objects nicely onscreen
            var front_offset = $(this).offset();
            var back_pos = unit_back.position();

            if (front_offset.left + back_pos.left < 0) {
                unit_back.css({top: back_pos.top, left: -front_offset.left+10})
            }
        }, function() {
            if (selected_unit === null) {
                $('~ .unit-back', this).fadeOut();
            }
        }
    );

    $('.vis').find('.unit-front').click(function() {
        if (selected_unit === null) {
            selected_unit = $('~ .unit-back', this);
        } else {
            selected_unit = null;
        }

        $(this).toggleClass(".unit-glow");
    });

    //$('.vis').find('.unit-back').hover(function() {}, function() {
        //$(this).fadeOut();
    //});

    //$('.unit-back').click(function() {
        //$(this).fadeOut();
        //selected_unit = null;
    //});

    selected_box = $('.sent_box').first();
    selected_box.show();

    //Clicking on the sentence headers to show the boxes
    $('tr.header').click(function() {
        if (selected_box !== null) {
            selected_box.slideUp('slow');
        }

        selected_box = $(this).nextUntil('tr.header').find('.sent_box');
        selected_box.slideToggle('slow');
    });

    $('table.gloss').hoverIntent(function() {
        $('tr.gloss', this).not('.gloss-heading').toggle();

        if ($('tr.gloss:last', this).is(':visible')) {
            $('span.dots', this).remove();
        } else {
            $('tr.gloss-heading:last', this).find('td:last').append('<span class="dots"> (...)</span>');
        }
    });

    $('tbody.gloss tr').not('.gloss-heading').hide();
    $('tr.gloss-heading + tr:not(.gloss-heading)').prev().find('td:last').append('<span class="dots"> (...)</span>');
});

