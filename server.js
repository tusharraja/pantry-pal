import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan'
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
 import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js' 

// const session=require("express-session");
// const passport=require("passport");
// const OAuth2Strategy=require("passport-google-oauth2").Strategy;
// const userdb=require("./models/fakeuserModel")



// const clientid="81372617911-86h6qd33pcn16njonv9tojo8jeg1llm9.apps.googleusercontent.com"
// const clientsecret="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"


// Load environment variables from .env file
dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// app.use(session({
//     secret:"1524617hdshah",
//     resave:false,
//     saveUninitialized:true
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//     new OAuth2Strategy(
//         {
//             clientID:clientid,
//             clientSecret:clientsecret,
//             callbackURL:"/auth/google/callback",
//             scope:["profile","email"]
//         },
//         async(accessToken,refreshToken,profile,done)=>{
//             try{
//                 let user=await userdb.findOne({
//                     googleId:profile.id
//                 });
//                 if(!user){
//                     user=new userdb({
//                         googleId:profile.id,
//                         displayName:profile.displayName,
//                         email:profile.emails[0].value,
//                         image:profile.photos[0].value
//                     });

//                     await user.save();
//                 }
//                 return done(null,user)


//             }
//             catch(error){
//                 return done(error,null)
//             }
//         }
//     )
// )

// passport.serializeUser((user,done)=>{
//     done(null,user);
// })

// passport.deserializeUser((user,done)=>{
//     done(null,user);
// })

// app.get("/auth/google",passport.authenticate("google",{
//     scope:["profile","email"]
// }));

// app.get("/auth/google/callback",passport.authenticate("google",{
//     successRedirect:"http://localhost:3000/dashboard",
//     failureRedirect:"http://localhost:3000/login"
// }));



app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to pantrypal</h1>");
}); 

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode ON port ${PORT}`.bgCyan.white);
});










