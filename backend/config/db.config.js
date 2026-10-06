import mysql from "mysql2/promise";

const config = {
  host: process.env.DB_HOST || "127.0.0.1 " || localhost,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 8889,
};

// create connection pool 
const pool = mysql.createPool(config);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("created connection");
    connection.release();
  } catch (err) {
    console.log("failed to create connection", err);
  }
})();

const ensureParam = (params) => {
  // if (params === undefined || params === null) {
  //   throw new Error("SQL parameter are required");
  // }
  // const isArray = Array.isArray(params);
  // const isObject = !isArray && typeof params ==="object";

  // if (!isArray && !isObject) {
  //   throw new Error("SQL parameters must be an array or object");
  // }
};

// prepare a function that excute a query asynchronously
async function query(sql, params) {
  if (sql.trim().length === 0 || typeof sql !== "string") {
    throw new Error("sql query must be non empty string");
  }
  ensureParam(params);

  const [rows] = await pool.execute(sql, params);
  return rows;
}

export default query;
