// libraries
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white dark:bg-DarkColor px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-PrimaryColor">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-secondaryText dark:text-secondaryTextDark">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            className="rounded-md bg-PrimaryColor px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-PrimaryColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            to="/"
          >
            Regresar a home
          </Link>
          <a
            href="https://github.com/tejaby"
            className="text-sm font-semibold text-black dark:text-white"
          >
            Soporte de contacto
          </a>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
