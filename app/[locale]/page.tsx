import { Button } from "@/components/ui/button";
import { getI18n } from "@/locales/server";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";


async function HomePage() {
  //const t = await getI18n()
  //const t = useTranslations("home");
  const t = await getTranslations("home")


  return (
    <section className="font-[family-name:var(--font-geist-sans)] grow flex flex-col justify-center">
      <div className="container mx-auto flex flex-col items-center text-center xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          {t("title.first")}
          <span className="text-black/20 dark:text-accent">{t("title.middle")}</span>
          {t("title.last")}
        </h1>
        <p className="px-8 mt-4 mb-12 text-lg max-w-[50ch]">
          {t("description")}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="outline" size="lg" asChild>
            <Link href="/signup">
              {t("button-get-started")}
            </Link>
          </Button>
          <Button variant="secondary" size="lg">
            <Link href="/info">
              {t("button-learn-more")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomePage;