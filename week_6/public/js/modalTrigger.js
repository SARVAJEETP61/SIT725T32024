const { duration } = require("@mui/material");

$(document).ready(function () {
    $('.modal').modal();

    $('#button1').click(function () {
        $(this).addClass('blue');
    });

    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

});