import * as express from "express";
import helmet from "helmet";
import * as fileUpload from "express-fileupload";
import * as path from "path";
import * as cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import config from "../config";
import routers from "../routes";
import errorHandler from "../middlewares/errorHandler";
const app = express();
const swaggerDocument = require("../../swagger_output.json");
config();
app.use(express.json());
app.use(cors())
app.use("/uploads", express.static(path.join( "./src", "uploads")));
app.use(helmet());
app.use(fileUpload());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/api", routers);

app.use(errorHandler);

export default app;