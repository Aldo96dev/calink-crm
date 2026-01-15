import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider.jsx";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loc = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      const to = loc.state?.from?.pathname || "/";
      navigate(to, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-2xl font-bold tracking-tight">Iniciar sesión</h1>
            <span className="text-[11px] px-2 py-1 rounded-full bg-amber-400/25 text-amber-800">
              Acceso
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Entra para ver tu pipeline, actividades y contactos.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm mb-1 text-slate-700">Correo</label>
              <input
                type="email"
                className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none bg-white
                           focus:ring-2 focus:ring-emerald-600/25 focus:border-emerald-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("Debes ingresar un correo válido")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                placeholder="tu@correo.com"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm mb-1 text-slate-700">
                  Contraseña
                </label>
                <button
                  type="button"
                  className="text-xs text-slate-500 hover:text-slate-700 transition"
                  onClick={() => alert("TODO: flujo de recuperación")}
                >
                  ¿Olvidaste?
                </button>
              </div>

              <input
                type="password"
                className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none bg-white
                           focus:ring-2 focus:ring-emerald-600/25 focus:border-emerald-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Debes ingresar una contraseña válida"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-2.5 text-white bg-emerald-600 hover:bg-emerald-700 transition
                         shadow-sm shadow-emerald-600/20 disabled:opacity-60 disabled:hover:bg-emerald-600"
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>

            <div className="relative py-2">
              <div className="h-px bg-slate-200" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-1.5 bg-white px-2 text-xs text-slate-500">
                o
              </span>
            </div>

            {/* CTA amarillo opcional */}
            <Link
              to="/crearCuenta"
              className="block w-full text-center rounded-xl py-2.5 bg-amber-400 text-slate-900 hover:bg-amber-500 transition
                         shadow-sm shadow-amber-500/20"
            >
              Crear cuenta
            </Link>

            <p className="text-xs text-slate-500 text-center">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/crearCuenta"
                className="text-emerald-700 hover:text-emerald-800 underline"
              >
                Regístrate
              </Link>
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Al entrar aceptas Términos y Privacidad.
        </p>
      </div>

      <div className="mb-4 flex justify-start">
  <Link
    to="/"
    className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition"
  >
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path
        fillRule="evenodd"
        d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L4.414 8H18a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
    Volver al inicio
  </Link>
</div>

    </div>
  );
}
