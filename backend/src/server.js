const port = process.env.PORT || 3001;
const app = require('./app');

app.listen(port);
console.log(`API running on port ${port}`);
