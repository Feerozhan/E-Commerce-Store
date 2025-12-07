import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 backdrop-blur-sm shadow-lg">
        <Link to={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
        </Link>
        
        <div className="p-6">
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ${product.price}
            </span>
            
            <Button
              onClick={() => addToCart(product)}
              size="icon"
              className="rounded-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
