import { motion } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              SUNNY
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-foreground/80 hover:text-foreground transition-colors">
              Shop
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-glow">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden pt-4 pb-2"
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/contact"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                Cart ({getTotalItems()})
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
