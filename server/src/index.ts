import app from "./utils/Server";
import errorHandler from "./middlewares/errorHandler";


app.listen(8080, () => {
  console.log(`8080 Port Server Start`);
  app.use(errorHandler);
});