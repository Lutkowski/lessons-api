import { app } from './app.js';

const PORT = 8080;

app.use((req, res) => {
    res.status(404).json({ error: 'Not found. Use /lessons endpoint.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
