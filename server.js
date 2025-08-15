import express from "express";
import mysql from "mysql";

// 路由(router)
const app = express();
app.listen(8181);
app.use(express.urlencoded({extended:true}));

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
app.get('/', (req, res) => {
  // render() 會把 index.ejs 轉成 HTML 回傳給瀏覽器
  res.render('articleList.ejs');
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
