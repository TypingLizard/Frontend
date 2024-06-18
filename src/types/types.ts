/**
 * A selection of game modes that the user can choose from.
 * @type {GameMode}
 */
export type GameMode = 'Standard' | 'Hardcore' | 'Words10' | 'Words1000' | 'Gibberish';

/**
 * A global timer that is used to keep track of the time left in the game.
 * The timer is in seconds.
 * @type {number}
 */
export type GlobalTimer = number;