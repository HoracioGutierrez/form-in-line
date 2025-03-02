import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="sr-only">Form in line : Aplicación web para esperar mientras otros preguntan</h1>
      <p className="text-3xl lg:text-4xl leading-tight! mx-auto max-w-xl text-center">
        Solo ponte <span className="font-bold animate-pulse">en la fila</span> y comienza a <span className="font-bold animate-pulse">esperar</span> mientras otros preguntan.
      </p>
      <p className="text-md lg:text-lg leading-tight! mx-auto max-w-xl text-center text-muted-foreground/50">
        La forma más fácil de organizar personas.
      </p>
      <div className="w-full p-[1px] bg-linear-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
