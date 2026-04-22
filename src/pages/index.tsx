import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Coffee, Calendar, MapPin, Users, Star, ArrowRight, Menu, Phone, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const popularItems = [
  {
    id: "1",
    name: "Cà Phê Phin Truyền Thống",
    nameEn: "Traditional Drip Coffee",
    price: "35.000đ",
    image: "/menucoffee.png",
    category: "Cà phê",
    categoryEn: "Coffee"
  },
  {
    id: "2", 
    name: "Bạc Xỉu Đá",
    nameEn: "Iced Milk Coffee",
    price: "35.000đ",
    image: "/menucoffee.png",
    category: "Cà phê",
    categoryEn: "Coffee"
  },
  {
    id: "3",
    name: "Trà Sữa Oolong",
    nameEn: "Oolong Milk Tea", 
    price: "45.000đ",
    image: "/menucoffee.png",
    category: "Trà sữa",
    categoryEn: "Milk Tea"
  }
];

const features = [
  {
    icon: Menu,
    titleVi: "QR Menu Thông Minh",
    titleEn: "Smart QR Menu",
    descVi: "Duyệt menu, tìm kiếm món, và gọi nhân viên chỉ với một chạm",
    descEn: "Browse menu, search items, and call staff with just a tap"
  },
  {
    icon: Calendar,
    titleVi: "Đặt Bàn Dễ Dàng",
    titleEn: "Easy Booking",
    descVi: "Đặt bàn trước, thanh toán cọc online, xác nhận nhanh chóng",
    descEn: "Book in advance, pay deposit online, quick confirmation"
  },
  {
    icon: MapPin,
    titleVi: "Không Gian Camping",
    titleEn: "Camping Vibe",
    descVi: "Thưởng thức cafe trong không gian thiên nhiên, gần gũi với cây cối",
    descEn: "Enjoy coffee in nature-inspired space, close to trees"
  },
  {
    icon: Users,
    titleVi: "Cộng Đồng Yêu Thiên Nhiên",
    titleEn: "Nature Lovers Community",
    descVi: "Kết nối với những người cùng đam mê camping và outdoor",
    descEn: "Connect with fellow camping and outdoor enthusiasts"
  }
];

const testimonials = [
  {
    name: "Minh Anh",
    role: "Khách hàng thường xuyên",
    roleEn: "Regular Customer",
    text: "SamCamping là nơi tôi tìm thấy sự yên bình giữa lòng thành phố. Cà phê ngon, không gian đẹp, và hệ thống đặt bàn rất tiện lợi!",
    textEn: "SamCamping is where I find peace in the city. Great coffee, beautiful space, and very convenient booking system!",
    rating: 5
  },
  {
    name: "Tuấn Kiệt", 
    role: "Tín đồ camping",
    roleEn: "Camping Enthusiast",
    text: "Không gian như đang camping thật sự! QR menu giúp order nhanh, nhân viên nhiệt tình. Tôi đã book bàn nhiều lần rồi.",
    textEn: "The space feels like real camping! QR menu makes ordering fast, staff is enthusiastic. I've booked many times.",
    rating: 5
  }
];

const faqs = [
  {
    questionVi: "Làm sao để đặt bàn tại SamCamping?",
    questionEn: "How to book a table at SamCamping?",
    answerVi: "Bạn có thể đặt bàn qua trang web của chúng tôi. Chọn ngày giờ, số người, thanh toán cọc online, và nhận xác nhận qua email/SMS.",
    answerEn: "You can book via our website. Choose date/time, number of guests, pay deposit online, and receive confirmation via email/SMS."
  },
  {
    questionVi: "Có cần đặt cọc khi booking không?",
    questionEn: "Do I need to pay a deposit when booking?",
    answerVi: "Có, chúng tôi yêu cầu đặt cọc 50.000đ/người để giữ chỗ. Số tiền cọc sẽ được trừ vào bill khi bạn đến.",
    answerEn: "Yes, we require a 50,000đ/person deposit to secure your table. The deposit will be deducted from your bill."
  },
  {
    questionVi: "Menu có những gì?",
    questionEn: "What's on the menu?",
    answerVi: "Chúng tôi có đa dạng cà phê truyền thống, specialty coffee, trà sữa, smoothie, và các món ăn nhẹ. Xem menu đầy đủ qua QR code tại quán hoặc online.",
    answerEn: "We offer traditional coffee, specialty coffee, milk tea, smoothies, and light snacks. View full menu via QR code or online."
  },
  {
    questionVi: "Quán có WiFi không?",
    questionEn: "Is there WiFi?",
    answerVi: "Có, chúng tôi cung cấp WiFi miễn phí cho tất cả khách hàng. Password sẽ được in trên menu.",
    answerEn: "Yes, we provide free WiFi for all customers. Password is printed on the menu."
  }
];

