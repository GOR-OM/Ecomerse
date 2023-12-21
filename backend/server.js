import app from "./app.js";
import { connectDB } from "./database/database.js";

connectDB();


app.listen(process.env.PORT, () => {
  console.log(`Server running on https://locolhost:${process.env.PORT}`);
});