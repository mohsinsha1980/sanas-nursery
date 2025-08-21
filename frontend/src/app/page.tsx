import HomeBanner from "@/components/home/home-banner";
import ContactForm from "@/components/home/contact/contact";
import BestSellingProduct from "@/components/home/best-selling-product";
import Testimonials from "@/components/home/testimonial/testimonials";



export default function Home() {
  return (
    <>
      <HomeBanner />
      <ContactForm/>
      <BestSellingProduct/>
      <Testimonials/>
    </>
  );
}
