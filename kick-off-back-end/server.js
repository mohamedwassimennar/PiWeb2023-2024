const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require("morgan");
const path = require('path');

const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const multer = require('multer'); 
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();

const http = require('http');
const { disconnect } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");

const match = require('./app/models/matchrecord.model.js');

var matchroute=require('./app/routes/matchrecord.routes.js');
var playerscout=require('./app/routes/playerscout.routes.js');

const Player = require('./app/models/player.js'); 
const errorHandler = require("./app/middleware/errorHandler.js");
const routes = require('./app/routes/auth.js');
const authRoute = require("./app/routes/auth.routes.js");
const auth = require("./app/routes/auth.js");
const userRoute = require("./app/routes/user.routes.js");
const dbConfig = require('./app/config/database.config.js');

const performanceroutes=require('./app/routes/player_performance.routes.js')
const matchanalysisroutes=require('./app/routes/MatchAnalysis.routes.js')
const performancesummariesroutes=require('./app/routes/Performance Summary.routes.js')
const contactRoutes = require('./app/routes/contactRoutes.js');

const injuryroutes = require('./app/routes/injury.routes.js'); // Importez les routes des blessures
const recoveryroutes = require('./app/routes/recovery.routes.js')
const preventionroutes = require('./app/routes/prevention.routes.js')

app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Set up Express session middleware
const secret = crypto.randomBytes(32).toString('hex');
const uploade = multer({ dest: 'uploads/' });


app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201']
}));

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, 'uploads/')); // Répertoire de destination pour les fichiers téléchargés
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Nom de fichier unique
    }
});

const io = new Server(server, { // Seulement dans le deuxième extrait
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

const upload = multer({ storage: storage }); // Initialisation de multer avec la configuration de stockage


const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const NEWS_API_TOKEN = 'd0fa0bbdf9c7445b8e678a3242dd0211';


// Define a route to fetch football news
app.get('/football-news', async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'Champions League football soccer ',
                apiKey: NEWS_API_TOKEN
            }
        });

        const articles = response.data.articles;
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch news' });
    }
});

const FOOTBALL_API_TOKEN = 'f9efebbe79424ab8bb1e883faf6bb6bf';

// Route to fetch match schedules
app.get('/match-schedules', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v2/competitions/2014/matches', {
            headers: {
                'X-Auth-Token': FOOTBALL_API_TOKEN
            }
        });

        const matchSchedules = response.data.matches;
        res.json(matchSchedules);
    } catch (error) {
        console.error('Error fetching match schedules:', error);
        res.status(500).json({ error: 'Unable to fetch match schedules' });
    }
});

app.get('/match-schedulesSA', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v2/competitions/2019/matches', {
            headers: {
                'X-Auth-Token': FOOTBALL_API_TOKEN
            }
        });

        const matchSchedules = response.data.matches;
        res.json(matchSchedules);
    } catch (error) {
        console.error('Error fetching match schedules:', error);
        res.status(500).json({ error: 'Unable to fetch match schedules' });
    }
});
app.get('/scrape', async (req, res) => {
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
    };

    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);

        const response = await axios.get(`https://www.transfermarkt.com/live/index?datum=${formattedDate}`, options);
        const $ = cheerio.load(response.data);

        const matches = [];

        // Scrape league names
        const leagueNames = [];
        $('.wettbewerblogo').each((index, element) => {
            leagueNames.push($(element).attr('alt'));
        });

        // Scrape match data
        $('.begegnungZeile').each((index, element) => {
            const match = {};

            const homeTeamElement = $(element).find('.verein-heim a');
            match.homeTeam = {
                name: homeTeamElement.text().trim(),
                logo: homeTeamElement.find('img').attr('data-src')
            };

            const awayTeamElement = $(element).find('.verein-gast a');
            match.awayTeam = {
                name: awayTeamElement.text().trim(),
                logo: awayTeamElement.find('img').attr('data-src')
            };

            match.result = $(element).find('.ergebnis .matchresult').text().trim();

            // Scrape matchday information
            const matchdayInfo = $(element).find('.zeit').text().trim();
            if (matchdayInfo.includes("matchday")) {
                match.matchday = matchdayInfo;
            } else {
                match.timeElapsed = matchdayInfo;
            }

            // Assign league name based on index
            match.league = leagueNames[index] || "Unknown";

            matches.push(match);
        });

        res.json(matches);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Define route to upload CSV file and import data to MongoDB