export default function LandingPage() {
  const router = useRouter();
  const { language } = useLanguage();

  return (
    <>
      <SEO 
        title="SamCamping - Camping Cafe & QR Menu"
        description="Trải nghiệm cafe trong không gian camping, đặt bàn dễ dàng với QR menu thông minh"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hedaer.jpeg"
              alt="SamCamping Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
          </div>

          <div className="relative z-10 container text-center space-y-8 animate-fade-in">
            <Badge variant="outline" className="bg-primary/10 border-primary text-primary text-sm md:text-base px-4 py-2">
              {language === "vi" ? "🏕️ Camping & Cafe" : "🏕️ Camping & Cafe"}
            </Badge>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl leading-tight">
              {language === "vi" ? "Cuộc Phiêu Lưu" : "Your Adventure"}
              <br />
              {language === "vi" ? "Bắt Đầu Từ Đây!" : "Starts Here!"}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">
              {language === "vi" 
                ? "Khám phá không gian cafe camping độc đáo, thưởng thức đồ uống chất lượng, và kết nối với thiên nhiên ngay giữa lòng thành phố"
                : "Discover unique camping cafe space, enjoy quality drinks, and connect with nature in the heart of the city"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-base md:text-lg px-8 py-6 group"
                onClick={() => router.push("/menu")}
              >
                {language === "vi" ? "Xem Menu" : "View Menu"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="text-base md:text-lg px-8 py-6 bg-white/90 hover:bg-white border-2"
                onClick={() => router.push("/booking")}
              >
                {language === "vi" ? "Đặt Bàn Ngay" : "Book Now"}
              </Button>
            </div>

            <div className="flex gap-8 justify-center text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{language === "vi" ? "1000+ Khách hàng" : "1000+ Customers"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>4.9/5</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12 space-y-4">
              <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
                {language === "vi" ? "✨ Điểm Nổi Bật" : "✨ Features"}
              </Badge>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                {language === "vi" ? "Trải Nghiệm Độc Đáo" : "Unique Experience"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg group">
                  <CardHeader>
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">
                      {language === "vi" ? feature.titleVi : feature.titleEn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {language === "vi" ? feature.descVi : feature.descEn}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Menu Items */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12 space-y-4">
              <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
                {language === "vi" ? "☕ Best Sellers" : "☕ Best Sellers"}
              </Badge>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                {language === "vi" ? "Món Yêu Thích" : "Popular Items"}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {language === "vi" 
                  ? "Khám phá những món đồ uống được khách hàng yêu thích nhất tại SamCamping"
                  : "Discover the most beloved drinks at SamCamping"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {popularItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={item.image}
                      alt={language === "vi" ? item.name : item.nameEn}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">
                      {language === "vi" ? item.category : item.categoryEn}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {language === "vi" ? item.name : item.nameEn}
                    </CardTitle>
                    <CardDescription className="text-2xl font-bold text-primary">
                      {item.price}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => router.push("/menu")}
              >
                {language === "vi" ? "Xem Menu Đầy Đủ" : "View Full Menu"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container">
            <div className="text-center mb-12 space-y-4">
              <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
                {language === "vi" ? "💬 Đánh Giá" : "💬 Testimonials"}
              </Badge>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                {language === "vi" ? "Khách Hàng Nói Gì" : "What Customers Say"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>
                      {language === "vi" ? testimonial.role : testimonial.roleEn}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">
                      "{language === "vi" ? testimonial.text : testimonial.textEn}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="text-center mb-12 space-y-4">
              <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
                {language === "vi" ? "❓ FAQ" : "❓ FAQ"}
              </Badge>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                {language === "vi" ? "Câu Hỏi Thường Gặp" : "Frequently Asked Questions"}
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-2 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                    {language === "vi" ? faq.questionVi : faq.questionEn}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {language === "vi" ? faq.answerVi : faq.answerEn}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-6xl font-bold">
              {language === "vi" ? "Tham Gia Cộng Đồng SamCamping!" : "Join SamCamping Community!"}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {language === "vi" 
                ? "Sẵn sàng khám phá không gian cafe camping độc đáo? Đặt bàn ngay hôm nay và trải nghiệm sự khác biệt mà SamCamping mang lại."
                : "Ready to explore our unique camping cafe space? Book now and experience the SamCamping difference."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-base md:text-lg px-8 py-6"
                onClick={() => router.push("/booking")}
              >
                {language === "vi" ? "Đặt Bàn Ngay" : "Book a Table"}
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="text-base md:text-lg px-8 py-6 bg-white/10 hover:bg-white/20 border-white text-white"
                onClick={() => router.push("/info")}
              >
                {language === "vi" ? "Tìm Hiểu Thêm" : "Learn More"}
              </Button>
            </div>

            <div className="pt-8 flex flex-col md:flex-row gap-6 justify-center items-center text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{language === "vi" ? "7:00 - 23:00 hàng ngày" : "7:00 - 23:00 daily"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{language === "vi" ? "TP. Hồ Chí Minh" : "Ho Chi Minh City"}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}