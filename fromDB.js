import express from "express";
import mysql from "mysql";

// 路由(router)
const app = express();
app.listen(8181);
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let conn = mysql.createConnection({
  host: "localhost",
  user: "nodejs",
  password: "a1234",
  database: "nodedb",
});

app.get("/employee/getall", (req, res) => {
  let sql = "SELECT * FROM employee";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    result = JSON.parse(JSON.stringify(result));
    res.render("queryall", { emps: result });
  });
});

app.get("/employee/getone/:empno", (req, res) => {
  let sql = "SELECT * FROM employee WHERE empno = ?";
  let params = [req.query.empno];
  conn.query(sql, params, (err, result) => {
    if (err) throw err;
    result = JSON.parse(JSON.stringify(result));
    res.render("queryone", { emps: result });
  });
});
app.get("/employee/getone1/:empno", (req, res) => {
  let sql = "SELECT * FROM employee WHERE empno = ?";
  let params = [req.params.empno];
  conn.query(sql, params, (err, result) => {
    if (err) throw err;
    result = JSON.parse(JSON.stringify(result));
    res.render("queryone", { emps: result });
  });
});

// app.post("/employee/insert", (req, res) => {
//   let sql = "INSERT INTO employee VALUES(?,?,?,?,?,?)";
//   let params = [req.body.empno, req.body.ename, req.body.hiredate, req.body.salary, req.body.deptno, req.body.title];
//   conn.query(sql, params, (err, result) => {
//     if (err) throw err;
//     res.send("1 record inserted");
//   });
// });

app.post("/employee/insert", (req, res) => {
  const empno = req.body.empno;
  let checkSql = "SELECT COUNT(*) AS count FROM employee WHERE empno = ?";
  conn.query(checkSql, [empno], (err, results) => {
    if (err) throw err;

    if (results[0].count > 0) {
      res.send(`<script>alert('員工編號已重複使用，請再重新輸入'); history.back();</script>`);
      return;
    } else {
      let sql = "INSERT INTO employee VALUES(?,?,?,?,?,?)";
      let params = [
        req.body.empno,
        req.body.ename,
        req.body.hiredate,
        req.body.salary,
        req.body.deptno,
        req.body.title,
      ];
      conn.query(sql, params, (err, result) => {
        if (err) throw err;
         const selectSql = "SELECT * FROM employee WHERE empno = ?";
        conn.query(selectSql, [req.body.empno], (err2, rows) => {
          if (err2) throw err2;
            res.render("insert", { emp: rows[0] });
          
        });
      });
    }  
  });
});

app.get("/employee/delete", (req, res) => {
  let sql = "Delete FROM employee WHERE empno = ?";
  let params = [req.query.empno];
  conn.query(sql, params, (err, result) => {
    if (err) throw err;
      res.send(`<script>alert('刪除成功');  window.location.href = 'http://localhost:8181/employee/getall';</script>`);
  });
});
