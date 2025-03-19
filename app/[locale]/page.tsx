import { Button } from "@/components/ui/button";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    title: t("home.metadata_title"),
  };
}

async function HomePage() {
  const t = await getI18n()

  return (
    <section className="font-[family-name:var(--font-geist-sans)] grow flex flex-col justify-center">
      <div className="container mx-auto flex flex-col items-center text-center xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          {t("home.title.first")}
          <span className="text-black/20 dark:text-accent">{t("home.title.middle")}</span>
          {t("home.title.last")}
        </h1>
        <p className="px-8 mt-4 mb-12 text-lg max-w-[50ch]">
          {t("home.description")}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="outline" size="lg" asChild>
            <Link href="/signup">
              {t("home.button-get-started")}
            </Link>
          </Button>
          <Button variant="secondary" size="lg">
            <Link href="/info">
              {t("home.button-learn-more")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomePage;