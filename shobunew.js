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

			const boards = 4;
			const boardGrid = 16;
			const defaultBoardState = [
				1,1,1,1,
				0,0,0,0,
				0,0,0,0,
				2,2,2,2,
			];
			const board1State = defaultBoardState.slice();
			const board2State = defaultBoardState.slice();
			const board3State = defaultBoardState.slice();
			const board4State = defaultBoardState.slice();

			const renderSquares = (board, boardState, board_number, top = 0, left = 0) => {

				let html = '';

				boardState.forEach((value, index) => {
					let row = Math.floor(index / 4);
					let col = index % 4;

					html += this.format_block('jstpl_piece', {
						'number': value,
						'col': col + 1,
						'row': row + 1,
						'top': (91.25 * row) + top,
						'left': 91.25 * col + left,
						'board_number': board,
						'color' : board_number % 2 ? 'dark' : 'light',
					});
				});

				document.getElementById('squares').innerHTML += html;
			}

			const moveStone = async ( board, row, col, player, number ) => {
				let square_id = `${board}_square_r${row}_c${col}`;
				let stone_id = `${board}_stone_n${number}_p${player}`;
				console.log('Animating piece: ',stone_id, ' to ', square_id);
				const anim = this.slideToObject( stone_id, square_id );
				await this.bgaPlayDojoAnimation(anim);
			}

			const addPieceToBoard = ( board, row, col, player, number ) =>{
				let stone_id = `${board}_stone_n${number}_p${player}`;
				document.getElementById('stones').insertAdjacentHTML('beforeend', `<div id="${stone_id}" class="stone stone-${player}"></div>`);
				this.placeOnObject( stone_id, 'overall_player_board_'+this.player_id );
				moveStone( board, row, col, player, number ).then(() => {});
				return stone_id;
			}
			const renderStones = (board, boardState) => {
				let ids = [];

				boardState.forEach((player, index) => {
					let row = Math.floor(index / 4);
					let col = index % 4;
					let player_number = 0;
					if(player === 0) return;
					addPieceToBoard(board, row + 1, col +1, player, index + 1);
				});
			}


			console.log('Render boards');
			let offset = 365 + 20;
			renderSquares('board_1', board1State, 1);
			renderSquares('board_2', board2State, 2, 0, offset );
			renderSquares('board_3', board3State, 3, offset, 0 );
			renderSquares('board_4', board4State, 4, offset, offset );

			console.log('Render pieces');
			renderStones('board_1', board1State);
			renderStones('board_2', board2State);
			renderStones('board_3', board3State);
			renderStones('board_4', board4State);



            // Setting up player boards
            // Object.values(gamedatas.players).forEach(player => {
            //     // TODO: Setting up players boards if needed
			//
            //     // example of adding a div for each player
            //     document.getElementById('player-tables').insertAdjacentHTML('beforeend', `
            //         <div id="player-table-${player.id}">
            //             <strong>${player.name}</strong>
            //
            //         </div>
            //     `);
            // });

            // TODO: Set up your game interface here, according to "gamedatas"


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
