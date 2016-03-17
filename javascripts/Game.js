// Game.js

'use strict';

var Game = function() {

	var game = {};

	var waterHandler = Water();

	var players = [
			Player('heat', waterHandler),
			Player('wind', waterHandler),
			Player('cold', waterHandler)
		];
	var playerTurn = -1;


	game.player = players[ playerTurn ];


	var isOver = function() {
		var endGame = false;
		var $envs = $('.environment');

		for ( var envi = 0; envi < $envs.length; envi++ ) {
			var $env = $($envs[ envi ]);

			if ( $env.find('.sky').eq(0).children().length <= 0 ) {
				endGame = true;
			}
			if ( $env.find('.ground').eq(0).children().length <= 0 ) {
				endGame = true;
			}
		}

		return endGame;
	}  // End isOver()


	game.next = function () {

		if( isOver() ) {
			$('.player-message').attr('id', 'game_over' );
			$('.player-message').text( 'Game Over' );
			return;
		}
		// Start the new one
		playerTurn 	= (playerTurn + 1) % 3;
		game.player = players[ playerTurn ];

		$('.player-message').attr('id', game.player.type );
		$('.player-message').text( game.player.message );

		game.player.highlight();

		return game;
	};  // End game.next()


	$('.game').on('next', function nextPlayer() {
		// Temporary measure, since there's some delay in sending the end of the last click event?
		// So confused. Multiple highlights showing. That shouldn't be able to happen
		setTimeout(function nextWait() {
			game.next();
		}, 300);
	});


	$('.game').on('action', function takeAction(evnt, elem) {
		game.player.action( evnt, elem );
		game.player.highlight(evnt, elem);
	});


	$('.liquid, .ice, .gas, .ground, .sky, .mountain, .lake, .ocean' ).click(function playerAction(evnt) {
		$('.game').trigger('action', [this] );
	});

	game.next();

	return game;
};  // End Game() {}
