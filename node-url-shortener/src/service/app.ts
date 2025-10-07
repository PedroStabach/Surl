import express, { Router } from 'express';
import cors from 'cors';
import authRoutes from '../auth/loginRoutes'; // Importe seu roteador
import router from '../Routes/routes';
import redirectRouter from '../Routes/redirectRouter';

const app = express();
const port = 3000;

app.use(express.json()); // Permite que o Express leia o corpo das requisições JSON
app.use(cors()); // Se você ainda não fez isso, é crucial para evitar erros de CORS

// Use o roteador para a rota '/auth'
app.use('/auth', authRoutes); // Isso associa as rotas de login, etc., à URL /auth
app.use(router)
app.use('/', redirectRouter);
app.get("/", (req, res) => {
  res.send("🚀 API Surl rodando com sucesso!");
});
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});