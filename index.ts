import express from "express";
import connection from "./database/database";
import Question from './database/models/question';
import Answer from './database/models/answer';
import 'dotenv/config';


connection.authenticate().then(()=>{console.log("Conected")}).catch((err)=>{console.log(err)});

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine','ejs');

app.get('',(req,res)=>{
    Question.findAll({raw:true,order:[['id','DESC']]}).then(questions=>{
        console.log(questions);
        res.render('index',{questions});
    });
});

app.get('/ask',(req,res)=>{
    res.render('ask')
});

app.post('/savequestion',express.urlencoded({extended:true}),(req,res)=>{
    const {questionTitle, questionDesc} = req.body;
    Question.create({title:questionTitle,desc:questionDesc}).then(()=>{
        res.redirect('/');
    });
});

app.post('/answer',express.urlencoded({extended:true}),(req,res)=>{
    let {body, questionId} = req.body;
    Answer.create({
        body,questionId
    }).then(()=>{res.redirect(`/question/${questionId}`)});
});

app.get('/question/:id',(req,res)=>{
    let id = req.params.id;
    Question.findOne({where:{id}}).then(q=>{
        if(!q){
            return res.redirect('/');
        }

        Answer.findAll({where:{questionId:id},order:[['id','DESC']]}).then((answers)=>{
            res.render('question',{question:q,answers});
        });

        
    });
});

app.listen(PORT,()=>{console.log("Server running on port " + PORT)});