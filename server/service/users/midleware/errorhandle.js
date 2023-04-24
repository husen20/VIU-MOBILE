function errorHandler(err, req, res, next) {
  if (err.name === 'requiredEmail') {
    res.status(400).send({ message: 'Email is required' });
  } else if (err.name === 'formatEmail') {
    res.status(400).send({ message: 'Email format must be correct' });
  } else if (err.name === 'emailUniq') {
    res.status(400).send({ message: 'Email must be uniq!' });
  } else if (err.name === 'requiredPassword') {
    res.status(400).send({ message: 'Password is required' });
  } else if (err.name === 'formatPassword') {
    res.status(400).send({ message: 'Password must greater equals 5' });
  } else if (err.name === 'NotFound') {
    res.status(404).json({ message: 'File not found' });
  } else {
    res.status(500).send('Internal server error');
  }
}

module.exports = errorHandler;
