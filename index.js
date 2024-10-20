import express from "express";
import expressOasGenerator from '@mickeymond/express-oas-generator';
import mongoose from "mongoose";
import { dbconnection } from "./config/db.js";
import passport from "passport";

import userRouter from "./routes/userRoute.js";
import userProfileRouter from "./routes/userProfileRoute.js";

const app = express();

// ExpressOasGenerator ResponseHandler
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['Auth', 'Profile'],
    mongooseModels: mongoose.modelNames()
})

// Database connection
dbconnection();

// Middlewares
app.use(express.json());
app.use(passport.initialize());

// use routes
app.use('/api/v1', userRouter);
app.use('/api/v1', userProfileRouter);

//ExpressOasGenerator requests
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs'));

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});