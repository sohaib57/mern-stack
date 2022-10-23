import mongoose from "mongoose";

const connect = async () => {
  await mongoose
    .connect(
      "mongodb+srv://SohaibAshraf:college123456789@mern-cluster.q3fdpq5.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("MongoDB connection is successful"))
    .catch((error) => {
      console.log(error);
    });
};

export default connect;
