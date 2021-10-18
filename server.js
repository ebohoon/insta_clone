const http = require('./app');
const port = 3000;

http.listen(port, () => {
  console.log(`${port} 번 포트 접속 되었습니다.`);
});
