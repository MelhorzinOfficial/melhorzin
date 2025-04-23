import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Uma lista de todos os locales que são suportados
  locales: ["en", "pt-br", "es", "fr", "de"],

  // Usado quando nenhum locale corresponde
  defaultLocale: "en",

  // Configuração para detecção automática de locale
  localeDetection: true,
});

export const config = {
  // Intercepta apenas requisições relacionadas a páginas, não a recursos estáticos
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
