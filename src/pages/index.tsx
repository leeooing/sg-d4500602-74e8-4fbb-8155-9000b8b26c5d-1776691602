import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MenuPage } from "@/components/MenuPage";
import { SEO } from "@/components/SEO";

export default function HomePage() {
  const router = useRouter();
  const tableId = router.query.table as string;

  return (
    <>
      <SEO />
      <MenuPage tableId={tableId} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "vi", ["common"])),
    },
  };
};