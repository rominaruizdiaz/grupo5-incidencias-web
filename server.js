import jsonServer from "json-server";
import auth from "json-server-auth";

const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.db = router.db;

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

server.post("/register", (req, res, next) => {
  const { nombre } = req.body;

  req.body = {
    ...req.body,
    nombre,
    rol: 2,
    modoOscuro: false,
    fotoPerfil: null,
    fechaRegistro: new Date().toISOString(),
    departamentos: [],
  };

  next();
});

const rules = auth.rewriter({
  users: 600,
  incidencias: 660,
  departamentos: 644,
});

server.use(rules);
server.use(auth);
server.use(router);

server.listen(3001, () => {
  console.log("Auth server running on http://localhost:3001");
});
