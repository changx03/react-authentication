const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./server/routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', PORT);

app.use('/auth', authRoutes);

// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(`${__dirname}/server/static/index.html`));
// });

app.listen(app.get('port'), () => {
  console.log(`Express started on http://localhost:${app.get('port')} press Ctrl-C to terminate`);
});
