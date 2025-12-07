import { motion } from "framer-motion";
import { Headphones, Watch, Glasses, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    icon: Headphones,
    gradient: "from-primary to-secondary",
    description: "Premium tech products",
  },
  {
    name: "Watches",
    icon: Watch,
    gradient: "from-secondary to-accent",
    description: "Luxury timepieces",
  },
  {
    name: "Fashion",
    icon: Glasses,
    gradient: "from-accent to-primary",
    description: "Designer accessories",
  },
  {
    name: "Bags",
    icon: ShoppingBag,
    gradient: "from-primary to-accent",
    description: "Premium leather goods",
  },
];

const CategorySection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our curated collections of premium products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link to="/shop" key={category.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, rotateY: 5 }}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80`} />
                
                {/* Glass Effect */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10" />
                
                {/* Border Gradient Animation */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{ padding: "2px" }}
                >
                  <div className="w-full h-full bg-background rounded-2xl" />
                </motion.div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6 z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <category.icon className="h-16 w-16 text-white mb-4" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-white/80 text-sm">
                    {category.description}
                  </p>

                  <motion.div
                    className="mt-4 text-white/60 group-hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Explore →
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
