import AccountModal from "@/components/dashboard/account-modal"
import { getI18n } from "@/locales/server"
import { createClient } from "@/supabase/server"
import Image from "next/image"
import { redirect } from "next/navigation"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title : "Dashboard",
}


async function DashboardPage() {

    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    const t = await getI18n()

    if (error) {
        return redirect("/login")
    }

    return (
        <section className="grow flex flex-col">
            <h2 className="font-bold text-2xl mb-10">{t("dashboard.title")}</h2>
            <div className="flex flex-col gap-8">
                <div className="border p-2 md:p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-xl">{t("dashboard.sections.account.title")}</h3>
                    </div>
                    <div className="flex items-center gap-4 ">
                        {data.user.user_metadata.avatar_url && (
                            <Image
                                src={data.user.user_metadata.avatar_url}
                                alt="avatar"
                                width={75}
                                height={75}
                                className="rounded-full"
                            />
                        )}
                        {!data.user.user_metadata.avatar_url && (
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
                                data.user.user_metadata.first_name && data.user.user_metadata.last_name ?
                                    data.user.user_metadata.first_name + " " + data.user.user_metadata.last_name :
                                    "No name set"
                            } </h3>
                            <p className="text-muted-foreground">{data.user.email}</p>
                        </div>
                    </div>
                </div>
                <div className="border p-2 md:p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-xl">{t("dashboard.sections.personal_info.title")}</h3>
                        <AccountModal user={data.user || {}} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground/30 dark:text-muted">
                                {t("dashboard.sections.personal_info.first_name")}
                            </label>
                            <p className="text-muted-foreground">{data.user.user_metadata.first_name || "Not set"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground/30 dark:text-muted">
                                {t("dashboard.sections.personal_info.last_name")}
                            </label>
                            <p className="text-muted-foreground">{data.user.user_metadata.last_name || "Not set"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground/30 dark:text-muted">
                                {t("dashboard.sections.personal_info.email")}
                            </label>
                            <p className="text-muted-foreground">{data.user.email || "Not set"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground/30 dark:text-muted">
                                {t("dashboard.sections.personal_info.phone")}
                            </label>
                            <p className="text-muted-foreground">{data.user.user_metadata.phone || "Not set"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashboardPage