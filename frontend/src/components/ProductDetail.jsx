const product = {
  id: 1,
  name: 'Wireless Headphones',
  image: 'https://via.placeholder.com/300',
  price: 99.99,
  description: 'High-quality wireless headphones with noise cancellation and long battery life.'
};

const ProductDetail = () => (
  <section className="max-w-3xl mx-auto px-4 py-10">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded-xl shadow" />
      <div>
        <h2 className="text-3xl font-bold text-purple-700 mb-2">{product.name}</h2>
        <p className="text-xl text-gray-700 font-semibold mb-4">${product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <button className="px-6 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition">Add to Wishlist</button>
      </div>
    </div>
  </section>
);

export default ProductDetail; 