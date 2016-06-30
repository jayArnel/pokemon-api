$(document).ready(function() {
    var correct = "";
    var count = 0;
    var points = 0;
    var loader = $('.preloader-wrapper');

    function update() {
        $.ajax({
            url: 'http://pokeapi.co/api/v2/pokemon/',
            success: function(data) {
                count = data['count'];
                $('.count').text(count);
                play();
            }
        });
    }
    update();

    function init(){
        $('.pokemon-sprite').empty();
        $('input').val('');
        $('input').prop('disabled', true);
    }

    function play() {
        init();
        $('.pokemon-sprite').html(loader);
        var id = Math.floor(Math.random() * (count - 1) + 1);
        var data;
        var endpoint = 'http://pokeapi.co/api/v2/pokemon/' + id;
        $.ajax({
            url: endpoint,
            success: displayPokemon,
            error: play,
        });
    }

    function displayPokemon(data) {
        console.log(data);
        correct = data['name'];
        var sprite = data.sprites.front_default;
        var img = new Image();
        img.onload = function(){
            $('.pokemon-sprite').html(img);
        };
        img.src = sprite;
        $('input').prop('disabled', false);
        $('input').focus();
    }

    $('input').on('keyup', function(e) {
        if (e.keyCode === 13) {
            var input = $(this);
            var guess = input.val();
            if (guess === correct) {
                points++;
                $('.points').text(points);
                play();
            } else {
                $('#game-over').openModal();
            }
        }
    });

    $('.modal-close').on('click', function(e){
        e.preventDefault();
        $('#game-over').closeModal();
        play();
    });
});