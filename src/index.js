const express = require('express');
const path = require('path');

const orbitsRouter = require('./routes/orbits');
const orbitsService = require('./services/orbitsService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/orbits.json');

orbitsService.init(DATA_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Orbit API работает'
    });
});

app.use('/orbits', orbitsRouter);

app.use((req, res) => {
    res.status(404).json({
        error: 'Маршрут не найден'
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: 'Внутренняя ошибка сервера'
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});