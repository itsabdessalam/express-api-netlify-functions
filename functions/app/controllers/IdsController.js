module.exports = {
  getMultipleViewIDs: (req, res) => {
    const ids = [],
      { count } = req.params,
      idsCount = parseInt(count, 10) < 30 ? parseInt(count, 10) : 30,
      random = () =>
        (
          Number(String(Math.random()).slice(2)) +
          Date.now() +
          Math.round(parseFloat(process.hrtime().join(".")))
        ).toString(36);

    for (let index = 0; index < idsCount; index++) {
      ids[index] = random();
    }

    res.status(200).json(ids);
  }
};
