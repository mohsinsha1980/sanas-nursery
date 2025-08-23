import HomeBanner from "@/components/home/home-banner";
import ContactForm from "@/components/home/contact/contact";
import BestSellingProduct from "@/components/home/best-selling-product";
import Testimonials from "@/components/home/testimonial/testimonials";
import Banner from "@/components/home/banner";
import Categories from "@/components/home/catogories";



export default function Home() {
  return (
    <>
      <HomeBanner />
      <Categories/>
      <ContactForm/>
      <BestSellingProduct/>
      <Testimonials/>
      <Banner/>
    </>
  );
}
