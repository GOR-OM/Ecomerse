import app from "./app.js";
import { connectDB } from "./database/database.js";

connectDB();


const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on https://locolhost:${process.env.PORT}`);
});


// unhanded promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});