import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, Package, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const steps = [
  { icon: Package, label: "Cart", step: 1 },
  { icon: Truck, label: "Shipping", step: 2 },
  { icon: CreditCard, label: "Payment", step: 3 },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0 && !orderComplete) {
    navigate("/cart");
    return null;
  }

  const handleCompleteOrder = () => {
    setOrderComplete(true);
    clearCart();
    toast.success("Order placed successfully!");
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center"
              >
                <Check className="h-12 w-12 text-white" />
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-4">Order Confirmed!</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Thank you for your purchase. We'll send you a confirmation email shortly.
              </p>
              
              <div className="flex gap-4 justify-center">
                <Button variant="hero" size="lg" onClick={() => navigate("/shop")}>
                  Continue Shopping
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </div>
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
        <div className="container mx-auto max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-primary bg-clip-text text-transparent"
          >
            Checkout
          </motion.h1>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2" />
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-gradient-primary -translate-y-1/2"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
              
              {steps.map((step) => (
                <div key={step.step} className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      currentStep >= step.step
                        ? "bg-gradient-primary text-white"
                        : "bg-card border-2 border-border"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <step.icon className="h-6 w-6" />
                  </motion.div>
                  <p className="text-sm mt-2 text-center">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-xl p-8 backdrop-blur-sm"
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Shipping Method</h2>
                <div className="space-y-4">
                  {["Standard Shipping (5-7 days) - FREE", "Express Shipping (2-3 days) - $15.00"].map(
                    (method, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-colors"
                      >
                        <p className="font-medium">{method}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-lg bg-muted">
                  <div className="flex justify-between mb-2">
                    <span>Total</span>
                    <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Back
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  className="ml-auto bg-gradient-primary"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  className="ml-auto bg-gradient-primary hover:shadow-glow-primary"
                  onClick={handleCompleteOrder}
                >
                  Complete Order
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
