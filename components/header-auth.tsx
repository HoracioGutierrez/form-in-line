import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { LogOut, History, List, User, Settings, Menu, X } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div>
      <Drawer>
        <DrawerTrigger className="cursor-pointer lg:hidden">
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerFooter>
            <div className="flex flex-col gap-2">
              <Link href="/spaces">
                <Button variant="ghost" className="flex items-center gap-2 cursor-pointer" size="sm">
                  <List className="size-4" />
                  Espacios
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="ghost" className="flex items-center gap-2 cursor-pointer" size="sm">
                  <History className="size-4" />
                  Historial
                </Button>
              </Link>
              <Link href="/dashboard" >
                <Button variant="ghost" className="flex items-center gap-2 cursor-pointer" size="sm">
                  <Settings className="size-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/account" >
                <Button variant="ghost" className="flex items-center gap-2 cursor-pointer" size="sm">
                  <User className="size-4" />
                  Cuenta
                </Button>
              </Link>
              <form action={signOutAction}>
                <Button type="submit" variant={"outline"} className="flex items-center gap-2" >
                  <LogOut className="size-4" />
                  Salir
                </Button>
              </form>
            </div>
            <DrawerClose asChild>
              <Button variant="outline" className="flex gap-2"><X />Cerrar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="items-center gap-2 hidden lg:flex">
        <Link href="/spaces">
          <Button variant="ghost" className="flex items-center gap-2 cursor-pointer" size="sm">
            <List className="size-4" />
            Espacios
          </Button>
        </Link>
        <Link href="/history">
          <Button variant="ghost" className="flex items-center gap-2 cursor-pointer" size="sm">
            <History className="size-4" />
            Historial
          </Button>
        </Link>
        <Link href="/dashboard" >
          <Button variant="ghost" className="flex items-center gap-2 cursor-pointer" size="sm">
            <Settings className="size-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/account" >
          <Button variant="ghost" className="flex items-center gap-2 cursor-pointer" size="sm">
            <User className="size-4" />
            Cuenta
          </Button>
        </Link>
        <form action={signOutAction}>
          <Button type="submit" variant={"outline"} className="flex items-center gap-2" >
            <LogOut className="size-4" />
            Salir
          </Button>
        </form>
      </div>
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
