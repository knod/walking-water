// Player.js

'use strict'

var Player = function( type, waterHandler ) {

	var player = {}

	player.type 		 = type;
	player.typeInStorage = null;
	player.lastNode 	 = null;
	player.stage 		 = 1;
	player.move 		 = 0;

	if ( type === 'heat' ) {
		player.message = 'Heat, warm it up!';

		player.action = function( evnt, elem ) {

			var $elem = $(elem);

			// If 'heat' clicks a liquid or a liquid ground zone after
			// putting liquid in storage			
			if ( player.typeInStorage === 'liquid'

				&& ( $elem.hasClass('ocean') || $elem.hasClass('lake') ) ) {

				// Deposit liquid there, but don't count this as an action
				var zone = $elem.find('.ground').eq(0);

				waterHandler.add( evnt, zone );
				waterHandler.remove( evnt, $('.ice') )

				// Remove everything from storage
				player.typeInStorage = null;

				player.move += 1;

			// If 'heat' clicks a liquid, turn it into gas
			} else if ( $elem.hasClass('liquid') && player.typeInStorage !== 'liquid') {

				var $parent = $elem.parents('.environment').eq(0),
					$sky 	= $parent.find('.sky');

				waterHandler.remove( evnt, $elem );
				waterHandler.add( evnt, $sky );

				player.move += 1;

			// If 'heat' clicks ice, turn it into liquid and
			// add it to the selected element. How?
			} else if ( $elem.hasClass('ice') && player.typeInStorage !== 'liquid' ) {
				player.typeInStorage = 'liquid';
			}

			// End the turn if more than 3 moves
			if ( player.move >= 3 ) {
				$('.game').trigger('next');
				player.move = 0;
			}

		};  // End player.action()


		player.highlight = function(evnt, elem) {


			if ( $(elem).hasClass('environment') || elem === undefined ) {
				setTimeout(function(){
					$('.available').removeClass('available');
					$('.display').removeClass('display');

					if (player.typeInStorage !== 'liquid') {
						$('.liquid, .ice').addClass('available');
						$('.heat.1').addClass('display');
					} else {
						$('.lake, .ocean').addClass('available');
						$('.heat.2').addClass('display');
					}
				}, 500)
			}

			return player;
		};


	} else if ( type === 'wind' ) {

		player.message = 'Wind, spread it around!';

		player.action = function( evnt, elem ) {

			var $elem = $(elem);

			if ( player.lastNode === null ) {
				
				if ( $elem.hasClass('environment') ) {
					player.lastNode = $elem.find('.gas')[0];
				}

			} else if ( $elem.hasClass('environment') ) {

				waterHandler.add( evnt, $elem.find('.sky').eq(0) );
				waterHandler.remove( evnt, player.lastNode );

				player.lastNode = null;

				player.move += 1

			}

			// End the turn if more than 3 moves
			if ( player.move >= 3 ) {
				$('.game').trigger('next');
				player.move = 0;
			}

		};  // End player.action()

		player.highlight = function(evnt, elem) {


			if ( $(elem).hasClass('environment') || elem === undefined ) {
				setTimeout(function(){
					$('.available').removeClass('available');
					$('.display').removeClass('display');

					if ( player.lastNode === null ) {
						$('.gas').addClass('available');
						$('.wind.1').addClass('display');
					} else {
						$('.lake, .ocean, .mountain').addClass('available');
						$('.wind.2').addClass('display');
					}
				}, 500)
			}

			return player;
		};


	} else if ( type === 'cold' ) {

		player.message = 'Chill it out.';

		player.action = function( evnt, elem ) {

			var $elem = $(elem)

			if (  $elem.hasClass('environment') ) {

				var $env 	= $elem,
					gas 	= $env.find('.gas')[0],
					$ground = $env.find('.ground').eq(0)

				if ( gas !== undefined ) {

					waterHandler.remove( evnt, gas );
					waterHandler.add( evnt, $ground );

					player.move += 1;
				}
			}  // end future unnecessary check for not-water-node

			// End the turn if more than 3 moves
			if ( player.move >= 3 ) {
				$('.game').trigger('next');
				player.move = 0;
			}

		}  // End player.action()


		player.highlight = function(evnt, elem) {

			if ( $(elem).hasClass('environment') || elem === undefined ) {
				setTimeout(function(){
					$('.available').removeClass('available');
					$('.display').removeClass('display');
console.log('removing display')
					var $env = $(elem),
						gas  = $env.find('.gas')[0];

					if ( gas !== undefined || elem === undefined ) {
						console.log('adding display')
						$('.lake, .ocean, .mountain').addClass('available');
						$('.cold.1').addClass('display');
					}
				}, 500)
			}

			return player;
		};

	}  // end which type of player


	return player;
};  // End Player() {}
