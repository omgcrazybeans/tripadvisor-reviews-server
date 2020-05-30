module.exports = {
  genericQueryHandler: (res) => {
    return (error, res, fields) => {
      if(error) {
        console.error(error);
        res.status(500).send(error);
      } else {
        res.status(200).send(res);
      }
    }
  }
}