import { useRouter } from "next/router";
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