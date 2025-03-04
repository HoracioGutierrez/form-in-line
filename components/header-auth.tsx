import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { LogOut, History } from "lucide-react";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hola, {user.email}!
      <Link href="/history">
        <Button variant="ghost" className="flex items-center gap-2" size="sm">
          <History className="size-4"/>
          Historial
        </Button>
      </Link>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"} className="flex items-center gap-2" >
          <LogOut className="size-4"/>
          Salir
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Ingresar</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Registrarse</Link>
      </Button>
    </div>
  );
}
