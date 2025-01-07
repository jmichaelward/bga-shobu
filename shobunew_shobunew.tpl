{OVERALL_GAME_HEADER}

<!--
--------
-- BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
-- ShobuNew implementation : © <Your name here> <Your email address here>
--
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------

    shobunew_shobunew.tpl

    This is the HTML template of your game.

    Everything you are writing in this file will be displayed in the HTML page of your game user interface,
    in the "main game zone" of the screen.

    You can use in this template:
    _ variables, with the format {MY_VARIABLE_ELEMENT}.
    _ HTML block, with the BEGIN/END format

    See your "view" PHP file to check how to set variables and control blocks

    Please REMOVE this comment before publishing your game on BGA
-->

<script type="text/javascript">

// Javascript HTML templates

/*
// Example:
var jstpl_some_game_item='<div class="my_game_item" id="my_game_item_${MY_ITEM_ID}"></div>';

*/
const jstpl_piece = '<div ' +
    'id="${board_number}_square_${row}_${col}" ' +
    'class="square piece-${number} board-${board_number} board-${color}" '+
    'style="top:${top}px; left:${left}px"' +
    '></div>';
</script>


<!-- BOARDS -->
<div id="boards">
    <div id="stones"></div>
    <div id="squares"></div>
</div>

{OVERALL_GAME_FOOTER}
