const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  const { email, password } = req.body;

  const usuarios = router.db.get("usuarios").value();

  const user = usuarios.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const VALID_HASH =
    "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

  if (user.passwordHash !== VALID_HASH) {
    return res.status(401).json({ message: "Wrong password" });
  }

  res.json({
    user,
    token: "fake-jwt-token-" + user.idUsuario,
  });
});

server.use(router);

server.listen(3001, () => {
  console.log("🚀 JSON Server running on http://localhost:3001");
});
