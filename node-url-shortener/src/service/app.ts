import express from 'express';
import routes from '../Routes/routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use("/surl", routes)

app.listen(port, () => {
    console.log(`server running ate ${port}`);
});
