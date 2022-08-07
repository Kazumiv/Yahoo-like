import {Sequelize} from 'sequelize';
import 'dotenv/config';
const DBPASS = process.env.DBPASS

const connection = new Sequelize('yahoolike','root',DBPASS,{
    host:'localhost',
    dialect:'mysql'
});

export default connection;