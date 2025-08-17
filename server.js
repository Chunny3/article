import express from "express";
import mysql from "mysql";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 路由(router)
const app = express();
app.listen(8181);
app.use(express.urlencoded({ extended: true }));
// 靜態檔案（css, js, img 都可以放 public）
app.use(express.static(path.join(__dirname, 'public')));


// 設定 view engine 為 ejs
app.set('view engine', 'ejs');
// 設定 views 資料夾路徑
app.set('views', __dirname + '/views');

// mysql 連線
let conn = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "a12345",
  database: "furniture",
});
conn.connect((err) => {
  if (err) throw err;
  console.log("Connected DB!");
});

// 到 articleList.ejs 首頁
app.get("/", (req, res)=>{
  let sql = "SELECT * FROM article";
  conn.query(sql, (err, result)=>{
    if(err) throw err;
    // render() 會把 index.ejs 轉成 HTML 回傳給瀏覽器
    res.render('articleList', result);
  })
})

app.get('/article/add', (req, res) => {
  let sql = "SELECT id, name From article_category ";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ current_page: '/' });
    res.render('add', { rows: result });
  })
})

app.post("/article/insert", (req, res) => {
  let sql = "INSERT INTO employee VALUES(?,?,?,?,?,?)";
  let params = [req.body.empno, req.body.ename, req.body.hiredate, req.body.salary, req.body.deptno, req.body.title];
  conn.query(sql, params, (err, result) => {
    if (err) throw err;
    res.send("1 record inserted");
  });
});


// 查詢表格所有資料
app.get("/employee/getall", (req, res) => {
  let sql = "SELECT * FROM employee";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/employee/getone", (req, res) => {
  let sql = "SELECT * FROM employee WHERE empno =1001";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/employee/getone1", (req, res) => {
  let sql = "SELECT * FROM employee WHERE empno =?";
  // res.query 取得 Query string 的參數值
  let params = [req.query.empno];
  conn.query(sql, params, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/employee/getone2/:empno", (req, res) => {
  let sql = "SELECT * FROM employee WHERE empno =?";
  // res.params 取得路徑裡的 route 的參數值
  let params = [req.params.empno];
  conn.query(sql, params, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/employee/insert", (req, res) => {
  let sql = "INSERT INTO employee VALUES(?,?,?,?,?,?)";
  let params = [req.body.empno, req.body.ename, req.body.hiredate, req.body.salary, req.body.deptno, req.body.title];
  conn.query(sql, params, (err, result) => {
    if (err) throw err;
    res.send("1 record inserted");
  });
});

app.get("/employee/update", (req, res) => {
  let sql = "UPDATE employee SET salary = ? WHERE empno = ?";
  let params = [50000, '1009'];
  conn.query(sql, params, (err, result) => {
    if (err) throw err;
    res.send("1 record updated");
  });
});

app.get("/employee/delete", (req, res) => {
  let sql = "Delete FROM employee WHERE empno = ?";
  let params = ['1009'];
  conn.query(sql, params, (err, result) => {
    if (err) throw err;
    res.send("1 record deleted");
  });
});
