<?php
/**
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * ShobuNew implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on https://boardgamearena.com.
 * See http://en.doc.boardgamearena.com/Studio for more information.
 * -----
 *
 * shobunew.action.php
 *
 * ShobuNew main action entry point
 *
 *
 * In this file, you are describing all the methods that can be called from your
 * user interface logic (javascript).
 *
 * If you define a method "actMyAction" here, then you can call it from your javascript code with:
 * this.bgaPerformAction("actMyAction", ...)
 *
 */
declare(strict_types=1);

/**
 * @property ShobuNew $game
 */
class action_shobunew extends APP_GameAction
{
    /**
     * This is the constructor. Do not try to implement a `__construct` to bypass this method.
     */
    public function __default()
    {
        if ($this->isArg("notifwindow"))
        {
            $this->view = "common_notifwindow";
            $this->viewArgs["table"] = $this->getArg("table", AT_posint, true);
        }
        else
        {
            $this->view = "shobunew_shobunew";
            $this->trace("Complete re-initialization of board game.");
        }
    }
}


