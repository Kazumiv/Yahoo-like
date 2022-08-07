import { DataTypes} from 'sequelize';
import connection from "../database";

const Question = connection.define('question',{
    title:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    desc:{
        type: DataTypes.TEXT
    }
});

Question.sync().then(()=>{console.log("Table created")});

export default Question;