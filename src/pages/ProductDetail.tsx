import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button variant="hero">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <Link to="/shop">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="sticky top-24">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 hover:opacity-10 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-gradient-primary text-white text-sm mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8">
                  ${product.price}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-primary/10 border border-primary/20">
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Premium quality materials</li>
                  <li>• Free shipping worldwide</li>
                  <li>• 30-day return policy</li>
                  <li>• 2-year warranty included</li>
                </ul>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => addToCart(product)}
                  size="lg"
                  className="w-full bg-gradient-primary hover:shadow-glow-primary text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </motion.div>

              {/* Customer Reviews Placeholder */}
              <div className="pt-8 border-t border-border">
                <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-xl bg-card border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Verified Purchase
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Amazing product! Exceeded my expectations in every way."
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
