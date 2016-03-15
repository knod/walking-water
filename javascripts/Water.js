// water.js
// TODO: Do it all with the 'sky' and 'ground', not with the water itself

'use strict'

var Water = function () {

	var water = {};

	var iceStr = '<div class="ice" data-type="ice"></div>',
		liqStr = '<div class="liquid" data-type="liquid"></div>',
		gasStr = '<div class="gas" data-type="gas"></div>';

	// Two ideas for removal. (1) for a more manual version
	water.remove = function ( type, environmentNode ) {
		// Remove the last element of that type from the environment

		var $env 		= $(environmentNode),
			$elems 		= $env.find( '.' + type )
			$lastElem	= $elems[ $elems.length - 1 ].eq(0);

		$lastElem.remove();

		// Emit event?

		return water;
	};  // End water.remove()


	// (2) for an event version, though could be used with (null, elem)
	water.remove = function ( evnt, elem ) {
	// Remove the last element of that type from its environment
		var $elem 	= $(elem),
			// Will have to change if other classes are added
			type 	= $elem.data('type'),
			$parent = $elem.parent().eq(0),
			$elems 	= $parent.find('.' + type),
			$lastElem	= $($elems[ $elems.length - 1 ]);

		$lastElem.remove();

		// Emit event?

		return water;
	};  // End water.remove()


	// Just the event version this time
	water.add = function ( evnt, elem ) {
	// elem will be a parent element of a water type - sky or ground

		var $elem 	= $(elem),
			$parent = $elem.parent().eq(0);

		// Needs to have just one class here. Maybe should use data attr
		var type = $elem.data('type');
		var $node;

		if ( type === 'sky' ) {
			$node = $(gasStr)
			$elem.append( $node )

		// Otherwise, if it's in the ground
		} else {
			// If it's in a mountain, add ice
			if ( $elem.parents('.mountain').length > 0) {
				$node = $(iceStr)
				$elem.append( $node )

			// Otherwise it's in a body of water
			} else {
				$node = $(liqStr)
				$elem.append( $node )
			}
		}

		// $node.click(function materialClicked() {
		// 	// // Why is the console log triggering while the other stuff doesn't work?
		// 	// console.log('frog');
		// 	water.remove( evnt, this );
		// 	evnt.stopPropagation();
		// });

		$node.click(function materialClicked() {
			$('.game').trigger('action', [this] );
		});

		return water;
	};

	return water;
};  // End Water() {}
