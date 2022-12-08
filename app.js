require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

//Swagger
const swaggerUI = require("swagger-ui-express");
YAML = require("yamljs");

const express = require("express");
const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const adminRouter = require("./routes/admin");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);

// app.use(apiLimiter);
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(xss());
app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/admin/jobs", adminRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
