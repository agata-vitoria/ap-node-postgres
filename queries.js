const Pool = require("pg").Pool;

const pool = new Pool({
  //conexão com o banco
  user: "",
  host: "",
  database: "",
  password: "",
  port: ""
});

const getUsers = (req, res) => {
  pool.query("SELECT * FROM usuario ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM usuario WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { nome, email } = req.body;

  pool.query(
    "INSERT INTO usuario (nome, email) VALUES ($1, $2)",
    [nome, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send("Usuário adicionado com sucesso!");
    }
  );
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;

  pool.query(
    "UPDATE usuario SET nome = $1, email = $2 WHERE id = $3",
    [nome, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Usuário atualizado com sucesso!");
    }
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM usuario WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send("Usuário deletado com sucesso!");
  });
};

module.exports = { getUsers, getUsersById, createUser, updateUser, deleteUser };
