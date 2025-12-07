import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
              <p className="text-muted-foreground mb-8">
                Start shopping to add items to your cart
              </p>
              <Link to="/shop">
                <Button variant="hero" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent"
          >
            Shopping Cart ({getTotalItems()} items)
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border backdrop-blur-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                    <p className="text-lg font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="p-6 rounded-xl bg-card border border-border backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold text-accent">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="bg-gradient-primary bg-clip-text text-transparent">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full bg-gradient-primary hover:shadow-glow-primary mb-4">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Link to="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
