import { Search, AlertTriangle, ShoppingCart } from 'lucide-react';
import { useAppData } from '../hooks';

export default function Inventory() {
  const { inventory } = useAppData();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const lowStockItems = inventory.filter(i => i.status === 'critical' || i.status === 'low');
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6 pb-32">
      {lowStockItems.length > 0 && (
        <div className="bg-surface-container-lowest p-5 rounded-xl mb-6 border-l-4 border-error flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-error-container text-on-error-container p-3 rounded-full">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="font-bold text-on-surface">Restock Required</p>
              <p className="text-on-surface-variant text-sm">{lowStockItems.length} items below threshold</p>
            </div>
          </div>
          <button className="bg-error text-on-error px-5 py-2 rounded-xl font-semibold">
            <ShoppingCart size={16} className="inline mr-2" />
            Reorder
          </button>
        </div>
      )}

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
        <input
          className="w-full bg-surface-container pl-12 pr-4 py-3 rounded-xl"
          placeholder="Search supplies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'Cleaning', 'Amenities', 'Linens'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${filter === cat ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInventory.map((item) => (
          <div key={item.id} className="bg-surface-container-lowest p-5 rounded-xl">
            <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-[10px] font-bold uppercase">
              {item.category}
            </span>
            <h3 className="text-lg font-bold text-on-surface mt-2">{item.name}</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">{item.stock} units</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                item.status === 'critical' ? 'bg-error-container text-error' : 'bg-primary-container text-primary'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}