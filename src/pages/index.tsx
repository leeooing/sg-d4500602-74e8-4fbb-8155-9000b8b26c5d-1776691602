import { SEO } from "@/components/SEO";
import { MenuPage } from "@/components/MenuPage";

export default function Home() {
  return (
    <>
      <SEO
        title="SamCamping Cafe - Menu & Đặt bàn"
        description="Thực đơn cafe SamCamping với các món cà phê, trà, đá xay. Đặt bàn online nhanh chóng."
      />
      <MenuPage />
    </>
  );
}