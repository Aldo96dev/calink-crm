import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../../components/Alerta";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Faltan campos por llenar", error: true });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no son iguales", error: true });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener mínimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});
    console.log("Campos validados");

    // CONSUMIR API (ejemplo)
    try {
      const url = "https://localhost:7065/generos";
      const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ nombre }), // manda más params si necesitas
        headers: { "Content-Type": "application/json" },
      });

      const json = await respuesta.text();
      console.log(json);
    } catch (error) {
      console.log(error);
      setAlerta({ msg: "No se pudo crear la cuenta. Intenta de nuevo.", error: true });
    }
  }

  const { msg } = alerta;

  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
      {/* Fondo decorativo sutil */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Header mini */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-500 to-amber-400 grid place-items-center text-white font-bold shadow-sm">
            C
          </div>
          <div className="text-lg font-semibold tracking-tight">
            CA<span className="text-emerald-600">Link</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Crea tu cuenta</h1>
            <span className="text-[11px] px-2 py-1 rounded-full bg-amber-400/25 text-amber-800">
              Registro
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Empieza gratis y arma tu primer pipeline en minutos.
          </p>

          <div className="mt-5">
            {msg && (
              <div className="mb-4">
                <Alerta alerta={alerta} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-slate-700">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none bg-white
                             focus:ring-2 focus:ring-emerald-600/25 focus:border-emerald-400"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-700">Email</label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none bg-white
                             focus:ring-2 focus:ring-emerald-600/25 focus:border-emerald-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-700">Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none bg-white
                             focus:ring-2 focus:ring-emerald-600/25 focus:border-emerald-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="mt-2 text-xs text-slate-500">
                  Mínimo 6 caracteres. Tip: usa mayúsculas y números.
                </p>
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-700">
                  Repetir contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none bg-white
                             focus:ring-2 focus:ring-emerald-600/25 focus:border-emerald-400"
                  value={repetirPassword}
                  onChange={(e) => setRepetirPassword(e.target.value)}
                />
              </div>

              {/* Botones */}
              <button
                type="submit"
                className="w-full rounded-xl py-2.5 text-white bg-emerald-600 hover:bg-emerald-700 transition
                           shadow-sm shadow-emerald-600/20 font-semibold"
              >
                Crear cuenta
              </button>

              <Link
                to="/iniciar-sesion"
                className="block w-full text-center rounded-xl py-2.5 bg-amber-400 text-slate-900 hover:bg-amber-500 transition
                           shadow-sm shadow-amber-500/20 font-semibold"
              >
                Ya tengo cuenta (Iniciar sesión)
              </Link>

              <p className="text-xs text-slate-500 text-center">
                Al crear una cuenta aceptas{" "}
                <a href="#" className="underline hover:text-slate-700">
                  Términos
                </a>{" "}
                y{" "}
                <a href="#" className="underline hover:text-slate-700">
                  Privacidad
                </a>
                .
              </p>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-700 transition">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
