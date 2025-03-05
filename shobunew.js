/**
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * ShobuNew implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * shobunew.js
 *
 * ShobuNew user interface script
 *
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter"
],
function (dojo, declare) {
    return declare("bgagame.shobunew", ebg.core.gamegui, {
        constructor: function(){
            console.log('shobunew constructor');

            // Here, you can init the global variables of your user interface
            // Example:
            // this.myGlobalValue = 0;

        },

        /*
            setup:

            This method must set up the game user interface according to current game situation specified
            in parameters.

            The method is called each time the game interface is displayed to a player, ie:
            _ when the game starts
            _ when a player refreshes the game page (F5)


            "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
        */

        setup: function( gamedatas )
        {
            console.log( "Starting game setup" );
			console.info('These are our stones');
			console.info(gamedatas.stones);

            /**
             * Format the stone ID for the HTML element.
             *
             * @param player string The player number that will be added to the element Class.
             * @param id string The stone number that will be added to the element ID.
             * @returns {`stone${string}`}
             */
            const stone_id_format = (player, id) => `stone${id}`;

            /**
             * Format the square ID for the HTML element.
             *
             * @param board
             * @param id
             * @returns {`square${string}`}
             */
            const square_id_format = (board, id) => `square${id}`;

			// RENDER SQUARES
            /**
             * Render the squares for a board. This will render 16 squares in a 4x4 grid.
             *
             * @param board string The board number that will be added to the element ID.
             * @param top int The absolute top position of the board.
             * @param left int The absolute left position of the board.
             * @param offset int The offset to start the square numbering. This is required because we have 64 squares, but always render 16 at a time.
             */
            const renderBoardSquares = ( board, top, left, offset = 0 ) => {
					let row = 0;
					let col = 0;
					let html = '';
					let color = board % 2 ? 'dark' : 'light';
					let number = 0;
					for(let i = 0 + offset; i < 16 + offset; i++) {
						row = Math.floor((i - offset) / 4);
						col = (i - offset) % 4;
						number = i + 1;
						let top_tpl = (91.25 * row) + top;
						let left_tpl = (91.25 * col) + left;
						let square_id = square_id_format(board, number);
						html += `<div id="${square_id}" class="square piece-${number} board-${board} board-${color}" style="top:${top_tpl}px; left:${left_tpl}px"></div>`;
					}
					document.getElementById('squares').innerHTML += html;
			}
            // TODO: IF player 2, we need to flip the board, so the squares are rendered in reverse order.
            // Render the four boards with their absolute position and square count offset.
			renderBoardSquares(1, 0, 0);
			renderBoardSquares(2, 0, 365 + 20, 16);
			renderBoardSquares(3, 365 + 20, 0, 32);
			renderBoardSquares(4, 365 + 20, 365 + 20, 48);

			// RENDER STONES
            /**
             * Animate a ElementbyID to a target ElementbyID. In this case the stone to a square.
             *
             * @param stone_id String
             * @param square_id String
             */
            const moveStone = async ( stone_id, square_id ) => {
				console.log('Animating piece: ',stone_id, ' to ', square_id);
				const anim = this.slideToObject( stone_id, square_id );
				return await this.bgaPlayDojoAnimation(anim);
			}

            /**
             * Add Object Typing for Stone for IDE autocompletion.
             * @type {{board: string, player: string, id: string, square: string}} StoneType
             */
            const StoneType = {
                "board": '',
                'player': '',
                'id': '',
                'square': ''
            }

            /**
             * Add a stone to the board and then move it to it's assigned square.
             *
             * @param {StoneType} stone
             * @returns {string}
             */
			const addStoneToBoard = ( stone ) =>{
				// Generate HTML
				let stone_id = stone_id_format(stone.board, stone.id);
				let square_id = square_id_format(stone.board, stone.square);
				document.getElementById('stones').insertAdjacentHTML('beforeend', `<div id="${stone_id}" class="stone stone-${stone.player}"></div>`);
				this.placeOnObject(stone_id, 'overall_player_board_' + this.player_id);

				// Move stone to square
				moveStone( stone_id, square_id ).then(() => {});
				return stone_id;
			}

			// Convert object list to array so it's iterable.
            /**
             * @type {StoneType[]}
             */
			let stones = Object.values(gamedatas.stones);
			console.log('Stones', stones);

			stones.forEach(stone => {
				addStoneToBoard( stone );
			});


            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
        },


        ///////////////////////////////////////////////////
        //// Game & client states

        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args )
        {
            console.log( 'Entering state: '+stateName, args );

            switch( stateName )
            {

            /* Example:

            case 'myGameState':

                // Show some HTML block at this game state
                dojo.style( 'my_html_block_id', 'display', 'block' );

                break;
           */


            case 'dummy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( 'Leaving state: '+stateName );

            switch( stateName )
            {

            /* Example:

            case 'myGameState':

                // Hide the HTML block we are displaying only during this game state
                dojo.style( 'my_html_block_id', 'display', 'none' );

                break;
           */


            case 'dummy':
                break;
            }
        },

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //
        onUpdateActionButtons: function( stateName, args )
        {
            console.log( 'onUpdateActionButtons: '+stateName, args );

            if( this.isCurrentPlayerActive() )
            {
                switch( stateName )
                {
                 case 'playerTurn':
                    const playableCardsIds = args.playableCardsIds; // returned by the argPlayerTurn

                    // Add test action buttons in the action status bar, simulating a card click:
                    playableCardsIds.forEach(
                        cardId => this.addActionButton(`actPlayCard${cardId}-btn`, _('Play card with id ${card_id}').replace('${card_id}', cardId), () => this.onCardClick(cardId))
                    );

                    this.addActionButton('actPass-btn', _('Pass'), () => this.bgaPerformAction("actPass"), null, null, 'gray');
                    break;
                }
            }
        },

        ///////////////////////////////////////////////////
        //// Utility methods

        /*

            Here, you can defines some utility methods that you can use everywhere in your javascript
            script.

        */



        ///////////////////////////////////////////////////
        //// Player's action

        /*

            Here, you are defining methods to handle player's action (ex: results of mouse click on
            game objects).

            Most of the time, these methods:
            _ check the action is possible at this game state.
            _ make a call to the game server

        */

        // Example:

        onCardClick: function( card_id )
        {
            console.log( 'onCardClick', card_id );

            this.bgaPerformAction("actPlayCard", {
                card_id,
            }).then(() =>  {
                // What to do after the server call if it succeeded
                // (most of the time, nothing, as the game will react to notifs / change of state instead)
            });
        },


        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        /*
            setupNotifications:

            In this method, you associate each of your game notifications with your local method to handle it.

            Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                  your shobunew.game.php file.

        */
        setupNotifications: function()
        {
            console.log( 'notifications subscriptions setup' );

            // TODO: here, associate your game notifications with local methods

            // Example 1: standard notification handling
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );

            // Example 2: standard notification handling + tell the user interface to wait
            //            during 3 seconds after calling the method in order to let the players
            //            see what is happening in the game.
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            // this.notifqueue.setSynchronous( 'cardPlayed', 3000 );
            //
        },

        // TODO: from this point and below, you can write your game notifications handling methods

        /*
        Example:

        notif_cardPlayed: function( notif )
        {
            console.log( 'notif_cardPlayed' );
            console.log( notif );

            // Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call

            // TODO: play the card in the user interface.
        },

        */
   });
});
