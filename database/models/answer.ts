import { DataTypes } from 'sequelize';
import connection from "../database";
import Question from './question'

const Answer = connection.define('answer',{
    body:{
        type: DataTypes.TEXT ,
        allowNull: false
    }
});

Question.hasMany(Answer);

Answer.belongsTo(Question);

Answer.sync().then(()=>{console.log("Table created")});

export default Answer;