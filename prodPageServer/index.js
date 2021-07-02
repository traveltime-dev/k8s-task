const express = require('express');
var path = require('path');

const app = express();

const port = process.env.PORT || 3000;

const parentPath = __dirname.split(path.sep).slice(0,-1).join(path.sep);
const buildPath = path.join(parentPath, 'build')

app.use(express.static(buildPath));

app.get('/*', function(req, res) {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
