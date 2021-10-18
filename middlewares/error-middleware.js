errorHandler = (err, req, res, next) => {
  res.locals.message = err.message; //error템플릿에 전달할 데이터 설정
  //NODE_ENV 배포환경 시 개발환경에서의 어디에서 에러가 발생했느지 안뜨게 하기 위해 설정한것
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500).send(err.message); //send error
};
routerError = (req, res, next) => {
  const error = new Error(
    `${req.method} ${req.originalUrl} 라우터 에러입니다.`
  );
  error.status = 404;
  next(error);
};

module.exports = {
  errorHandler,
  routerError,
};
