import type { ComponentProps } from "react"
import Link from "next/link"

/**
 * Mapa de componentes usados para renderizar el contenido MDX.
 * Los estilos siguen el tema oscuro del sitio (fondo gris/negro, texto claro).
 * El color de acento se inyecta con la clase pasada en `accentText`.
 */
export function getMdxComponents(accentText: string) {
  return {
    h1: (props: ComponentProps<"h1">) => (
      <h1 className="mt-10 mb-4 text-3xl font-bold text-white scroll-mt-24" {...props} />
    ),
    h2: (props: ComponentProps<"h2">) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold text-white scroll-mt-24" {...props} />
    ),
    h3: (props: ComponentProps<"h3">) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-white scroll-mt-24" {...props} />
    ),
    h4: (props: ComponentProps<"h4">) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-gray-100 scroll-mt-24" {...props} />
    ),
    p: (props: ComponentProps<"p">) => (
      <p className="my-4 leading-relaxed text-gray-300" {...props} />
    ),
    ul: (props: ComponentProps<"ul">) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-gray-300 marker:text-gray-500" {...props} />
    ),
    ol: (props: ComponentProps<"ol">) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-gray-300 marker:text-gray-500" {...props} />
    ),
    li: (props: ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
    a: ({ href = "#", ...props }: ComponentProps<"a">) => (
      <Link
        href={href}
        className={`font-medium underline underline-offset-4 transition-colors hover:opacity-80 ${accentText}`}
        {...props}
      />
    ),
    strong: (props: ComponentProps<"strong">) => (
      <strong className="font-semibold text-white" {...props} />
    ),
    blockquote: (props: ComponentProps<"blockquote">) => (
      <blockquote
        className="my-6 border-l-4 border-gray-700 bg-gray-900/50 px-5 py-3 italic text-gray-300"
        {...props}
      />
    ),
    hr: () => <hr className="my-8 border-gray-800" />,
    code: (props: ComponentProps<"code">) => (
      <code
        className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-sm text-gray-200"
        {...props}
      />
    ),
    pre: (props: ComponentProps<"pre">) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg border border-gray-800 bg-gray-900 p-4 text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-gray-200"
        {...props}
      />
    ),
    table: (props: ComponentProps<"table">) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-300" {...props} />
      </div>
    ),
    th: (props: ComponentProps<"th">) => (
      <th className="border border-gray-800 bg-gray-900 px-4 py-2 font-semibold text-white" {...props} />
    ),
    td: (props: ComponentProps<"td">) => (
      <td className="border border-gray-800 px-4 py-2" {...props} />
    ),
    img: (props: ComponentProps<"img">) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="my-6 rounded-lg border border-gray-800" alt={props.alt ?? ""} {...props} />
    ),
  }
}
