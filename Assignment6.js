/*
	COMP 125 - Summer 2019
	Client-Side Web Development
	Blessing Ajiboye

    Image Gallery - Assignment 6
	AJAX/jQuery
	Author: Tiago Franco Finotti #301041366
	Date: Aug 9th 2019

	Filename: Assignment6.js
*/

// defining sets of images (galleries)
var images = {
    'Burgers & Beer': [
        'pic1.jpg',
        'pic2.jpg',
        'pic3.jpg',
        'pic4.jpg',
        'pic5.jpg'
    ],
    'Cars': [
        'pic6.jpg',
        'pic7.jpg',
        'pic8.jpg',
        'pic9.jpg',
        'pic10.jpg'
    ],
    'Tattoos': [
        'pic11.jpg',
        'pic12.jpg',
        'pic13.jpg',
        'pic14.jpg',
        'pic15.jpg'
    ]
};

$(document).ready(function () { // on document ready
    $('#gallery').gallery();
});


$.fn.gallery = function () {
    var self = this;
    var setimgs;
    var order = 0;
    var interval;

    this.each(function () {
        var g = this;

        g.load_sets = function (el) { // function - load sets of images
            $(el).append('<li><a id="arrowleft" href="#" title="arrowleft"><</a></li>');
            $.each(images, function (key, value) {
                $(el).append('<li><a id="' + key + '" href="#" title="' + key + '">' + key + '</a></li>');
            });
            $(el).append('<li><a id="arrowright" href="#" title="arrowright">></a></li>');

            var sets = $(el).find('li a');

            $(sets).click(function () { // binding onclick to our sets
                var set = $(this).attr('id');
                if (set == "Burgers & Beer" || set == "Cars" || set == "Tattoos") {
                    g.setimgs = images[set];
                    $(g).find('#thumbs').html('');
                    g.load_thumbs($(g).find('#thumbs')[0], 0);
                    clearInterval(interval);
                    interval = setInterval(g.moveForward, 5000);
                } else if (set == "arrowleft") {
                    clearInterval(interval);
                    if (order == 0) {
                        $(g).find('#photo').attr('src', 'images/' + g.setimgs[4]);
                        order = 4
                    } else {
                        order--;
                        $(g).find('#photo').attr('src', 'images/' + g.setimgs[order]);
                    }
                } else {
                    clearInterval(interval);
                    g.moveForward();
                }

            });

            sets[0].click();
        }

        g.load_thumbs = function (el, index) { // function - load thumbs of set
            $(el).append('<li><img id="' + g.setimgs[index] + '" src="images/thumb_' + g.setimgs[index] + '" /></li>');

            var tn = new Image();
            $(tn).load(function () {
                var a = $($(el).find('li')[index]).find('img')[0];
                $(a).append(this);
                $(a).click(function () { // binding onclick to thumbs
                    var i = $(this).attr('id');
                    $(g).fadeOut(500, function () {
                        $(g).find('#photo').attr('src', 'images/' + i);
                    }).fadeIn(500);
                    order = index;
                    return false;
                });

                if ((index + 1) < g.setimgs.length) {
                    g.load_thumbs(el, (index + 1));
                } else {
                    $($(g).find('#thumbs li img')[0]).click();
                }
            });
            tn.src = 'images/thumb_' + g.setimgs[index];
        }

        g.moveForward = function () {
            if (order == 4) {
                $(g).find('#photo').attr('src', 'images/' + g.setimgs[0]);
                order = 0
            } else {
                order++;
                $(g).find('#photo').attr('src', 'images/' + g.setimgs[order]);
            }
        }

        // oninit - load sets for gallery
        g.load_sets($(g).find('#sets')[0]);
    });
};