app.post('/upload', uploade.single('csvFile'), async (req, res) => {
    const matches = [];
    const filePath = req.file.path;

    try {
        // Read the CSV file and parse data
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (data) => {
                // Push data into matches array
                matches.push(data);
            })
            .on('end', async () => {
                try {
                    // Loop through the matches array and save each record to the database
                    for (const data of matches) {
                        // Check if the data object contains the date property
                        if (data.date) {
                            // Parse the date from the CSV
                            const dateParts = data.date.split('/');
                            const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

                            // Create a new MatchRecord object with parsed date
                            const matchRecord = new match({
                                date: formattedDate,
                                opponent: data.opponent,
                                venue: data.venue,
                                team: data.team,
                                fixtureType: data.fixtureType,
                                matchStatus: data.matchStatus,
                                score: data.score,
                            });

                            // Save the MatchRecord object to the database
                            await matchRecord.save();
                        } else {
                            console.error('Date property is missing in the CSV data:', data);
                        }
                    }

                    // Remove the uploaded CSV file after parsing
                    fs.unlinkSync(filePath);

                    // Send the parsed data as JSON to client
                    res.json(matches);
                } catch (error) {
                    console.error('Error during CSV processing:', error);
                    res.status(500).send('Error occurred during CSV processing');
                }
            })
            .on('error', (err) => {
                console.error('Error while parsing CSV:', err);
                res.status(500).send('Error occurred while parsing CSV');
            });
    } catch (error) {
        console.error('Error during CSV processing:', error);
        res.status(500).send('Error occurred during CSV processing');
    }
});





app.use(cors(corsOptions)); 
app.use("/api", authRoute);
app.use("/auth", auth);
app.use("/api", userRoute);
app.use("/", routes);
app.use('/perfermance', performanceroutes);
app.use('/matchanalysis', matchanalysisroutes);
app.use('/performancesummariesroutes', performancesummariesroutes);
app.use('/contact', contactRoutes);
app.use('/injuries', injuryroutes);
app.use('/recovery', recoveryroutes);
app.use('/prevention', preventionroutes);

app.use("/scout", playerscout);
app.use("/match", matchroute);

require('./app/routes/stage.routes.js')(app, upload); // Passer l'instance de multer aux routes
require('./app/routes/evenement.routes.js')(app);
require('./app/routes/player.routes.js')(app);
require('./app/routes/meet.routes.js')(app);
require('./app/routes/trainingPlan.routes.js')(app);

// Middleware pour gérer les erreurs JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).send({ error: 'Erreur de syntaxe JSON' });
    } else {
        next(err);
    }
});

app.get('/apiExterneInjuries', (req, res) => {
  // Read the JSON data from a file or define it directly
  const injuryData = require('./injury-data.json');
  res.json(injuryData);
});

app.get('/apiExternePlayers', (req, res) => {
    // Read the JSON data from a file or define it directly
    const injuryDataplayer = require('./Performance-Data.json');
    res.json(injuryDataplayer);
  });


io.on('connection', (socket)=>{ // Seulement dans le deuxième extrait
    console.log('a user connected');
    socket.on('message',(msg)=>{
        console.log('message : ' + msg);
        io.emit('message', msg);
    })
    socket.on('disconnect',()=>{
    console.log('user disconnected')
    })
})

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { // Seulement dans le deuxième extrait
  console.log(`Server is listening on port ${PORT}`);
});

// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.get("/",(req,res)=>{res.send("kick-off")})