'use strict';

const Command = require('../../Command.js');
const EnhancementEmbed = require('../../embeds/EnhancementEmbed.js');
const arcanes = require('../../resources/arcanes.json');

/**
 * Displays the response time for the bot and checks Warframe's servers to see if they are up
 */
class Arcane extends Command {
  /**
   * Constructs a callable command
   * @param {Genesis} bot The bot object
   */
  constructor(bot) {
    super(bot, 'warframe.misc.arcane', 'arcane', 'Get information about an Arcane Enhancement');
    this.regex = new RegExp('^arcane(.+)?', 'i');
    this.usages = [
      {
        description: 'Get information about an Arcane Enhancement',
        parameters: ['enhancement name'],
      },
    ];
  }

  /**
   * Run the command
   * @param {Message} message Message with a command to handle, reply to,
   *                          or perform an action based on parameters.
   */
  run(message) {
    let arcane = message.strippedContent.match(this.regex)[1];
    if (arcane) {
      arcane = arcane.trim().toLowerCase();
      arcanes.forEach((enhancement) => {
        if (new RegExp(enhancement.regex, 'ig').test(arcane)) {
          this.messageManager.reply(message, new EnhancementEmbed(enhancement), true, false);
        }
      });
    } else {
      this.messageManager.embed(message, new EnhancementEmbed(undefined), true, false);
    }
  }
}

module.exports = Arcane;