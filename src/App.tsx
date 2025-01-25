import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Package,
  RefreshCw,
  Clock,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';

// Types
interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface Feature {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutForm {
  name: string;
  address: string;
  phone: string;
  email: string;
}

// Data
const slides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1920",
    title: "Summer Collection 2024",
    subtitle: "Discover timeless elegance"
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1920",
    title: "Luxury Essentials",
    subtitle: "Curated for sophistication"
  },
  {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1920",
    title: "Autumn Styles",
    subtitle: "Embrace the season"
  }
];

const categories: Category[] = [
  { id: "men", name: "Men", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600" },
  { id: "women", name: "Women", image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=600" },
  { id: "children", name: "Children", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=600" },
  { id: "accessories", name: "Accessories", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=600" }
];

const products: Product[] = [
  {
    id: "1",
    categoryId: "men",
    name: "Classic White Shirt",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    description: "Premium cotton dress shirt perfect for any occasion"
  },
  {
    id: "2",
    categoryId: "men",
    name: "Navy Blazer",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1555069519-127aadedf1ee?auto=format&fit=crop&q=80&w=800",
    description: "Tailored fit blazer in premium wool blend"
  },
  {
    id: "3",
    categoryId: "women",
    name: "Floral Dress",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
    description: "Elegant floral print dress perfect for summer"
  },
  {
    id: "4",
    categoryId: "women",
    name: "Leather Handbag",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    description: "Premium leather handbag with gold hardware"
  },
  {
    id: "5",
    categoryId: "children",
    name: "Kids Denim Set",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800",
    description: "Comfortable denim set for active kids"
  },
  {
    id: "6",
    categoryId: "accessories",
    name: "Leather Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
    description: "Classic leather watch with silver case"
  }
];

const features: Feature[] = [
  { icon: TrendingUp, title: "Premium Quality", description: "Finest materials & craftsmanship" },
  { icon: Package, title: "Free Shipping", description: "On orders over $200" },
  { icon: RefreshCw, title: "Easy Returns", description: "30-day return policy" },
  { icon: Clock, title: "24/7 Support", description: "Always here to help" }
];

// Components
function Header({ cartItems }: { cartItems: CartItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-gray-900">LUXE</Link>
            <nav className="hidden md:flex space-x-8">
              {categories.map(category => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {categories.map(category => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div>
      {/* Hero Slider */}
      <div className="relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-8">{slide.subtitle}</p>
                <button className="bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/80 rounded-full hover:bg-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/80 rounded-full hover:bg-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    to={`/checkout/${product.id}`}
                    className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-100"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-xl font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Spring Collection 2024</h2>
              <p className="text-gray-300 mb-8">
                Discover our latest collection featuring sustainable materials and timeless designs.
                Each piece is crafted with attention to detail and commitment to quality.
              </p>
              <Link
                to="/category/women"
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100"
              >
                Explore Collection
              </Link>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/your-video-id"
                title="Spring Collection 2024"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex flex-col items-center text-center">
                  <Icon className="w-12 h-12 text-gray-900 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button className="px-8 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-center space-x-8 mb-8">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 LUXE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CategoryPage() {
  const location = useLocation();
  const categoryId = location.pathname.split('/').pop();
  const category = categories.find(c => c.id === categoryId);
  const categoryProducts = products.filter(p => p.categoryId === categoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12">{category.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    to={`/checkout/${product.id}`}
                    className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-100"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <Link
                    to={`/checkout/${product.id}`}
                    className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckoutPage() {
  const location = useLocation();
  const productId = location.pathname.split('/').pop();
  const product = products.find(p => p.id === productId);
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  if (!product) return <div>Product not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Order placed:', { product, formData });
    alert('Order placed successfully! We will contact you soon.');
  };

  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-2xl font-bold mt-2">${product.price}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                required
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800"
              >
                Place Order (Cash on Delivery)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <div className="min-h-screen bg-white">
      <Header cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;