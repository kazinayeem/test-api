import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const url =
  "mongodb+srv://admin:admin123@cluster0.j0gm6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

 client.connect()
    const database = client.db("testing");
    const todo = database.collection("todo");

    
     app.get("/", async (req, res) => {
      try {
        const data = await todo.find({});
        const result = await data.toArray();
        res.send(result);
      } catch (error) {
        return res.status(500).json({
          message: "error",
        });
      }
    });
    app.post("/", async (req, res) => {
      const todos = req.body;

      try {
        await todo.insertOne(todos);

        return res.status(200).json({
          message: "insert successfull",
        });
      } catch (error) {
        return res.status(500).json({
          message: "error",
        });
      }
    });

   

    app.get("/:id", async (req, res) => {
      const id = ObjectId(req.params.id);
      try {
        const data = await todo.find({ _id: id });
        const result = await data.toArray();
        res.send(result);
      } catch (error) {
        return res.status(500).json({
          message: "error",
        });
      }
    });

    app.delete("/:id", async (req, res) => {
      const id = ObjectId(req.params.id);
      try {
        await todo.deleteOne({ _id: id });

        res.status(200).json({
          result: "delete successfull",
        });
      } catch (error) {
        return res.status(500).json({
          message: "error",
        });
      }
    });

app.listen();
