  import React, { useState, useEffect, useRef } from "react"; // Added useRef

  // --- Supabase Initialization ---
  // NOTE: Ensure your .env file has VITE_ prefix (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const PRODUCT_BUCKET_NAME = 'product-images'; // Define the bucket name

  let supabase = null;
  try {
    const isConfigValid = SUPABASE_URL && SUPABASE_KEY;
    const isSupabaseClientLoaded = typeof window.supabase !== 'undefined' && 
                                  typeof window.supabase.createClient === 'function';
    if (isConfigValid) {
      if (isSupabaseClientLoaded) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("Supabase client successfully initialized.");
      } else {
        console.error("Supabase client library is not loaded.");
      }
    } else {
      console.warn("Supabase environment variables are missing.");
    }
  } catch (e) {
    console.error("Critical error during Supabase initialization:", e);
  }


  // --- Utility Functions ---

  /**
   * Generates a public URL for a file in the Supabase Storage bucket.
   */
const getPublicProductImageUrl = (imagePath) => {
  if (!supabase || !imagePath) return null; // Return null for conditional rendering
  const { data } = supabase.storage.from(PRODUCT_BUCKET_NAME).getPublicUrl(imagePath);
  return data?.publicUrl || null; // Return null if no URL
};

  // --- Icons (Inline SVG) ---
  const Icon = ({ children, className = "w-5 h-5" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
  const Loader = ({ className = "w-5 h-5 text-yellow-500" }) => (
    <Icon className={className + " animate-spin"}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </Icon>
  );
  const ArrowLeft = (props) => (
    <Icon {...props}>
      <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </Icon>
  );
  const Eye = (props) => (
    <Icon {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </Icon>
  );
  const EyeOff = (props) => (
    <Icon {...props}>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.56 13.56 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.36-1.39"/><line x1="2" x2="22" y1="2" y2="22"/>
    </Icon>
  );
  const User = (props) => (
    <Icon {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </Icon>
  );
  const Lock = (props) => (
    <Icon {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </Icon>
  );
  const Mail = (props) => (
    <Icon {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.83 1.83 0 0 1-2.06 0L2 7"/>
    </Icon>
  );
  const Phone = (props) => (
    <Icon {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.66-3.66A19.79 19.79 0 0 1 3 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 2 15.7 15.7 0 0 0 .8 1.82 2 2 0 0 1-.49 2.02l-1.07 1.07a11.5 11.5 0 0 0 5.4 5.4l1.07-1.07a2 2 0 0 1 2.02-.49A15.7 15.7 0 0 0 18 14a2 2 0 0 1 2 2z"/>
    </Icon>
  );
  const Cake = (props) => (
    <Icon {...props}>
      <path d="M20 7v5h-4"/><path d="M4 7v5h4"/><path d="M12 2v10"/><path d="M20 7h-4"/><path d="M4 7h4"/><path d="M12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M12 12v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z"/>
    </Icon>
  );
  const Home = (props) => (
    <Icon {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </Icon>
  );
  const ShoppingBag = (props) => (
    <Icon {...props}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </Icon>
  );
  const Info = (props) => (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </Icon>
  );
  const BookOpen = (props) => (
    <Icon {...props}>
      <path d="M2 13V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7"/><path d="M2 13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"/><path d="M2 17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"/><path d="M4 19v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
    </Icon>
  );
  const ShoppingCart = (props) => ( // NEW ICON
    <Icon {...props}>
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 12.81a2 2 0 0 0 2 1.69h9.72a2 2 0 0 0 2-1.69L23 6H6" />
    </Icon>
  );
  const Trash = (props) => ( // NEW ICON
    <Icon {...props}>
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </Icon>
  );
  const Plus = (props) => ( // NEW ICON
    <Icon {...props}>
      <path d="M5 12h14" /><path d="M12 5v14" />
    </Icon>
  );
  const Minus = (props) => ( // NEW ICON
    <Icon {...props}>
      <path d="M5 12h14" />
    </Icon>
  );
  const Check = (props) => ( // NEW ICON
    <Icon {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
  const MapPin = (props) => ( // NEW ICON
    <Icon {...props}>
      <path d="M12 21.7C17.3 17 22 13 22 10a8 8 0 0 0-16 0c0 3 4.7 7 10 11.7z"/><circle cx="12" cy="10" r="3"/>
    </Icon>
  );
  const DollarSign = (props) => ( // NEW ICON
    <Icon {...props}>
      <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </Icon>
  );
// NEW ICON: Search
const Search = (props) => (
    <Icon {...props}>
      <circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>
    </Icon>
);

 
  const MessageModal = ({ message, type, onClose }) => {
    if (!message) return null;
    const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
    const title = type === 'error' ? 'Error' : 'Success';
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`bg-white text-gray-800 p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-all`}>
          <h3 className={`text-xl font-bold ${type === 'error' ? 'text-red-600' : 'text-green-600'} mb-2`}>{title}</h3>
          <p className="text-sm mb-4">{message}</p>
          <button
            onClick={onClose}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ${bgColor} hover:opacity-90`}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  /**
   * Shared Form Input Component
   */
  const InputField = ({ label, name, type = "text", value, onChange, placeholder, icon: IconComponent, required = true, isTextArea = false }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    
    const InputComponent = isTextArea ? 'textarea' : 'input';

    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 sr-only">
          {label}
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className={`absolute inset-y-0 left-0 flex items-center pl-3 ${isTextArea ? 'top-3 items-start' : 'pointer-events-none'}`}>
            {IconComponent && <IconComponent className="h-5 w-5 text-gray-500" />}
          </div>
          <InputComponent
            id={name}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={isTextArea ? 3 : undefined}
            className={`block w-full rounded-lg border-0 bg-gray-700 py-3 ${isTextArea ? 'pl-10' : 'pl-10 pr-4'} text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:bg-gray-800 transition duration-150 sm:text-sm`}
          />
          {isPassword 
          && (
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ?
              <EyeOff className="h-5 w-5 text-gray-500 hover:text-white" /> : <Eye className="h-5 w-5 text-gray-500 hover:text-white" />}
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- Navigation Header Component ---
  // --- Navigation Header Component ---
  // UPDATED: Replaced 'showAuthButtons' with 'user' prop
  const NavHeader = ({ currentScreen, onNavigate, user, cartItemCount = 0 }) => {
    const navItems = [
      { name: 'HOME', screen: 'home', icon: Home },
      { name: 'SHOP', screen: 'shop', icon: ShoppingBag },
      { name: 'ABOUT', screen: 'about', icon: BookOpen },
    ];

    // NEW LOGIC: Determine logged-in state and display name
    const isLoggedIn = !!user;
    // Use username from metadata (if available from sign-up), fallback to email prefix, or 'PROFILE'
    const displayName = isLoggedIn
      ? user.user_metadata?.username?.toUpperCase() || user.email?.split('@')[0].toUpperCase() || 'PROFILE'
      : null;
      
    return (
      <div className="flex justify-between items-center p-4 bg-black border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <Home className="w-6 h-6 text-yellow-500" />
          <span className="text-xl font-extrabold text-white">EVO</span>
        </div>
        <div className="flex space-x-4">
          {navItems.map(item => (
            <button 
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`text-sm font-medium uppercase transition ${
                currentScreen === item.screen ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-white hover:text-yellow-500'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        
        {/* UPDATED: Show Login OR Username button, and the Cart Icon always */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            // Logged In: Show Username/Profile button
            <button
              onClick={() => onNavigate('profile')}
              className="text-white bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-full text-sm font-semibold transition"
            >
              {displayName}
            </button>
          ) : (
            // Logged Out: Show Login button
            <button
              onClick={() => onNavigate('login')}
              className="text-white bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-full text-sm font-semibold transition"
            >
              Login
            </button>
          )}
          
          {/* Cart Icon (Always visible now) */}
          <div className="relative cursor-pointer" onClick={() => onNavigate('cart')}>
            <ShoppingCart className="w-6 h-6 text-white hover:text-yellow-500" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center p-1">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Size Selector Component
   */
  const SizeSelector = ({ availableSizes, selectedSize, onSelect }) => {
      const defaultSizes = ['S', 'M', 'L', 'XL'];
      const sizes = availableSizes && availableSizes.length > 0 ? availableSizes : defaultSizes;
      
      return (
          <div className="flex space-x-2 my-2">
              {sizes.map(size => (
                  <button
                      key={size}
                      onClick={(e) => { e.stopPropagation(); onSelect(size); }}
                      className={`
                          w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-full border-2 
                          transition duration-150
                          ${selectedSize === size
                              ? 'bg-yellow-500 border-yellow-500 text-black shadow-md'
                              : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                          }
                      `}
                  >
                      {size}
                  </button>
              ))}
          </div>
      );
  };


  /**
   * Shop Screen Component - Fetches Products (UPDATED with Size Selector and Cart logic)
   */
 // NOTE: Make sure these components/constants are defined/imported
// outside of ShopScreen (or in a utility file).

const colors = ['All', 'Black', 'White', 'Red', 'Blue', 'Yellow', 'Gray', 'Matte Black'];



const ShopScreen = ({ onNavigate, addToCart, cartItemCount, user }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for search and filter (already present)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedColorCategory, setSelectedColorCategory] = useState('All');
    const [selectedSizes, setSelectedSizes] = useState({});

    // 1. UPDATED useEffect: Fetch products whenever search query or color category changes
    useEffect(() => {
        // Pass current state values to the fetch function
        fetchProducts(searchQuery, selectedColorCategory);
    }, [searchQuery, selectedColorCategory]);

    // 2. UPDATED fetchProducts: Handles filtering and searching
    const fetchProducts = async (query = '', colorCategory = 'All') => {
        if (!supabase) {
            setError('Supabase not initialized. Cannot fetch products.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            let queryBuilder = supabase
                .from('products')
                .select('*');
// A. FILTER BY COLOR CATEGORY
  if (colorCategory !== 'All') {
      queryBuilder = queryBuilder.ilike('color', colorCategory);  // Changed from eq to ilike for case-insensitivity
  }
  
            
            // B. IMPLEMENT SEARCH FILTERING (in name OR color)
            if (query.trim()) {
                const searchPattern = `%${query.trim()}%`;
                queryBuilder = queryBuilder.or(`name.ilike.${searchPattern},color.ilike.${searchPattern}`);
            }

            const { data, error } = await queryBuilder
                .order('price', { ascending: true }); // Apply final order

            if (error) throw error;
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err.message);
            setError(`Failed to load products: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSizeSelect = (productId, size) => {
        setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    };

    const handleAddToCartClick = (product) => {
        const size = selectedSizes[product.id] || 'M'; // Default to Medium if not selected
        addToCart(product, size);
    };

    // ProductCard component remains mostly the same, ensuring it's defined correctly
    const ProductCard = ({ product }) => {
        const defaultSize = 'M';
        const currentSize = selectedSizes[product.id] || defaultSize;
        useEffect(() => {
            if (!selectedSizes[product.id]) {
                setSelectedSizes(prev => ({ ...prev, [product.id]: defaultSize }));
            }
        }, [product.id]);

        const imageUrl = getPublicProductImageUrl(product.image_path);
        
        return (
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition duration-300">
                {/* Conditional Image Display (like admin) */}
                {imageUrl ? (
                    <img 
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/555/FFF?text=Image+Missing"; }}
                    />
                ) : (
                    <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-gray-400">
                        [No Image]
                    </div>
                )}
                <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                    <p className="text-yellow-500 font-semibold text-xl">₱{product.price.toFixed(2)}</p>  
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                    <p className="text-sm text-gray-300 mt-1">Color: <span className="font-semibold text-white">{product.color || 'N/A'}</span></p>
                    <div className="mt-3">
                        <span className="text-xs text-gray-300 font-semibold block mb-1">Select Size: {currentSize}</span>
                        <SizeSelector
                            selectedSize={currentSize}
                            onSelect={(size) => handleSizeSelect(product.id, size)}
                        />
                    </div>

                    <button
                        className="mt-3 w-full py-2 bg-yellow-600 text-black font-semibold rounded-lg hover:bg-yellow-500 transition flex items-center justify-center space-x-2"
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            handleAddToCartClick(product);
                        }}
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-black text-white">
            <NavHeader currentScreen="shop" onNavigate={onNavigate} user={user} cartItemCount={cartItemCount} />
            
            <div className="p-6 flex-shrink-0">
                <h1 className="text-3xl font-extrabold text-white mb-2">Shop Helmets</h1>
                <p className="text-gray-400">Explore our premium collection of EVO gear.</p>
                
                {/* 3. ADDED: Color Category Filter UI */}
                <h2 className="text-lg font-semibold text-white mt-4 mb-2">Filter by Color:</h2>
                <div className="mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                    {colors.map(color => (
                        <button
                            key={color}
                            onClick={() => setSelectedColorCategory(color)}
                            className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-full mr-2 transition duration-150 ease-in-out ${
                                selectedColorCategory === color
                                    ? 'bg-yellow-500 text-black border-yellow-500 shadow-lg'
                                    : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                            }`}
                        >
                            {color}
                        </button>
                    ))}
                </div>
                
                {/* 4. ADDED: Search Input Field */}
                <div className="mb-6">
                    <InputField
                        name="search"
                        placeholder="Search products by name or color..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={Search}
                        required={false}
                    />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 pt-0">
                {loading && (
                    <div className="flex justify-center items-center h-full">
                        <Loader className="w-10 h-10 text-yellow-500" />
                        <p className="ml-2 text-yellow-500">Loading Products...</p>
                    </div>
                )}
                
                {error && <p className="text-red-500 text-center">{error}</p>}

                {!loading && products.length === 0 && !error && (
                    <p className="text-gray-400 text-center mt-10">
                        No products found. Please ensure the 'products' table is populated or adjust your filters/search query.
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}; // <-- FINAL closing brace for ShopScreen
  /**
   * Cart Screen Component (REVAMPED for functionality and style)
   */
  const CartScreen = ({ 
      onNavigate, 
      cartItems, 
      updateQuantity, 
      removeFromCart, 
      user, 
      selectedCartItems, // NEW PROP
      toggleItemSelection, // NEW PROP
      toggleSelectAll // NEW PROP
  }) => {
      const [loading, setLoading] = useState(false);
      const selectAllRef = useRef(null);

      // Calculate total price based on SELECTED items
      const subtotal = selectedCartItems.reduce((sum, item) => sum + (item.products.price * item.quantity), 0);
      const shipping = selectedCartItems.length > 0 ? 5.00 : 0;
      const total = subtotal + shipping;
      
      const allSelected = cartItems.length > 0 && selectedCartItems.length === cartItems.length;
      const isIndeterminate = selectedCartItems.length > 0 && selectedCartItems.length < cartItems.length;

      // Use a ref to set the indeterminate state
      useEffect(() => {
          if (selectAllRef.current) {
              selectAllRef.current.indeterminate = isIndeterminate;
          }
      }, [isIndeterminate]);


    const CartItem = ({ item }) => {
    // Function to check if the current item is selected
    const isSelected = selectedCartItems.some(sItem => 
        sItem.product_id === item.product_id && sItem.size === item.size
    );
    
    const imageUrl = getPublicProductImageUrl(item.products.image_path); // Get image URL conditionally
    
    return (
        <div className="flex bg-gray-800 rounded-lg p-3 shadow-md mb-4 items-center">
            {/* CHECKBOX: Add checkbox for specific selection */}
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleItemSelection(item.product_id, item.size)}
                className="form-checkbox h-5 w-5 text-yellow-500 bg-gray-700 border-gray-600 rounded mr-3 flex-shrink-0 focus:ring-yellow-500 transition duration-150"
            />

            {/* Image - Conditional Display */}
            {imageUrl ? (
                <img 
                    src={imageUrl}
                    alt={item.products.name}
                    className="w-16 h-16 object-cover rounded-md mr-4 flex-shrink-0"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/555/FFF?text=Image+Missing"; }}
                />
            ) : (
                <div className="w-16 h-16 bg-gray-700 rounded-md mr-4 flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">
                    [No Image]
                </div>
            )}
            
            <div className="flex-grow">
                {/* Name and Size */}
                <h3 className="text-white font-semibold text-base">{item.products.name}</h3>
                <p className="text-xs text-gray-400">Size: <span className="text-yellow-500 font-medium">{item.size}</span></p>
                Color: <span className="text-yellow-500 font-medium">{item.products.color || 'N/A'}</span>
                {/* Price and Subtotal */}
                <p className="text-yellow-500 font-bold text-sm">
                    ₱{item.products.price.toFixed(2)} 
                    <span className="text-gray-400 font-normal ml-2">x {item.quantity}</span>
                </p>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                    onClick={() => updateQuantity(item.product_id, item.size, item.quantity - 1)}
                    disabled={item.quantity <= 1 || loading}
                    className="bg-gray-700 text-white p-1 rounded-full hover:bg-yellow-600 disabled:opacity-50 transition"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-semibold w-4 text-center">{item.quantity}</span>
                <button
                    onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
                    disabled={loading}
                    className="bg-gray-700 text-white p-1 rounded-full hover:bg-yellow-600 transition"
                >
                    <Plus className="w-4 h-4" />
                </button>
                <button
                    onClick={() => removeFromCart(item.product_id, item.size)}
                    className="ml-4 text-red-500 hover:text-red-400 transition"
                    disabled={loading}
                >
                    <Trash className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

      return (
          <div className="flex flex-col h-full bg-black text-white">
             <NavHeader currentScreen="cart" onNavigate={onNavigate} user={user} cartItemCount={cartItems.length} />
              <div className="p-6 flex-grow overflow-y-auto">
                  <h1 className="text-3xl font-extrabold text-white mb-6">Your Cart ({cartItems.length} Items)</h1>

                  {/* Select All Checkbox */}
                  {cartItems.length > 0 && (
                      <div className="flex justify-between items-center mb-4 p-3 bg-gray-900 rounded-xl border border-gray-700">
                          <label className="flex items-center text-sm font-semibold text-white cursor-pointer">
                              <input
                                  type="checkbox"
                                  checked={allSelected}
                                  ref={selectAllRef} // Use the ref here
                                  onChange={(e) => toggleSelectAll(e.target.checked)}
                                  className="form-checkbox h-5 w-5 text-yellow-500 bg-gray-700 border-gray-600 rounded mr-3 focus:ring-yellow-500 transition duration-150"
                              />
                              Select All ({selectedCartItems.length}/{cartItems.length})
                          </label>
                      </div>
                  )}
                  
                  {/* Cart Items List */}
                  {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center p-10 bg-gray-900 rounded-xl">
                          <ShoppingCart className="w-12 h-12 text-gray-500 mb-4" />
                          <p className="text-lg text-gray-400">Your shopping cart is empty.</p>
                          <button 
                              onClick={() => onNavigate('shop')}
                              className="mt-4 py-2 px-4 rounded-lg bg-yellow-600 text-black font-bold hover:bg-yellow-500 transition"
                          >
                              Start Shopping
                          </button>
                      </div>
                  ) : (
                      <div>
                          {/* Map over ALL cart items, let CartItem handle the selection checkbox */}
                          {cartItems.map(item => <CartItem key={`${item.product_id}-${item.size}`} item={item} />)}
                      </div>
                  )}
              </div>

              {/* Cart Summary and Checkout Button */}
              <div className="p-6 bg-gray-900 border-t border-gray-800 flex-shrink-0">
                  <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                          <span className="text-gray-400">Subtotal ({selectedCartItems.length} Items)</span>
                          <span className="text-white font-semibold">₱{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-400">Shipping Fee</span>
                          <span className="text-white font-semibold">₱{shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg pt-2 border-t border-gray-700">
                          <span className="text-white font-bold">Total</span>
                          <span className="text-yellow-500 font-bold">₱{total.toFixed(2)}</span>
                      </div>
                  </div>
                  <button
                      onClick={() => onNavigate('checkout', { 
                          total, 
                          subtotal, 
                          shipping, 
                          selectedItems: selectedCartItems // Pass only selected items
                      })}
                      disabled={selectedCartItems.length === 0 || loading}
                      className={`w-full py-3 rounded-lg text-black font-bold uppercase transition duration-150 ${
                          selectedCartItems.length === 0 || loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
                      }`}
                  >
                      {loading ? <Loader className="mr-2" /> : `CHECKOUT (${selectedCartItems.length})`}
                  </button>
              </div>
          </div>
      );
  };

  /**
   * NEW: My Orders Screen Component
   * Fetches and displays a list of the user's past orders.
   */
// Assume 'supabase', 'NavHeader', 'Loader', and 'ShoppingBag' are imported and available in the scope.
// You may need to replace these imports based on your actual project structure.
 const OrderHistoryScreen = ({ user, onNavigate, cartItemCount }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchOrders(user.id);
        } else {
            setLoading(false);
            setError("Please log in to view your My Orders.");
        }
    }, [user]);

    const fetchOrders = async (userId) => {
        if (!supabase) {
            setError('Supabase not initialized. Cannot fetch orders.');
            setLoading(false);
            return;
        }

        try {
            // Fetch orders for the current user, ordered by creation date (newest first)
            // It joins 'orders' with 'order_items' (which should be created on checkout)
            // and then joins to 'products' to get the product name and image_path.
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    id,
                    status,
                    created_at,
                    total_amount,
                    order_items (
                        quantity,
                        products  ( name, image_path, color )
                    )
                `)
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data);
        } catch (err) {
            console.error('Error fetching orders:', err.message);
            setError(`Failed to load My Orders: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to determine status color
    const getStatusColor = (status) => {
        const lowerStatus = status ? status.toLowerCase() : '';
        switch (lowerStatus) {
            case 'delivered':
                return 'text-green-400';
            case 'shipped':
            case 'processing':
                return 'text-blue-400';
            case 'cancelled':
            case 'failed':
                return 'text-red-500';
            case 'pending':
            default:
                return 'text-yellow-500';
        }
    };

    // Helper function to render the list of items in an order with images
    const renderOrderItems = (orderItems) => {
        if (!orderItems || orderItems.length === 0) return <p>No items found.</p>;
        return (
            <ul className="space-y-2">
                {orderItems.map((item, index) => {
                    const imageUrl = getPublicProductImageUrl(item.products.image_path);
                    return (
                        <li key={index} className="flex items-center space-x-2">
                            {/* Image - Conditional Display */}
                            {imageUrl ? (
                                <img 
                                    src={imageUrl}
                                    alt={item.products.name}
                                    className="w-8 h-8 object-cover rounded"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/555/FFF?text=Image+Missing"; }}
                                />
                            ) : (
                                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs">
                                    [No Image]
                                </div>
                            )}
                            <span className="text-sm text-gray-300">{item.quantity}x {item.products.name}</span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const OrderCard = ({ order }) => (
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg mb-4">
            <div className="flex justify-between items-start mb-2">
                <span className="text-yellow-500 font-bold text-xl">₱{parseFloat(order.total_amount).toFixed(2)}</span>
            </div>
            
            {/* Display status with dynamic color */}
            <p className="text-sm font-semibold mb-2">
                Status: <span className={getStatusColor(order.status)}>{order.status || 'Unknown'}</span>
            </p>

            <p className="text-sm text-gray-400 mb-2">
                Date: {new Date(order.created_at).toLocaleDateString()}
            </p>
            
            <div className="text-sm text-gray-300">
                <strong>Items:</strong>
                {renderOrderItems(order.order_items)}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-black text-white">
            <NavHeader currentScreen="orders" onNavigate={onNavigate} user={user} cartItemCount={cartItemCount} />
            <div className="p-6 flex-grow overflow-y-auto">
                <h1 className="text-3xl font-extrabold text-white mb-6">My Orders</h1>

                {loading && (
                    <div className="flex justify-center items-center h-48">
                        <Loader className="w-8 h-8" />
                        <p className="ml-2 text-yellow-500">Loading Orders...</p>
                    </div>
                )}
                
                {error && <p className="text-red-500 text-center">{error}</p>}

                {!loading && orders.length === 0 && !error && (
                    <div className="flex flex-col items-center justify-center p-10 bg-gray-900 rounded-xl">
                        <ShoppingBag className="w-12 h-12 text-gray-500 mb-4" />
                        <p className="text-lg text-gray-400">You have no past orders.</p>
                        <button
                            onClick={() => onNavigate('shop')}
                            className="mt-4 py-2 px-4 rounded-lg bg-yellow-600 text-black font-bold hover:bg-yellow-500 transition"
                        >
                            Start Shopping
                        </button>
                    </div>
                )}

                {!loading && orders.length > 0 && (
                    <div>
                        {orders.map(order => <OrderCard key={order.id} order={order} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

  /**
   * NEW: Checkout Screen Component (Shopee-like Flow)
   */
 // --- ASSUMED UTILITY FUNCTION (Defined outside the component) ---
// const getPublicProductImageUrl = (imagePath) => {
//     if (!supabase || !imagePath) return null;
//     const { data } = supabase.storage.from(PRODUCT_BUCKET_NAME).getPublicUrl(imagePath);
//     return data?.publicUrl || null;
// };
// ----------------------------------------------------------------

// --- ASSUMED UTILITY FUNCTION (Defined outside the component) ---
// const getPublicProductImageUrl = (imagePath) => {
//     if (!supabase || !imagePath) return null;
//     const { data } = supabase.storage.from(PRODUCT_BUCKET_NAME).getPublicUrl(imagePath);
//     return data?.publicUrl || null;
// };
// ----------------------------------------------------------------

const CheckoutScreen = ({ onNavigate, user, orderSummary, placeOrder }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    // State to manage the single selection. Initialized to the only available method.
    const [selectedPayment, setSelectedPayment] = useState('COD');
    
    // Retrieve the items selected for checkout from the orderSummary parameter
    const itemsToCheckout = orderSummary?.selectedItems || [];

    useEffect(() => {
        fetchProfile();
    }, [user]);

    const fetchProfile = async () => {
        if (!supabase || !user) { setLoading(false); return; }
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('full_name, address, phone ')
                .eq('id', user.id)
                .single();

            if (error) throw error;
            setProfile(data);
        } catch (error) {
            console.error("Error fetching profile:", error.message);
            onNavigate('message', { message: 'Failed to load profile details for checkout.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) {
        return (
            <div className="flex flex-col h-full bg-black text-white p-6 items-center justify-center">
                <Loader className="w-8 h-8" />
                <p className="mt-2 text-gray-400">Loading Checkout...</p>
            </div>
        );
    }
    
    const isAddressMissing = !profile || !profile.address;

    return (
        <div className="flex flex-col h-full bg-black text-white">
            <div className="p-4 flex items-center bg-gray-900 border-b border-gray-800 flex-shrink-0">
                <button onClick={() => onNavigate('cart')} className="text-white hover:text-yellow-500 transition">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-white ml-4">CHECKOUT</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {/* 1. Shipping Address */}
                <div className="bg-gray-800 p-4 rounded-xl shadow-lg border-l-4 border-yellow-500">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold text-white flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-yellow-500" /> Shipping Address
                        </h2>
                        <button 
                            onClick={() => onNavigate('profile')}
                            className="text-xs text-yellow-500 font-semibold hover:text-yellow-400"
                        >
                            {isAddressMissing ? 'ADD ADDRESS' : 'CHANGE'}
                        </button>
                    </div>
                    {isAddressMissing ? (
                        <p className="text-red-400 text-sm">⚠️ Please go to your profile to set a shipping address.</p>
                    ) : (
                        <div>
                            <p className="font-bold text-gray-300">{profile.full_name || 'User'}</p>
                            <p className="text-sm text-gray-400">{profile.phone}</p>
                            <p className="text-sm text-gray-300">{profile.address}</p>
                        </div>
                    )}
                </div>

                {/* 2. Order List - FIXED SECTION */}
                <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
                    <h2 className="text-lg font-semibold text-white mb-3">Order Items ({itemsToCheckout.length})</h2>
                    {itemsToCheckout.map(item => {
                        // FIX: Use the correct product image path property and utility function
                        const imageUrl = getPublicProductImageUrl(item.products?.image_path);
                        
                        return (
                            <div key={`${item.product_id}-${item.size}`} className="flex justify-between items-center text-sm py-2 border-b border-gray-700 last:border-b-0">
                                <div className="flex items-center space-x-3">
                                    {/* Product Image - Conditional display with fallback */}
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={item.products.name}
                                            className="w-12 h-12 object-cover rounded-md border border-gray-700 flex-shrink-0"
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/555/FFF?text=Image+Missing"; }}
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-700 rounded-md border border-gray-700 flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">
                                            [No Image]
                                        </div>
                                    )}

                                    {/* Product Details */}
                                    <div className="flex flex-col">
                                        <span className="text-gray-100 font-medium truncate max-w-[180px]">{item.products.name}</span>
                                        <div className="flex text-xs text-gray-400">
                                            <span>Size: <span className="text-yellow-500">{item.size}</span></span>
                                            {item.products.color && (
                                                <>
                                                    <span className="mx-2">•</span>
                                                    <span>Color: {item.products.color}</span>
                                                </>
                                            )}
                                            <span className="ml-2">x{item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="font-semibold text-white">₱{(item.products.price * item.quantity).toFixed(2)}</span>
                            </div>
                        );
                    })}
                </div>

                {/* 3. Payment Method */}
                <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
                    <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-yellow-500" /> Payment Method
                    </h2>
                    <div className="flex flex-col space-y-2">
                        {/* Option 1: COD (Available) - Note: The name="payment" attribute ensures only one radio button is selected */}
                        <label 
                            className={`flex items-center text-sm text-gray-300 p-2 rounded-lg cursor-pointer transition ${
                                selectedPayment === 'COD' ? 'bg-yellow-800/50 border border-yellow-500' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value="COD"
                                checked={selectedPayment === 'COD'}
                                onChange={() => setSelectedPayment('COD')}
                                className="form-radio h-4 w-4 text-yellow-500 bg-gray-600 border-gray-500 focus:ring-yellow-500 transition"
                            />
                            <span className="ml-3">Cash on Delivery (COD)</span>
                            {selectedPayment === 'COD' && <Check className="w-5 h-5 text-yellow-500 ml-auto" />}
                        </label>

                        {/* Option 2: Card (Unavailable) */}
                        <label className="flex items-center text-sm text-gray-300 p-2 bg-gray-700 rounded-lg opacity-50 cursor-not-allowed">
                            <input
                                type="radio"
                                name="payment"
                                value="Card"
                                disabled
                                checked={selectedPayment === 'Card'} // Should always be false
                                onChange={() => setSelectedPayment('Card')} // Won't fire, but included for completeness
                                className="form-radio h-4 w-4 text-yellow-500 bg-gray-600 border-gray-500 focus:ring-yellow-500 transition"
                            />
                            <span className="ml-3">Credit/Debit Card (Unavailable)</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* 4. Order Summary Footer - FIXED BUTTON LOGIC */}
            <div className="p-4 bg-gray-900 border-t border-gray-800 flex-shrink-0">
                <div className="space-y-1 text-sm mb-3">
                    <div className="flex justify-between text-gray-400"><span>Order Total</span><span>₱{orderSummary.subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-gray-400"><span>Shipping Fee</span><span>₱{orderSummary.shipping.toFixed(2)}</span></div>
                    <div className="flex justify-between text-lg pt-2 border-t border-gray-700">
                        <span className="text-white font-bold">TOTAL PAYMENT</span>
                        <span className="text-yellow-500 font-bold">₱{orderSummary.total.toFixed(2)}</span>
                    </div>
                </div>
                <button
                    // FIX: Make the onClick handler async, await placeOrder, and navigate upon success.
                    onClick={async () => {
                        const success = await placeOrder(
                            orderSummary.total, 
                            profile.address, 
                            selectedPayment,
                            itemsToCheckout
                        );
                        // Check for successful order placement (assuming 'placeOrder' returns a truthy value on success)
                        if (success) {
                            onNavigate('orderHistory'); // Navigate to the OrderHistoryScreen
                        }
                    }}
                    disabled={isAddressMissing || itemsToCheckout.length === 0}
                    className={`w-full py-3 rounded-lg text-black font-bold uppercase transition duration-150 ${
                        isAddressMissing || itemsToCheckout.length === 0 ? 'bg-red-600 cursor-not-allowed text-white' : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                >
                    {isAddressMissing ? 'ADDRESS REQUIRED' : 'PLACE ORDER'}
                </button>
            </div>
        </div>
    );
};
// --- EXISTING SCREENS (with minor updates) ---

/**
 * Home Screen Component 
 */
const HomeScreen = ({ onNavigate, cartItemCount, user }) => {
    return (
        <div className="flex flex-col h-full bg-black text-white">
             <NavHeader currentScreen="home" onNavigate={onNavigate} user={user} cartItemCount={cartItemCount} />
             <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                 <div className="p-8 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
                     <Home className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                     <h1 className="text-4xl font-extrabold text-white mb-2">EVO HELMETS</h1>
                     <p className="text-gray-400 mb-6">Your destination for premium motorcycle gear.</p>
                     <button
                         onClick={() => onNavigate('shop')}
                         className="w-full py-3 px-4 rounded-lg bg-yellow-500 text-black font-bold uppercase hover:bg-yellow-600 transition duration-150"
                     >
                         START SHOPPING
                     </button>
                     <button
                         onClick={() => onNavigate('about')}
                         className="w-full py-3 px-4 rounded-lg bg-gray-700 text-white font-bold uppercase hover:bg-gray-600 transition duration-150 mt-3"
                     >
                         Learn About Us
                     </button>
                 </div>
             </div>
        </div>
    );
};

 const AboutScreen = ({ onNavigate, cartItemCount, user }) => {
    return (
          <div className="flex flex-col h-full bg-black text-white">
             <NavHeader currentScreen="about" onNavigate={onNavigate} user={user} cartItemCount={cartItemCount} />
              <div className="flex-grow p-6 overflow-y-auto">
                 
                  
                  <h2 className="text-2xl font-bold text-white mb-3 mt-6">Contact</h2>
                  <div className="space-y-2 text-gray-300">
                      <p className="flex items-center"><Mail className="w-5 h-5 mr-2 text-yellow-500"/> support@evohelmets.com</p>
                      <p className="flex items-center"><Phone className="w-5 h-5 mr-2 text-yellow-500"/> +1 (555) 123-4567</p>
                  </div>

                  <div className="mt-8 text-center">
                      <button
                          onClick={() => onNavigate('shop')}
                          className="py-3 px-6 rounded-lg bg-yellow-500 text-black font-bold uppercase hover:bg-yellow-600 transition duration-150"
                      >
                          Browse Products
                      </button>
                  </div>
              </div>
          </div>
      );
  };
  /**
   * Login Screen Component
   */
  const LoginScreen = ({ onNavigate, onLogin }) => {
      const [formData, setFormData] = useState({ email: "", password: "", remember: false });
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!supabase) {
          onNavigate('message', { message: 'Supabase is not initialized. Check your environment configuration and ensure the CDN script is loaded.', type: 'error' });
          return;
        }
        setLoading(true);

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });
          if (error) throw error;
          
          onLogin(data.user); // Navigate to 'profile'

        } catch (error) {
          console.error('Login Error:', error.message);
          onNavigate('message', { message: error.message || 'Login failed. Please check your credentials.', type: 'error' });
        } finally {
          setLoading(false);
        }
      };
      return (
        <div className="flex flex-col h-full bg-black">
          <div className="p-6 bg-yellow-600 rounded-b-[4rem] text-black">
            <button onClick={() => onNavigate('onboarding')} className="text-black hover:text-gray-200 transition">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-extrabold text-black mt-8">ENJOY SHOPPING</h2>
            <p className="text-sm font-medium text-gray-900 mb-8">Get your Helmet</p>
          </div>

          <div className="flex-grow p-6 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-6">LOGIN</h3>
              
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
              />
              <InputField
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
              />

              <div className="flex items-center justify-between mb-8 text-sm">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="h-4 w-4 text-yellow-500 border-gray-600 rounded focus:ring-yellow-500 bg-gray-700"
                  />
                  <label htmlFor="remember" className="ml-2 block text-gray-400">
                    Save Password
                  </label>
                </div>
                <a href="#" className="font-medium text-yellow-500 hover:text-yellow-400">
                  Forget Password
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg text-black font-bold uppercase transition duration-150 ${
                  loading ? 'bg-yellow-700 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
                } flex items-center justify-center`}
              >
                {loading ? <Loader className="mr-2" /> : 'LOGIN NOW'}
              </button>
            </form>

            <div className="text-center text-sm mt-8 pb-4">
              <p className="text-gray-400">
                Don't have an Account click{' '}
                <span
                  onClick={() => onNavigate('signup')}
                  className="font-bold text-yellow-500 cursor-pointer hover:text-yellow-400"
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      );
    };
  /**
   * Sign Up Screen Component
   */
  const SignupScreen = ({ onNavigate, onSignup }) => {
      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        username: "",
        phone: "",
        email: "",
        password: "",
      });
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!supabase) {
          onNavigate('message', { message: 'Supabase is not initialized. Check your environment configuration and ensure the CDN script is loaded.', type: 'error' });
          return;
        }
        setLoading(true);

        const full_name = `${formData.firstName} ${formData.lastName}`.trim();
        try {
          // 1. Sign up the user with email/password
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: { // Optional data passed to the trigger (handle_new_user)
                full_name: full_name,
                username: formData.username
              }
            }
          });
          if (authError) throw authError;

          // Check if user was successfully created (supabase.auth.signUp returns user only if auto-confirmed, or session if session created)
          const user = authData.user ||
          authData.session?.user;
          if (!user) {
            // This case handles users created but waiting for email confirmation
            onNavigate('message', {
              message: 'Success! Please check your email for a confirmation link to complete registration.',
              type: 'success'
            });
            return;
          }
          
          // 2. Update the 'profiles' table with remaining data (age, phone)
          // The SQL trigger automatically created the profile row.
          // Now we update it.
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              age: parseInt(formData.age),
              phone: formData.phone,
              full_name: full_name,
            })
            .eq('id', user.id);
          if (updateError) throw updateError;
          
          onSignup(user); // Navigate to 'profile'

        } catch (error) {
          console.error('Signup Error:', error.message);
          onNavigate('message', { message: error.message || 'Registration failed.', type: 'error' });
        } finally {
          setLoading(false);
        }
      };
      return (
        <div className="flex flex-col h-full bg-black">
          <div className="p-6 bg-yellow-600 rounded-b-[4rem] text-black">
            <button onClick={() => onNavigate('login')} className="text-black hover:text-gray-200 transition">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-extrabold text-black mt-8">ENJOY SHOPPING</h2>
            <p className="text-sm font-medium text-gray-900 mb-8">Get your Helmet</p>
          </div>

          <div className="flex-grow p-6 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-6">SIGNUP</h3>
              
              {/* Row 1: Name Fields */}
              <div className="flex space-x-4 mb-4">
                <input
                  name="firstName"
                  type="text"
                  placeholder="Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="flex-1 rounded-lg border-0 bg-gray-700 py-3 pl-4 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:bg-gray-800 transition duration-150 sm:text-sm"
                />
                  <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="flex-1 rounded-lg border-0 bg-gray-700 py-3 pl-4 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:bg-gray-800 transition duration-150 sm:text-sm"
                />
              </div>

              {/* Row 2: Age, Username */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <InputField
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    icon={Cake}
                    required
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    icon={User}
                    required
                />
                </div>
              </div>
              
              {/* Row 3: Phone */}
              <InputField
                name="phone"
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                icon={Phone}
              />
              
              {/* Row 4: Email */}
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
              />

              {/* Row 5: Password */}
              <InputField
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg text-black font-bold uppercase transition duration-150 ${
                  loading ? 'bg-yellow-700 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
                } flex items-center justify-center`}
              >
                {loading ? <Loader className="mr-2" /> : 'SIGN UP NOW'}
              </button>
            </form>
            
            <div className="text-center text-sm mt-8 pb-4">
              <p className="text-gray-400">
                Already have an Account click{' '}
                <span
                  onClick={() => onNavigate('login')}
                  className="font-bold text-yellow-500 cursor-pointer hover:text-yellow-400"
                >
                  Log In
                </span>
              </p>
            </div>
          </div>
        </div>
      );
    };

  /**
   * Profile Screen Component
   */
const ProfileScreen = ({ user, onNavigate, onLogout, cartItemCount }) => {
      const [profile, setProfile] = useState(null);
      const [loading, setLoading] = useState(true);
      const [isEditing, setIsEditing] = useState(false);
      const [editFormData, setEditFormData] = useState({});

      useEffect(() => { fetchProfile(); }, [user]);

      const fetchProfile = async () => {
        if (!supabase || !user) { setLoading(false); return; }
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name, address, phone, age, username')
            .eq('id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') throw error; // PGRST116 means no row found (new user)

          if (data) {
            setProfile(data);
            setEditFormData(data); // Initialize form data with current profile
          }

        } catch (error) {
          console.error("Error fetching profile:", error.message);
          onNavigate('message', { message: 'Failed to load profile details.', type: 'error' });
        } finally {
          setLoading(false);
        }
      };

      const handleEditChange = (e) => { 
        const { name, value } = e.target; 
        setEditFormData(prev => ({ ...prev, [name]: value }));
      };
      
      const handleSaveProfile = async () => {
        if (!supabase || !user) return;
        setLoading(true);
        try {
          const { error } = await supabase
            .from('profiles')
            .update({ 
              address: editFormData.address || null, 
              phone: editFormData.phone || null,
            })
            .eq('id', user.id);

          if (error) throw error;
          await fetchProfile(); // Re-fetch to update state
          setIsEditing(false);
          onNavigate('message', { message: 'Profile successfully updated!', type: 'success' });
        } catch (error) {
          console.error('Error saving profile:', error.message);
          onNavigate('message', { message: error.message || 'Failed to save profile.', type: 'error' });
        } finally {
          setLoading(false);
        }
      };

      const ActionButton = ({ onClick, children, className = '' }) => (
        <button 
          onClick={onClick} 
          className={`w-full py-3 px-4 rounded-lg text-black font-bold uppercase transition duration-150 shadow-md ${className}`}
          disabled={loading} 
        >
          {loading ? <Loader className="mr-2" /> : children}
        </button>
      );

      const buttonClass = 'bg-yellow-500 hover:bg-yellow-600';
      const blackButtonClass = 'bg-gray-800 text-white hover:bg-gray-700 mt-2';
      const mainActionButtonText = isEditing ? 
        (loading ? 'SAVING PROFILE...' : 'SAVE PROFILE') : 'EDIT PROFILE';
      const mainActionButtonClick = isEditing ? handleSaveProfile : () => setIsEditing(true);

      const displayName = profile?.full_name || user.email.split('@')[0].toUpperCase() || 'USER';

      return (
        <div className="flex flex-col h-full bg-black text-white">
          {/* Top Header/Navbar - Now using reusable component */}
          <NavHeader 
    currentScreen="profile" 
    onNavigate={onNavigate} 
    user={user} 
    cartItemCount={cartItemCount} 
/>

          {/* Profile Section */}
          <div className="p-6 bg-yellow-600 rounded-b-[4rem] flex-shrink-0 relative">
            <div className="absolute top-0 left-0 w-full h-full rounded-b-[4rem] opacity-30" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
            <div className="flex flex-col items-center relative z-10 pt-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full border-4 border-white mb-3 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-black uppercase">{displayName}</h2>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow p-6 overflow-y-auto">
            <div className="space-y-4">

              {/* Address Field */}
              <div className="text-sm font-semibold text-gray-400">ADDRESS</div>
              {isEditing ? (
                <InputField 
                  name="address" 
                  placeholder="Add New Address" 
                  value={editFormData.address || ''} 
                  onChange={handleEditChange} 
                  icon={MapPin} 
                  isTextArea={true}
                  required={false} 
                />
              ) : (
                <p className="text-white text-lg font-medium">{profile?.address || 'Add Address'}</p>
              )}

              {/* Phone Field */}
              <div className="text-sm font-semibold text-gray-400 pt-4">PHONE NUMBER</div>
              {isEditing ? (
                <InputField 
                  name="phone" 
                  placeholder="Add Phone Number" 
                  value={editFormData.phone || ''} 
                  onChange={handleEditChange} 
                  icon={Phone} 
                  required={false} 
                />
              ) : (
                <p className="text-white text-lg font-medium">{profile?.phone || 'Add Phone'}</p>
              )}
            </div>

            {/* Action Buttons (Figma-inspired) */}
            <div className="mt-8 space-y-2">
              <ActionButton onClick={() => onNavigate('cart')} className={blackButtonClass}> 
                  IN CART ({cartItemCount})
              </ActionButton>
              <ActionButton onClick={() => onNavigate('orders')} className={blackButtonClass}> 
                  My Orders
              </ActionButton>
              <ActionButton onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white !mt-4"> 
                  LOG OUT 
              </ActionButton>
            </div>
          </div>

          {/* Bottom Save/Edit Button */}
          <div className="p-6 pt-0 flex-shrink-0">
            <ActionButton onClick={mainActionButtonClick} className={buttonClass}>
              {mainActionButtonText}
            </ActionButton>
          </div>
        </div>
      );
    };
  /**
   * Welcome Screens Component (Onboarding)
   */
  const OnboardingScreen = ({ onNavigate }) => {
      const [step, setStep] = useState(1);
      const totalSteps = 3;
      const handleNext = () => {
        if (step < totalSteps) {
          setStep(step + 1);
        }
      };
      const handleStart = () => {
        onNavigate('login');
      };
      const ScreenContent = ({ action }) => (
        <div className="flex flex-col h-full bg-black text-white p-6">
          <div className="flex-grow flex items-center justify-center">
            {/* Placeholder for the EVO Helmet image */}
            <div className="w-full max-w-sm">
              <img src={`https://placehold.co/600x400/1f2937/ffffff?text=EVO+Helmet+${step}`} alt="EVO Helmet" className="w-full h-auto object-contain rounded-xl shadow-lg" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/000000/FFFFFF?text=EVO+HELMETS"; }} />
              {step === 3 && (
                <div className="mt-8 text-center">
                  <h2 className="text-3xl font-extrabold text-white">FULL FACE</h2>
                  <p className="text-sm text-gray-400 mt-2">Maximum protection and style.</p>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-2 mt-4">
              {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className={`h-2 w-2 rounded-full transition-all duration-300 
                  ${ index + 1 === step ? 'bg-yellow-500 w-6' : 'bg-gray-700' }`} />
              ))}
            </div>
          </div>
          {action === 'next' ?
          (
            <button onClick={handleNext} className="w-full py-3 px-4 rounded-lg bg-yellow-500 text-black font-bold uppercase hover:bg-yellow-600 transition duration-150" >
              NEXT
            </button>
          ) : (
            <button onClick={handleStart} className="w-full py-3 px-4 rounded-lg bg-yellow-500 text-black font-bold uppercase hover:bg-yellow-600 transition duration-150" >
              START
            </button>
          )}
        </div>
      );
      return (
        <div className="h-full">
          {step === 1 && <ScreenContent action="next" />}
          {step === 2 && <ScreenContent action="next" />}
          {step === 3 && <ScreenContent action="start" />}
        </div>
      );
    };
  /**
   * Main Application Component
   */
  const App = () => {
      const [screen, setScreen] = useState('onboarding');
      const [user, setUser] = useState(null);
      const [message, setMessage] = useState(null);
      const [cartItems, setCartItems] = useState([]); // All items in the cart
      const [selectedCartItems, setSelectedCartItems] = useState([]); // Items selected for checkout (NEW STATE)
      const [cartLoading, setCartLoading] = useState(false);
      const [orderSummary, setOrderSummary] = useState(null); // Used to pass data to CheckoutScreen

      // --- CART LOGIC ---
      
      const fetchCartItems = async (userId) => {
          if (!supabase || !userId) return;
          setCartLoading(true);
          try {
              const { data, error } = await supabase
                  .from('cart_items')
                  .select(`
                      product_id,
                      quantity,
                      size,
                      products ( id, name, price, image_path, color )
                  `)
                  .eq('user_id', userId);

              if (error) throw error;
              setCartItems(data || []);
              // Only update selected items if all items were previously selected or if the cart was empty
              if (selectedCartItems.length === cartItems.length) {
                  setSelectedCartItems(data || []); 
              } else {
                  // If only a subset was selected, re-filter the selection against the new cart items.
                  // This preserves specific unselected items during a quantity change/fetch.
                  setSelectedCartItems(prevSelected => {
                      const newKeys = (data || []).map(item => `${item.product_id}-${item.size}`);
                      return (data || []).filter(item => 
                          prevSelected.some(pItem => 
                              pItem.product_id === item.product_id && pItem.size === item.size
                          )
                      );
                  });
              }
          } catch (e) {
              console.error('Error fetching cart:', e.message);
              handleNavigate('message', { message: 'Failed to load cart items.', type: 'error' });
              setCartItems([]);
              setSelectedCartItems([]);
          } finally {
              setCartLoading(false);
          }
      };
      
      // Function to toggle selection for a single item
      const toggleItemSelection = (productId, size) => {
          const key = `${productId}-${size}`;
          const itemToToggle = cartItems.find(item => `${item.product_id}-${item.size}` === key);
      
          if (!itemToToggle) return;
      
          setSelectedCartItems(prev => {
              const isSelected = prev.some(item => `${item.product_id}-${item.size}` === key);
      
              if (isSelected) {
                  // Deselect
                  return prev.filter(item => `${item.product_id}-${item.size}` !== key);
              } else {
                  // Select
                  return [...prev, itemToToggle];
              }
          });
      };
      
      // Function to select/deselect all items
      const toggleSelectAll = (checked) => {
          if (checked) {
              setSelectedCartItems(cartItems);
          } else {
              setSelectedCartItems([]);
          }
      };

      // New signature includes size
      const handleAddToCart = async (product, size, initialQuantity = 1) => {
          if (!supabase || !user) {
              handleNavigate('message', { message: 'Please log in to add items to your cart.', type: 'error' });
              return;
          }

          const existingItem = cartItems.find(item => item.product_id === product.id && item.size === size);
          const newQuantity = existingItem ? existingItem.quantity + initialQuantity : initialQuantity;
          
          // Prevents adding if quantity is 0 (shouldn't happen with current UI, but safe guard)
          if (newQuantity <= 0) return;

          setCartLoading(true);
          try {
              const { error } = await supabase
                  .from('cart_items')
                  .upsert({ 
                      user_id: user.id, 
                      product_id: product.id, 
                      size: size,
                      quantity: newQuantity 
                  }, { 
                      onConflict: 'user_id, product_id, size', // Specify the composite key for UPSERT
                      ignoreDuplicates: false 
                  });

              if (error) throw error;
              // Re-fetch automatically handles selected items logic inside fetchCartItems
              await fetchCartItems(user.id); 
              handleNavigate('message', { message: `${product.name} (${size}) added to cart!`, type: 'success' });
          } catch (e) {
              console.error('Error adding to cart:', e.message);
              handleNavigate('message', { message: 'Failed to add item to cart.', type: 'error' });
          } finally {
              setCartLoading(false);
          }
      };

      /**
       * CORRECTED LOGIC: Updates only the item matching user_id, product_id, AND size.
       */
      const handleUpdateQuantity = async (productId, size, newQuantity) => {
          if (newQuantity <= 0) {
              handleRemoveFromCart(productId, size);
              return;
          }

          setCartLoading(true);
          try {
              const { error } = await supabase
                  .from('cart_items')
                  .update({ quantity: newQuantity })
                  .eq('user_id', user.id)
                  .eq('product_id', productId)
                  .eq('size', size); // <--- ENSURES ONLY THE SELECTED ITEM IS MODIFIED

              if (error) throw error;
              await fetchCartItems(user.id);
          } catch (e) {
              console.error('Error updating cart quantity:', e.message);
              handleNavigate('message', { message: 'Failed to update item quantity.', type: 'error' });
          } finally {
              setCartLoading(false);
          }
      };

      // New signature includes size
      const handleRemoveFromCart = async (productId, size) => {
          setCartLoading(true);
          try {
              const { error } = await supabase
                  .from('cart_items')
                  .delete()
                  .eq('user_id', user.id)
                  .eq('product_id', productId)
                  .eq('size', size);

              if (error) throw error;
              await fetchCartItems(user.id);
              handleNavigate('message', { message: 'Item removed from cart.', type: 'success' });
          } catch (e) {
              console.error('Error removing from cart:', e.message);
              handleNavigate('message', { message: 'Failed to remove item from cart.', type: 'error' });
          } finally {
              setCartLoading(false);
          }
      };
      
      // --- CHECKOUT LOGIC ---

      // Updated signature to accept the list of items to checkout
      const handlePlaceOrder = async (totalAmount, shippingAddress, paymentMethod, itemsToCheckout) => {
          if (!supabase || !user || itemsToCheckout.length === 0) {
              handleNavigate('message', { message: 'Cannot place order: No items selected for checkout.', type: 'error' });
              return;
          }

          setCartLoading(true); // Reuse cart loading state for checkout
          try {
              // 1. Create the new order in the 'orders' table
              const { data: orderData, error: orderError } = await supabase
                  .from('orders')
                  .insert({
                      user_id: user.id,
                      total_amount: totalAmount,
                      shipping_address: shippingAddress,
                      payment_method: paymentMethod,
                      status: 'Pending'
                  })
                  .select('id')
                  .single();

              if (orderError) throw orderError;
              const newOrderId = orderData.id;

              // 2. Prepare order items for batch insert into 'order_items'
              const orderItems = itemsToCheckout.map(item => ({
                  order_id: newOrderId,
                  product_id: item.product_id,
                  quantity: item.quantity,
                  product_size: item.size,
                  price_at_purchase: item.products.price // Record the price at the time of order
              }));

              const { error: itemsError } = await supabase
                  .from('order_items')
                  .insert(orderItems);

              if (itemsError) throw itemsError;

              // 3. Clear ONLY the selected items from the user's cart
              const deletePromises = itemsToCheckout.map(item => 
                  supabase.from('cart_items')
                          .delete()
                          .eq('user_id', user.id)
                          .eq('product_id', item.product_id)
                          .eq('size', item.size)
              );
              
              const deleteResults = await Promise.all(deletePromises);
              const deleteError = deleteResults.find(res => res.error)?.error;
              if (deleteError) throw deleteError;


              // 4. Update state and show success - Re-fetch cart to get remaining items
              await fetchCartItems(user.id); // This updates cartItems and re-syncs selection
              
              handleNavigate('message', { 
                  message: `Order #${newOrderId.substring(0, 8)} successfully placed! Thank you for shopping with EVO.`, 
                  type: 'success' 
              });

          } catch (e) {
              console.error('Order Placement Error:', e.message);
              handleNavigate('message', { message: e.message || 'Failed to place order. Please try again.', type: 'error' });
          } finally {
              setCartLoading(false);
          }
      };


      // --- NAVIGATION & AUTH LOGIC ---

      const handleNavigate = (newScreen, params = {}) => {
          if (newScreen === 'message') {
              setMessage(params);
          } else if (newScreen === 'checkout') {
              setOrderSummary(params);
              setScreen('checkout');
          } else {
              setScreen(newScreen);
          }
      };

      const handleAuthSuccess = (authUser) => {
          setUser(authUser);
          fetchCartItems(authUser.id); // Load cart immediately after login/signup
          handleNavigate('profile');
      };

      const handleLogout = () => {
          if (!supabase) return;
          supabase.auth.signOut();
          setCartItems([]);
          setSelectedCartItems([]);
      };
      
      // Check for session on load
      useEffect(() => {
          if (!supabase) {
              setScreen('home'); // Direct to home if no supabase
              return;
          }

          // Check initial session
          supabase.auth.getSession().then(({ data: { session } }) => {
              if (session) {
                  setUser(session.user);
                  fetchCartItems(session.user.id); // Fetch cart for active user
                  setScreen('profile');
              } else {
                  setScreen('home'); // Default authenticated screen is 'home'
              }
          });

          // Listen for auth changes
          const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
              if (event === 'SIGNED_IN' && session) {
                  setUser(session.user);
                  fetchCartItems(session.user.id); // Fetch cart for new session
              } else if (event === 'SIGNED_OUT') {
                  setUser(null);
                  setCartItems([]);
                  setSelectedCartItems([]);
                  setScreen('home');
              }
          });

          return () => {
              authListener?.subscription.unsubscribe();
          };
      }, []);

      let CurrentScreen;
      const cartItemCount = cartItems.length;

      switch (screen) {
          case 'home':
       
        CurrentScreen = <HomeScreen onNavigate={handleNavigate} user={user} cartItemCount={cartItemCount} />;
        break;
    case 'shop':
       
        CurrentScreen = <ShopScreen onNavigate={handleNavigate} user={user} addToCart={handleAddToCart} cartItemCount={cartItemCount} />;
        break;
    case 'about':
        
        CurrentScreen = <AboutScreen onNavigate={handleNavigate} user={user} cartItemCount={cartItemCount} />;
        break;
          case 'login':
              CurrentScreen = <LoginScreen onNavigate={handleNavigate} onLogin={handleAuthSuccess} />;
              break;
          case 'signup':
              CurrentScreen = <SignupScreen onNavigate={handleNavigate} onSignup={handleAuthSuccess} />;
              break;
          case 'profile':
              CurrentScreen = <ProfileScreen user={user} onLogout={handleLogout} onNavigate={handleNavigate} cartItemCount={cartItemCount} />;
              break;
          case 'cart':
              CurrentScreen = <CartScreen 
                  onNavigate={handleNavigate} 
                  cartItems={cartItems} 
                  updateQuantity={handleUpdateQuantity} 
                  removeFromCart={handleRemoveFromCart} 
                  user={user} 
                  selectedCartItems={selectedCartItems}
                  toggleItemSelection={toggleItemSelection}
                  toggleSelectAll={toggleSelectAll}
              />;
              break;
          case 'checkout':
              CurrentScreen = <CheckoutScreen 
                  onNavigate={handleNavigate} 
                  user={user} 
                  orderSummary={orderSummary} 
                  placeOrder={handlePlaceOrder} 
              />;
              break;
          case 'orders': // NEW CASE for My Orders
              CurrentScreen = <OrderHistoryScreen user={user} onNavigate={handleNavigate} cartItemCount={cartItemCount} />;
              break;
          case 'onboarding':
          default:
              CurrentScreen = <OnboardingScreen onNavigate={handleNavigate} />;
              break;
      }

      return (
          <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
              <style>{`
                  /* Import Inter font */
                  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                  body { font-family: 'Inter', sans-serif; }
                  /* Fix for mobile responsiveness */
                  .app-container {
                      width: 100%;
                      max-width: 5000px;
                      height: 800px; /* Simulate a mobile screen height */
                      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
                  }
      
                  @media (max-height: 850px) {
                      .app-container {
                          height: 90vh; /* Adjust height on smaller screens */
                      }
                  }
              `}</style>
              <div className="app-container bg-black rounded-3xl overflow-hidden flex flex-col">
                  {CurrentScreen}
              </div>
              <MessageModal 
                  message={message?.message} 
                  type={message?.type} 
                  onClose={() => setMessage(null)} 
              />
          </div>
      );
  };
  export default App;
