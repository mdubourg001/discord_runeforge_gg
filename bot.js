let discord = require('discord.js');
let logger = require('winston');
let scraperjs = require('scraperjs');
let auth = require('./auth.json');
let config = require('./config.json');

// ======= configuration ======== //

const trigger = config.trigger;

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// =========== utils =========== //

function scrap_page(url, msg, champ) {
    scraperjs.StaticScraper.create(url)
    .scrape(function ($) {

        return $('.rune-name').map(function () {
            return $(this).text();
        }).get();

    }).then(function (runes) {

        let primary = runes.slice(0, 5);
        let secondary = runes.slice(5);
        msg.channel.send('\nRunes for ' + champ + ':\nAs primary runes...');
        msg.channel.send(primary.map(x => '| - ' + x));
        msg.channel.send('\nAnd as secondary...')
        msg.channel.send(secondary.map(x => '| - ' + x));
        msg.channel.send('\nURL: ' + url);
    });
}

// ========== bot stuff ========== //

bot = new discord.Client();

bot.on('ready', () => {
    logger.info('Connected to a channel.');
});

bot.on('message', msg => {
    if (msg.content.split(' ')[0] === trigger) {
        logger.info((new Date().toString()) + ' - [RECV]: ' + msg.content);
        let keywords = msg.content.split(' ');
        if (keywords.length < 2)
            msg.channel.send(config.no_champion_provided);

        else {
            keywords.shift();
            let champ_name = keywords.join();

            scraperjs.StaticScraper.create('http://runeforge.gg/')
                .scrape(function ($) {
                    return $(".champion-name").map(function () {

                        if ($(this).text().toLowerCase() === champ_name.toLowerCase()) {
                            let builds = [];

                            let champ_modal = $(this).parent().attr('data-loadouts');
                            if (champ_modal) {
                                JSON.parse(champ_modal).forEach(function (b) {
                                    builds.push(b.link);
                                });

                                logger.info(builds);
                            } else {
                                builds.push($(this).parents('a').first().attr('href'));
                            }

                            for (let i = 0 ; i < builds.length ; i++) {
                                scrap_page(builds[i], msg, champ_name);
                            }
                        }
                    }).get();
                });
        }
    }
});

bot.login(auth.token);

