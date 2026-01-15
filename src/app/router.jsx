// src/routes/Router.jsx
// Router público + Navbar + Landing + páginas stub + Auth routes
// Tema: Verde + Amarillo (Zoho-ish) + Teal de apoyo
// Incluye "imagen" del pipeline con SVG inline (sin assets externos)

import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
// Ajusta estas rutas a tu estructura real
import Login from "../pages/cuenta/IniciarSesion.jsx";
import CrearCuenta from "../pages/cuenta/CrearCuenta.jsx";

// -----------------------------
// Theme (clases Tailwind reutilizables)
// -----------------------------
const UI = {
  shell: "min-h-screen bg-slate-50 text-slate-900",

  header:
    "sticky top-0 z-40 bg-white/75 backdrop-blur border-b border-slate-200",

  navLink:
    "px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition",

  btnOutline:
    "px-4 py-2 text-sm rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition",

  // Primary: Verde
  btnPrimary:
    "px-4 py-2 text-sm rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 transition",

  btnPrimaryLg:
    "px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 transition",

  // Accent: Amarillo
  pillAccent:
    "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/25 text-amber-800 text-xs font-medium",

  pillPrimary:
    "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-700 text-xs font-medium",

  input:
    "w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-600/25 focus:border-emerald-400 bg-white",

  card: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",

  cardHover:
    "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition",

  sectionAlt: "py-20 bg-white",
  sectionSoft: "py-20 bg-slate-100/60",

  h2: "text-2xl md:text-3xl font-semibold tracking-tight",
};

