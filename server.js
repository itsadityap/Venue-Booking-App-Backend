require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.SERVER_PORT || 4000;

// Default Middlewares
app.use(express.json());
app.use(cors());

// Importing Routes
const authRoutes = require('./routes/auth');
const authReviewerRoutes = require('./routes/authReviewer');
const createRequestRoutes = require('./routes/createRequest');
const getReviewersRoutes = require('./routes/getAllReviewers');
const getAllRequestsReviewersRoutes = require('./routes/getRequestsReviewers');
const getAllRequestsRequesterRoutes = require('./routes/getRequestsRequester');
const approveRequestRoutes = require('./routes/authorizeRequest');
const denyRequestRoutes = require('./routes/DenyRequest');
const deleteRequestRoutes = require('./routes/deleteRequest');
const editRequestRoutes = require('./routes/editRequest');

// MongoDB Configuration.
mongoose.connect(process.env.MONGO_DB_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log(err);
});

// Implementing Routes.
app.use('/api/v1/user', authRoutes)
app.use('/api/v1/reviewer', authReviewerRoutes)
app.use('/api/v1/', createRequestRoutes)
app.use('/api/v1/', getReviewersRoutes)
app.use('/api/v1/', getAllRequestsReviewersRoutes)
app.use('/api/v1/', getAllRequestsRequesterRoutes)
app.use('/api/v1/', approveRequestRoutes)
app.use('/api/v1/', denyRequestRoutes)
app.use('/api/v1/', deleteRequestRoutes)
app.use('/api/v1/', editRequestRoutes)

// Starting the server.
app.listen(port, () => {
  console.log(`Server is listening on PORT: ${port}`);
});
