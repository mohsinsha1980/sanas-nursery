const isHuman = async (req, res, next) => {
  try {
    const { token } = req.body || req.params || req.query;

    const isHuman = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    if (!token || !isHuman) {
      return next({
        status: 400,
        message: "Not a human",
      });
    }

    return next();
  } catch (err) {
    return next({
      status: 500,
      message: `${err.message}`,
    });
  }
};

export default { isHuman };
