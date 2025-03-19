import { Drawer as ShadCNDrawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { getI18n } from "@/locales/server"
import { getTranslations } from "next-intl/server"

async function Drawer({ links }: { links: any }) {

    //const t = await getI18n()
    const t = await getTranslations("layout")


    return (
        <ShadCNDrawer>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center">{t("drawer.menu")}</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-2">
                    {links.map((link: any) => {
                        return (
                            <Button asChild variant="link" key={link.id} className="text-sm p-0">
                                <Link href={link.href}>{t(`links.${link.text}` as any, {})}</Link>
                            </Button>
                        )
                    })}
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline" className="w-fit flex gap-2 items-center mx-auto">
                            <X /> {t("drawer.close")}
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </ShadCNDrawer>

    )
}

export default Drawer