// -----------------------------
// Navbar con menú superior
// -----------------------------
function Navbar({ onOpenSignup }) {
  const [openMobile, setOpenMobile] = useState(false);
  const [openProductos, setOpenProductos] = useState(false);
  const prodRef = useRef(null);
  const location = useLocation();

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setOpenMobile(false);
    setOpenProductos(false);
  }, [location.pathname, location.hash]);

  // Cerrar dropdown si se hace click fuera
  useEffect(() => {
    function onClickOutside(e) {
      if (prodRef.current && !prodRef.current.contains(e.target)) {
        setOpenProductos(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <header className={UI.header}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            {/* Logo verde->amarillo */}
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-500 to-amber-400 grid place-items-center text-white font-bold shadow-sm">
              C
            </div>
            <span className="text-lg font-semibold tracking-tight">
              CA<span className="text-emerald-600">Link</span>
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Dropdown Productos */}
          <div className="relative" ref={prodRef}>
            <button
              onClick={() => setOpenProductos((v) => !v)}
              className={`${UI.navLink} inline-flex items-center gap-1`}
              aria-haspopup="menu"
              aria-expanded={openProductos}
            >
              Productos
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-4 w-4 transition-transform ${
                  openProductos ? "rotate-180" : ""
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {openProductos && (
              <div
                role="menu"
                className="absolute mt-2 w-72 rounded-2xl border border-slate-200 bg-white shadow-xl p-2"
              >
                <Link
                  to="/productos"
                  className="block rounded-xl px-3 py-2 text-sm hover:bg-slate-50 transition"
                >
                  <div className="font-medium text-slate-900">Suite CALink</div>
                  <div className="text-xs text-slate-500">
                    CRM base, pipeline, actividades
                  </div>
                </Link>
                <a
                  href="#automatizacion"
                  className="block rounded-xl px-3 py-2 text-sm hover:bg-slate-50 transition"
                >
                  <div className="font-medium text-slate-900">Automatización</div>
                  <div className="text-xs text-slate-500">
                    Reglas, plantillas, webhooks
                  </div>
                </a>
                <a
                  href="#integraciones"
                  className="block rounded-xl px-3 py-2 text-sm hover:bg-slate-50 transition"
                >
                  <div className="font-medium text-slate-900">Integraciones</div>
                  <div className="text-xs text-slate-500">
                    Email, WhatsApp, APIs
                  </div>
                </a>
              </div>
            )}
          </div>

          <Link to="/precios" className={UI.navLink}>
            Precios
          </Link>
          <a href="#por-que" className={UI.navLink}>
            ¿Por qué CALink?
          </a>
          <a href="#acerca" className={UI.navLink}>
            Acerca de
          </a>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/iniciar-sesion" className={UI.btnOutline}>
            Iniciar sesión
          </Link>
          <button onClick={onOpenSignup} className={UI.btnPrimary}>
            Pruébalo gratis
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpenMobile((v) => !v)}
          className="md:hidden p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
        >
          <span className="sr-only">Abrir menú</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6 text-slate-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {openMobile && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between px-2 py-2 rounded-xl hover:bg-slate-50 text-sm text-slate-700 transition">
                <span>Productos</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 transition-transform group-open:rotate-180"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <div className="pl-2 pt-1 pb-2 space-y-1">
                <Link
                  to="/productos"
                  className="block px-2 py-2 rounded-xl text-sm hover:bg-slate-50 transition"
                >
                  Suite CALink
                </Link>
                <a
                  href="#automatizacion"
                  className="block px-2 py-2 rounded-xl text-sm hover:bg-slate-50 transition"
                >
                  Automatización
                </a>
                <a
                  href="#integraciones"
                  className="block px-2 py-2 rounded-xl text-sm hover:bg-slate-50 transition"
                >
                  Integraciones
                </a>
              </div>
            </details>

            <Link
              to="/precios"
              className="block px-2 py-2 rounded-xl text-sm hover:bg-slate-50 transition"
            >
              Precios
            </Link>
            <a
              href="#por-que"
              className="block px-2 py-2 rounded-xl text-sm hover:bg-slate-50 transition"
            >
              ¿Por qué CALink?
            </a>
            <a
              href="#acerca"
              className="block px-2 py-2 rounded-xl text-sm hover:bg-slate-50 transition"
            >
              Acerca de
            </a>

            <div className="pt-2 flex gap-2">
              <Link
                to="/iniciar-sesion"
                className="flex-1 text-center px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                Iniciar sesión
              </Link>
              <button
                onClick={onOpenSignup}
                className="flex-1 text-center px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm shadow-emerald-600/20"
              >
                Pruébalo gratis
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// -----------------------------
// Modal + SignupForm reutilizable
// -----------------------------
function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
            <h3 className="font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 transition"
              aria-label="Cerrar"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-slate-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SignupFormInline() {
  return (
    <form className="space-y-5">
      <div>
        <label className="block text-sm mb-1 text-slate-700">Nombre</label>
        <input className={UI.input} />
      </div>
      <div>
        <label className="block text-sm mb-1 text-slate-700">Correo</label>
        <input type="email" className={UI.input} />
      </div>
      <div>
        <label className="block text-sm mb-1 text-slate-700">Contraseña</label>
        <input type="password" className={UI.input} />
      </div>
      <button
        type="submit"
        className="w-full bg-emerald-600 text-white rounded-xl py-2.5 hover:bg-emerald-700 transition shadow-sm shadow-emerald-600/20"
      >
        Crear cuenta
      </button>
      <p className="text-xs text-slate-500 text-center">
        Al crear una cuenta aceptas Términos y Privacidad.
      </p>
    </form>
  );
}

// -----------------------------
// Layout público
// -----------------------------
function PublicLayout({ children }) {
  const [openSignup, setOpenSignup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setOpenSignup(params.get("signup") === "open");
  }, [location.search]);

  const handleOpenSignup = () => setOpenSignup(true);
  const handleCloseSignup = () => setOpenSignup(false);

  return (
    <div className={UI.shell}>
      <Navbar onOpenSignup={handleOpenSignup} />
      <main>{children}</main>

      <footer className="border-t border-slate-200 mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} CALink — Todos los derechos reservados Aldo Cortes</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700 transition">
              Términos
            </a>
            <a href="#" className="hover:text-slate-700 transition">
              Privacidad
            </a>
            <Link to="/iniciar-sesion" className="hover:text-slate-700 transition">
              Entrar
            </Link>
          </div>
        </div>
      </footer>

      {/* Modal Signup */}
      <Modal open={openSignup} onClose={handleCloseSignup} title="Empieza gratis">
        <SignupFormInline />
        <div className="mt-4 text-center">
          <Link
            to="/crearCuenta"
            className="text-sm text-emerald-700 hover:text-emerald-800 underline"
          >
            Prefiero ir a la página de registro
          </Link>
        </div>
      </Modal>
    </div>
  );
}

// -----------------------------
// Landing (Home) con secciones
// -----------------------------
function Home() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={UI.pillPrimary}>Nuevo • CRM simple para ventas</span>
            </div>

            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              Tu CRM simple, potente y listo para vender
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Centraliza oportunidades, automatiza seguimientos y conecta tus canales.
              De 0 a cliente feliz en minutos.
            </p>

            <div className="mt-6 flex gap-3">
              <Link to="/crearCuenta" className={UI.btnPrimaryLg}>
                Pruébalo gratis
              </Link>
              <Link
                to="/precios"
                className="px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                Ver precios
              </Link>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Sin tarjeta. Configuración en 2 minutos.
            </p>
          </div>

          {/* Vista previa tipo CRM (con SVG inline “imagen”) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-slate-700">Pipeline</span>
                  <span className="text-[11px] text-slate-500">Q1 • Equipo Ventas</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-600/10 text-emerald-700">
                    + Nuevo deal
                  </span>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-amber-400/25 text-amber-800">
                    12 activos
                  </span>
                </div>
              </div>

              <div className="aspect-video rounded-xl bg-white border border-slate-200 overflow-hidden">
                <svg viewBox="0 0 1200 675" className="w-full h-full">
                  {/* Top bar */}
                  <rect x="0" y="0" width="1200" height="62" fill="#ffffff" />
                  <rect x="18" y="18" width="190" height="26" rx="13" fill="#ECFDF5" />
                  <circle cx="38" cy="31" r="6" fill="#10B981" />
                  <rect x="58" y="25" width="120" height="12" rx="6" fill="#0F172A" opacity="0.18" />
                  <rect x="950" y="18" width="232" height="26" rx="13" fill="#FEF3C7" />
                  <rect x="970" y="25" width="180" height="12" rx="6" fill="#0F172A" opacity="0.18" />

                  {/* Background */}
                  <rect x="0" y="62" width="1200" height="613" fill="#F8FAFC" />

                  {/* Columns */}
                  {[
                    { x: 20, badge: "#10B981" },   // emerald
                    { x: 315, badge: "#14B8A6" },  // teal
                    { x: 610, badge: "#F59E0B" },  // amber
                    { x: 905, badge: "#22C55E" },  // green
                  ].map((c, i) => (
                    <g key={i}>
                      <rect x={c.x} y="88" width="275" height="560" rx="16" fill="#FFFFFF" stroke="#E2E8F0" />
                      <rect x={c.x + 18} y="110" width="140" height="16" rx="8" fill="#0F172A" opacity="0.14" />
                      <circle cx={c.x + 235} cy="118" r="7" fill={c.badge} opacity="0.95" />
                      <rect x={c.x + 248} y="111" width="18" height="14" rx="7" fill="#0F172A" opacity="0.10" />
                    </g>
                  ))}

                  {/* Cards */}
                  {/* Leads */}
                  <rect x="45" y="150" width="225" height="92" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
                  <rect x="60" y="168" width="130" height="12" rx="6" fill="#0F172A" opacity="0.18" />
                  <rect x="60" y="190" width="185" height="10" rx="5" fill="#0F172A" opacity="0.10" />
                  <rect x="60" y="212" width="92" height="18" rx="9" fill="#ECFDF5" />
                  <rect x="158" y="212" width="72" height="18" rx="9" fill="#FEF3C7" />

                  <rect x="45" y="260" width="225" height="92" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
                  <rect x="60" y="278" width="150" height="12" rx="6" fill="#0F172A" opacity="0.18" />
                  <rect x="60" y="300" width="175" height="10" rx="5" fill="#0F172A" opacity="0.10" />
                  <rect x="60" y="322" width="110" height="18" rx="9" fill="#ECFDF5" />
                  <rect x="176" y="322" width="60" height="18" rx="9" fill="#E0F2FE" />

                  {/* Contactado */}
                  <rect x="340" y="150" width="225" height="92" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
                  <rect x="355" y="168" width="140" height="12" rx="6" fill="#0F172A" opacity="0.18" />
                  <rect x="355" y="190" width="185" height="10" rx="5" fill="#0F172A" opacity="0.10" />
                  <rect x="355" y="212" width="95" height="18" rx="9" fill="#CCFBF1" />
                  <rect x="456" y="212" width="72" height="18" rx="9" fill="#FEF3C7" />

                  <rect x="340" y="260" width="225" height="92" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
                  <rect x="355" y="278" width="120" height="12" rx="6" fill="#0F172A" opacity="0.18" />
                  <rect x="355" y="300" width="175" height="10" rx="5" fill="#0F172A" opacity="0.10" />
                  <rect x="355" y="322" width="110" height="18" rx="9" fill="#CCFBF1" />
                  <rect x="471" y="322" width="55" height="18" rx="9" fill="#E0F2FE" />

                  {/* Propuesta */}
                  <rect x="635" y="150" width="225" height="92" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
                  <rect x="650" y="168" width="145" height="12" rx="6" fill="#0F172A" opacity="0.18" />
                  <rect x="650" y="190" width="185" height="10" rx="5" fill="#0F172A" opacity="0.10" />
                  <rect x="650" y="212" width="90" height="18" rx="9" fill="#FEF3C7" />
                  <rect x="746" y="212" width="78" height="18" rx="9" fill="#ECFDF5" />

                  <rect x="635" y="260" width="225" height="92" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
                  <rect x="650" y="278" width="120" height="12" rx="6" fill="#0F172A" opacity="0.18" />
                  <rect x="650" y="300" width="175" height="10" rx="5" fill="#0F172A" opacity="0.10" />
                  <rect x="650" y="322" width="125" height="18" rx="9" fill="#FEF3C7" />
                  <rect x="781" y="322" width="55" height="18" rx="9" fill="#E0F2FE" />

                  {/* Cierre */}
                  <rect x="930" y="150" width="225" height="92" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
                  <rect x="945" y="168" width="135" height="12" rx="6" fill="#0F172A" opacity="0.18" />
                  <rect x="945" y="190" width="185" height="10" rx="5" fill="#0F172A" opacity="0.10" />
                  <rect x="945" y="212" width="105" height="18" rx="9" fill="#ECFDF5" />
                  <rect x="1056" y="212" width="70" height="18" rx="9" fill="#DCFCE7" />

                  <text x="1015" y="650" fontSize="14" fill="#0F172A" opacity="0.25">
                    CALink CRM • Demo
                  </text>
                </svg>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { t: "Leads", c: "bg-emerald-600" },
                  { t: "Deals", c: "bg-amber-400" },
                  { t: "Actividades", c: "bg-teal-500" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"
                  >
                    <span className={`inline-block h-2 w-2 rounded-full ${x.c} mr-2`} />
                    {x.t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className={UI.sectionSoft}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={UI.h2}>Todo lo que necesitas para cerrar más</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { title: "Pipeline visual", desc: "Arrastra y suelta etapas, perdidos/ganados y probabilidad.", badge: "bg-emerald-600/10 text-emerald-700" },
              { title: "Actividades y recordatorios", desc: "Llamadas, emails y tareas con SLA y alertas.", badge: "bg-amber-400/25 text-amber-800" },
              { title: "Contactos y cuentas", desc: "360° del cliente: notas, archivos y conversaciones.", badge: "bg-teal-500/10 text-teal-700" },
            ].map((f, i) => (
              <div key={i} className={UI.cardHover}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{f.title}</h3>
                  <span className={`text-[11px] px-2 py-1 rounded-full ${f.badge}`}>
                    CALink
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automatización */}
      <section id="automatizacion" className={UI.sectionAlt}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={UI.h2}>Automatización sin complicaciones</h2>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Plantillas, reglas y webhooks para que el CRM trabaje por ti.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { t: "Plantillas", d: "Emails y WhatsApp listos para usar.", k: "bg-amber-400/25 text-amber-800" },
              { t: "Reglas", d: "Si pasa X, entonces crea tarea Y.", k: "bg-emerald-600/10 text-emerald-700" },
              { t: "Webhooks", d: "Conecta con tu backend sin fricción.", k: "bg-teal-500/10 text-teal-700" },
            ].map((x) => (
              <div key={x.t} className={UI.card}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">{x.t}</div>
                  <span className={`text-[11px] px-2 py-1 rounded-full ${x.k}`}>Auto</span>
                </div>
                <div className="mt-2 text-sm text-slate-600">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integraciones */}
      <section id="integraciones" className={UI.sectionSoft}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={UI.h2}>Conecta tus canales</h2>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Email, WhatsApp, APIs. Lleva las conversaciones al mismo lugar.
          </p>
        </div>
      </section>

      {/* Por qué */}
      <section id="por-que" className={UI.sectionAlt}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={UI.h2}>¿Por qué CALink?</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { title: "Rápido de adoptar", desc: "Onboarding en minutos, cero fricción." },
              { title: "Hecho para equipos reales", desc: "Funciona bien con pocas personas y escala sin dolor." },
              { title: "Precio honesto", desc: "Empieza gratis y paga solo por lo que usas." },
            ].map((f, i) => (
              <div key={i} className={UI.cardHover}>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acerca de */}
      <section id="acerca" className={UI.sectionSoft}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={UI.h2}>Acerca de</h2>
          <p className="mt-3 text-slate-600 max-w-3xl">
            CALink nace para equipos que necesitan resultados sin complicarse.
            Priorizamos experiencia, velocidad y claridad por encima del ruido.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Empieza gratis hoy
            </h3>
            <p className="mt-2 text-slate-600">
              Crea tu cuenta y ten tu primer pipeline en minutos.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                to="/crearCuenta"
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm shadow-emerald-600/20"
              >
                Crear cuenta
              </Link>
              <Link
                to="/precios"
                className="px-6 py-3 rounded-xl bg-amber-400 text-slate-900 hover:bg-amber-500 transition shadow-sm shadow-amber-500/20"
              >
                Ver planes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

// -----------------------------
// Páginas simples
// -----------------------------
function Precios() {
  return (
    <PublicLayout>
      <section className="pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Precios</h1>
          <p className="mt-2 text-slate-600">Empieza gratis. Planes que crecen contigo.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { name: "Gratis", price: "$0", features: ["1 usuario", "Pipeline básico", "Contactos ilimitados"], featured: false },
              { name: "Pro", price: "$14/usuario", features: ["Automatización", "Integraciones", "Reportes"], featured: true },
              { name: "Business", price: "$29/usuario", features: ["Roles/Permisos", "SLA & auditoría", "Soporte prioritario"], featured: false },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-6 bg-white shadow-sm ${
                  p.featured ? "border-emerald-200 ring-2 ring-emerald-600/10" : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">{p.name}</div>
                  {p.featured && (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-amber-400/25 text-amber-800">
                      Recomendado
                    </span>
                  )}
                </div>

                <div className="mt-1 text-3xl font-semibold">{p.price}</div>

                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/crearCuenta"
                  className={`mt-6 inline-block w-full text-center px-4 py-2 rounded-xl text-white transition ${
                    p.featured ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  Empieza
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Productos() {
  return (
    <PublicLayout>
      <section className="pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="mt-2 text-slate-600">
            Suite CALink: CRM, automatizaciones e integraciones.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

function PorQue() {
  return (
    <PublicLayout>
      <section className="pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">¿Por qué CALink?</h1>
          <p className="mt-2 text-slate-600">Simple, rápido y con precio honesto.</p>
        </div>
      </section>
    </PublicLayout>
  );
}

function Acerca() {
  return (
    <PublicLayout>
      <section className="pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Acerca de</h1>
          <p className="mt-2 text-slate-600">Construido por gente que vende todos los días.</p>
        </div>
      </section>
    </PublicLayout>
  );
}

// -----------------------------
// Router principal
// -----------------------------
export default function AppRouter() {
  return (
    <Routes>
      {/* Landing pública */}
      <Route path="/" element={<Home />} />

      {/* Páginas públicas */}
      <Route path="/productos" element={<Productos />} />
      <Route path="/precios" element={<Precios />} />
      <Route path="/por-que" element={<PorQue />} />
      <Route path="/acerca" element={<Acerca />} />

      {/* Auth */}
      <Route path="/iniciar-sesion" element={<Login />} />
      <Route path="/crearCuenta" element={<CrearCuenta />} />

      {/* Legacy/compat */}
      <Route path="/login" element={<Navigate to="/iniciar-sesion" replace />} />

      {/* 404 básico */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
