import express from 'express';
import cors from 'cors';
import authRoutes from '../auth/loginRoutes';
import router from '../Routes/routes';
import redirectRouter from '../Routes/redirectRouter';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000; // Porta dinâmica do Azure

app.use(express.json());
app.use(cors());

// Rota raiz de teste
app.get("/", (req, res) => {
  res.send("🚀 API Surl rodando com sucesso!");
});

// Rotas da aplicação
app.use('/auth', authRoutes);
app.use(router);
app.use('/', redirectRouter);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
