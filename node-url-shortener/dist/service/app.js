"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const loginRoutes_1 = __importDefault(require("../auth/loginRoutes"));
const routes_1 = __importDefault(require("../Routes/routes"));
const redirectRouter_1 = __importDefault(require("../Routes/redirectRouter"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // Porta dinâmica do Azure
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Rota raiz de teste
app.get("/", (req, res) => {
    res.send("🚀 API Surl rodando com sucesso!");
});
// Rotas da aplicação
app.use('/auth', loginRoutes_1.default);
app.use(routes_1.default);
app.use('/', redirectRouter_1.default);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
