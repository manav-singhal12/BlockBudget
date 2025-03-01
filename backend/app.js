import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';




const app=express();

app.use(cors({
    origin:'*',
    credentials:true
}));

app.use(express.json({
    limit:"50kb",
}));

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());


//authentication routes
import userRouter from './src/routes/user.routes.js'
app.use('/api/user',userRouter);



export{app};