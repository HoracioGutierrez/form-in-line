import AccountModal from "@/components/dashboard/account-modal"
import { getI18n, getStaticParams } from "@/locales/server"
import { createClient } from "@/supabase/server"
import Image from "next/image"
import { redirect } from "next/navigation"
import SpaceForm from "@/components/spaces/SpaceForm"
import { getUserByEmail } from "@/actions/getUserByEmail"
import { getSpacesByUser } from "@/actions/getSpacesByUser"
import SpaceItem from "@/components/spaces/SpaceItem"
import { setStaticParamsLocale } from "next-international/server"
import { getTranslations } from "next-intl/server"

/* export function generateStaticParams() {
    return getStaticParams()
}
 */
async function DashboardPage(/* { params }: { params: Promise<{ locale: string }> } */) {
    /* const { locale } = await params
    setStaticParamsLocale(locale) */
    const supabase = await createClient()
    const { data: authUser, error: authError } = await supabase.auth.getUser()
    const { data: loggedUser, hasError } = await getUserByEmail(authUser.user?.email || "")
    /* const t = await getI18n() */
    const t = await getTranslations("dashboard")

    if (authError || hasError || !loggedUser) {
        return redirect("/login")
    }

    const { data: spaces } = await getSpacesByUser(loggedUser?.id)

    return (
        <section className="grow flex flex-col">
            <h2 className="font-bold text-2xl mb-10">{t("title")}</h2>
            <div className="flex flex-col gap-8">
                <div className="border p-2 md:p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-xl">{t("sections.account.title")}</h3>
                    </div>
                    <div className="flex items-center gap-4 ">
                        {authUser.user.user_metadata.avatar_url && (
                            <Image
                                src={authUser.user.user_metadata.avatar_url}
                                alt="avatar"
                                width={75}
                                height={75}
                                className="rounded-full"
                            />
                        )}
                        {!authUser.user.user_metadata.avatar_url && (
                            <img
                                src="https://api.dicebear.com/9.x/identicon/svg"
                                alt="avatar"
                                className="rounded-full"
                                width={75}
                                height={75}
                            />
                        )}
                        <div>
                            <h3 className="font-bold text-xl">{
                                authUser.user.user_metadata.first_name && authUser.user.user_metadata.last_name ?
                                    authUser.user.user_metadata.first_name + " " + authUser.user.user_metadata.last_name :
                                    t("no_name")
                            } </h3>
                            <p className="text-muted-foreground">{authUser.user.email}</p>
                        </div>
                    </div>
                </div>
                <div className="border p-2 md:p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-xl">{t("sections.personal_info.title")}</h3>
                        <AccountModal user={authUser.user || {}} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground/30 dark:text-muted">
                                {t("sections.personal_info.first_name")}
                            </label>
                            <p className="text-muted-foreground">{authUser.user.user_metadata.first_name || t("not_set")}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground/30 dark:text-muted">
                                {t("sections.personal_info.last_name")}
                            </label>
                            <p className="text-muted-foreground">{authUser.user.user_metadata.last_name || t("not_set")}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground/30 dark:text-muted">
                                {t("sections.personal_info.email")}
                            </label>
                            <p className="text-muted-foreground">{authUser.user.email || t("not_set")}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground/30 dark:text-muted">
                                {t("sections.personal_info.phone")}
                            </label>
                            <p className="text-muted-foreground">{authUser.user.user_metadata.phone || t("not_set")}</p>
                        </div>
                    </div>
                </div>
                <div className="border p-2 md:p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-xl">{t("sections.my_spaces.title")}</h3>
                        <SpaceForm />
                    </div>
                    <div className="flex flex-col gap-2">
                        {spaces && spaces.map((space) => {
                            return (
                                <SpaceItem key={space.id} space={space} />
                            )
                        })}
                        {!spaces && (
                            <div className="border-dashed border dark:border-muted p-4 rounded-lg">
                                <p className="text-muted-foreground text-center">{t("no_spaces")}</p>
                            </div>
                        )}
                        {spaces && spaces.length === 0 && (
                            <div className="border-dashed border dark:border-muted p-4 rounded-lg">
                                <p className="text-muted-foreground text-center">{t("no_spaces")}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashboardPage