import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";

import healthRoute from './routes/health.route';
import taskCategoryRoute from './routes/taskCategory.route';
import taskRoute from "./routes/task.route";
import shoppingItemRoute from './routes/shoppingItem.route';
import budgetRoute from './routes/budget.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME
} = process.env;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/health', healthRoute);
app.use('/v1/task-categories', taskCategoryRoute);
app.use('/v1/shopping-items', shoppingItemRoute);
app.use('/v1/budgets', budgetRoute);
app.use("/v1/tasks", taskRoute);

mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@tetplannerpro.3yuf5p8.mongodb.net/${DB_NAME}?appName=TetPlannerPro`)
    .then(async () => {
        console.log("Connected to database!");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(() => {
        console.log("Connection failed!");
    })