const fs = require('fs');
const util = require('util');
const http = require('http');
const mineflayer = require('mineflayer');
var socks = require('socksv5');
const readFile = util.promisify(fs.readFile);
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')

let bots = [];

let accounts = [];
let proxies = [];

class MineFlayer {
    initBot(account, config, version) {

        var lol = () => {
            this.initBot(account, config, version)
        };

        process.on('uncaughtException', function (err) {
            console.error(err);
        });


        const options = {
            host: config.host,
            port: config.port,
            version: version,
            accessToken: account[2],
            skipValidation: true,
            session: {
                accessToken: account[2],
                selectedProfile: {
                    id: account[1],
                    name: account[0],
                },
                availableProfile: [
                    {
                        id: account[1],
                        name: account[0],
                        skins: [],
                        capes: [],
                    },
                ],
            },
            auth: 'mojang',
        };

        const bot = mineflayer.createBot(options);
        bot.loadPlugin(pathfinder)

        bot.on('kicked', (reason) => {
            console.log("Kicked");
            setTimeout(lol, 1000)
        });

        bot.on('error', (err) => {
            console.log(err);
            setTimeout(lol, 1000)
        });

        bot.once('spawn', () => {
            bots.push(bot);
        });

    }

    async join(host, port, delay, version, amount) {
        try {
            const file = await readFile("sessions.txt", 'utf8');
            accounts = file.split(/\r?\n/).map((login) => login.split(':'));
            
            const config = {
                host: host,
                port: port,
                file: './sessions.txt',
                interval: delay,
            };

            const botPromises = accounts.map((account, index) =>
                new Promise((resolve) => {
                    if (index >= amount) {
                        return
                    }
                    setTimeout(() => {
                        var randomIndex = Math.floor(Math.random() * proxies.length);
                        this.initBot(account, config, version);
                    }, config.interval * index);
                })
            );

            await Promise.allSettled(botPromises);
            console.log(
                `Bots (${bots.length} / ${accounts.length}) successfully logged in.`
            );
        } catch (err) {

        }
    }


    async chat(message) {
        bots.forEach(e => {
            e._client.write('chat', { message: message });
        });
    }

    async disconnect() {
        bots.forEach(e => {
            e.quit();
        });
        bots = []
    }

    async moveToCoordinates(x, y, z) {
        bots.forEach(e => {
            const defaultMove = new Movements(e);
            e.pathfinder.setMovements(defaultMove);
            e.pathfinder.setGoal(new GoalNear(x, y, z));
        })
    }

    async moveToPlayer(target) {
        bots.forEach(e => {
            const defaultMove = new Movements(e);
            const targ = e.players[target]?.entity
            if (targ == null) {
                return
            }
            const { x: playerX, y: playerY, z: playerZ } = targ.position
            e.pathfinder.setMovements(defaultMove)
            e.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, 1))
        })
    }

    getBots() {
        return bots;
    }

}

module.exports = MineFlayer