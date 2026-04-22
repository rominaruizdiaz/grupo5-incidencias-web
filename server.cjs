const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// LOGIN
server.post("/login", (req, res) => {
  const { email } = req.body;

  const usuarios = router.db.get("usuarios").value();

  const user = usuarios.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  res.json({
    user,
    token: "fake-jwt-token-" + user.id,
  });
});

// REGISTER
server.post("/register", (req, res) => {
  const { nombre, email, password } = req.body;

  const usuarios = router.db.get("usuarios");

  const exists = usuarios.find({ email }).value();

  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    nombre,
    email,
    passwordHash: "fake",
    rol: 2,
    modoOscuro: false,
    fechaRegistro: new Date().toISOString(),
  };

  usuarios.push(newUser).write();

  res.json({
    user: newUser,
    token: "fake-jwt-token-" + newUser.id,
  });
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server running on http://localhost:3001");
});
