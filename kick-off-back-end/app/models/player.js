//player.js
// Step 1: Define Mongoose model
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerName: String,
    marketValue: String,
    contract:String,
    club:String,
    archived: {
        type: Boolean,
        default: false
    }
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;


// Step 2: Scraping Logic
const cheerio = require('cheerio');
const axios = require('axios');
const cron = require('node-cron');

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
    }
};

const scrapeAndSaveData = async () => {
    try {
        const response = await axios.get('https://www.transfermarkt.com/football-scouting-and-transfer-aps/beraterfirma/berater/6684', options);
        const html = response.data;
        const $ = cheerio.load(html);

        const players = [];

        $('.items tbody tr').each((index, element) => {
            const playerName = $(element).find('.hauptlink a').text().trim();
            const marketValue = $(element).find('.zentriert.hauptlink').text().trim(); 
            const contract = $(element).find('.zentriert').eq(3).text().trim(); 

           
            if (playerName && marketValue && contract) {
                players.push({ playerName, marketValue, contract });
            }
        });

        for (const player of players) {
            const existingPlayer = await Player.findOne({ playerName: player.playerName });
            if (existingPlayer) {
                if (existingPlayer.marketValue !== player.marketValue ||
                    existingPlayer.contract !== player.contract) {
                    await Player.updateOne({ playerName: player.playerName }, { $set: { marketValue: player.marketValue, contract: player.contract } });
                    console.log(`Player data updated for: ${player.playerName}`);
                }
            } else {
                await Player.create(player);
                console.log(`New player added: ${player.playerName}`);
            }
        }

        console.log('Data saved to database');
    } catch (error) {
        console.error('Error fetching webpage:', error);
    }
};

// Schedule the scraping process to run every minute
cron.schedule('* * * * 1', scrapeAndSaveData);
