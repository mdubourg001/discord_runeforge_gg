## discord_runeforge_gg
A Discord bot scraping runeforge.gg for League of Legends champion runes.

### Installation
First, go to [discordapp.com/developers/applications/me](discordapp.com/developers/applications/me) and create a new app, 
remember the token you will be given, you'll need it later!

Click on 'generate an OAuth2 url' and paste it in your browser.
Give the bot needed authorization on the Discord server you want to use it.
It needs at least permissions to connect and talk (if you are lazy, give it admin authorization, don't worry the bot is harmless).

Then, just grab your favorite shell and do:

```bash
# clone the project
git clone https://github.com/mdubourg001/discord_runeforge_gg.git

cd discord_runeforge_gg

# installing dependencies
npm install
```

**!IMPORTANT!** : put your bot token in the **auth.json** file, Discord need it to authenticate your bot.


### Usage
Wherever you want to host it (locally or on your server), using nodemon:

```
nodemon bot.js
```

Configure your trigger word in **config.json** if needed, by default, **!runes** is used.<br/>
In your Discord server (the one your authorized the bot to be), simply call the bot with:

```
!runes teemo
```

Output:
```
Runes for Teemo:
As primary runes...
| - Sorcery
| - Summon Aery
| - The Ultimate Hat
| - Celerity
| - Scorch
And as secondary...
| - Precision
| - Legend: Alacrity
| - Coup De Grace
URL: http://runeforge.gg/loadouts/thats-gotta-sting/

Runes for Teemo:
As primary runes...
| - Inspiration
| - Glacial Augment
| - Biscuit Delivery
| - Future's Market
| - Approach Velocity
And as secondary...
| - Sorcery
| - Absolute Focus
| - Scorch
URL: http://runeforge.gg/loadouts/doom-build/
```

#### Enjoy :) !



