const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUErVU5nWGplajNIWFNWZnlpRloraFJZRHova09OVzZXSFlIUkxCVmRrQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZXA4cDZEKzU1dHF6Z283UnpGTnYvQ0Yzem9XMHlza2lJSTU5djBHM3FBaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4QnB5MldPcHk0RVdOT3lmZXVRZ0RrZ1NqN0RuSThaRUJtS3ZOSXhsMEhvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySHZ5WjA4dmMyMXl5aTZrN1VFQVhaWnMwNzFXdkNTdTBvZW91K09OR3o0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJEVHliUE5lREx6ZTMxTHZQZFppNTdhemRyOTNpVlNiYmxaVzhTMWk4Mm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdPcnY5U243Rk5ROWFLenlZYUN4Z0tHdjZqTW9wOHNXRnZzWmdDU21XUjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0lRMGIvTC9tUSt5cSt5aitDa1JoWmRIR0o5WWdsMGc4QmdHZ01Ra0NGbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV05DYnZZZzZGU2cxbUp5cjk3TFJJOXBNbGNYQ2xRN3JTQ3NlQ0ZJV1ZIND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJuTkJDWmRsVHN3cUFXRjFQZTl6Mk8rTUk5NU5xQkxGbGJycmo5NUdzanpqN09MRWJXUGhlVm5Zd2xpWmVFUCtvcFpxMHNTeUpYcU1rYzQ2L05WdWpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMwLCJhZHZTZWNyZXRLZXkiOiJtOTBIMUxRYm5UcUZGeVR6RUI1aG5VOUpKNm56b2pKZnBHa3BuT3hKdjJJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3Njg3MzM0NDA3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE4MDUzMjI4NTVENDZDM0U5RUZDODA4MzQzMDkzNjQyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjMwOTk1NzJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3Njg3MzM0NDA3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQyNDE5QkUzNzA0Rjk2N0VFNkI5QTVCQ0I2NkI4QzQ4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjMwOTk1NzN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InNNdE9VV1F1UVl5c2RuNDJVcU91QVEiLCJwaG9uZUlkIjoiOTE5YWQ5OWUtODNiNi00NTQ5LTk2OWEtYjgyOGU2YzI1MzA4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilh4N015ZGNxMnA3ZG5IdGU1ZysweTJFbEtOND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4T05WN2ZOVDE4Z3NZdWd2NWJpNzBKUHFtWkU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNFFUMVA4RVAiLCJtZSI6eyJpZCI6IjI3Njg3MzM0NDA3OjI1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6InByaW5jZW1hc2hhbWJhMDkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01mSXZjRUhFS1hUMGJVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlBFTHJoblpHYWRZRjUwL2hnTzFQWStzS3ptNEhTY0xYVGFLTjN2M09HaVU9IiwiYWNjb3VudFNpZ25hdHVyZSI6InRrak9Eb0lIcW51bTZSVVZyak5oNVFSOTd1VDQ1d2oxTklrODgwS2dnOTNsSDcxM2FYKzNqb3VrL1RMQVh0eGFwZ0F0VmwzMUJRTGI5L2tkSFRPU0J3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrbGh1Q2syWWRzT2UySTdqZGlTdFdpVXRNR0JaTm4xRFRiNllId2hKaFJMUVNvajhEMVZRT1JIb24xVVZsVCtLbTVPdXgwMTNQZm5IT3FLc01vdEJndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3Njg3MzM0NDA3OjI1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlR4QzY0WjJSbW5XQmVkUDRZRHRUMlByQ3M1dUIwbkMxMDJpamQ3OXpob2wifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMwOTk1NzAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTml0In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
