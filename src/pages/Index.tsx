import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { motion } from "framer-motion";

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CategorySection />
      
      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg px-4">
              Handpicked favorites that brighten your lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
