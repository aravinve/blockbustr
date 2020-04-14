const mylogger = (req, res, next) => {
  if (req.method === 'GET' && req.originalUrl.length > 0) {
    let url = decodeURIComponent(req.originalUrl);
    let urlarray = url.split('?');
    let paramarray = urlarray[1].split('&');
    let isVulnerable = false;
    if (paramarray.length > 1) {
      isVulnerable = paramarray.reduce((a, b) => {
        const paramOne = a.split('=');
        const paramTwo = b.split('=');
        if (paramOne[0] === paramTwo[0]) {
          return true;
        } else {
          return b;
        }
      });
    }
    if (isVulnerable === true) {
      res.json({ success: false });
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = mylogger;
