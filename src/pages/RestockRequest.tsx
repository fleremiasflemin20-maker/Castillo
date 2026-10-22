import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useInventory } from '../hooks';

export function RestockRequest() {
  const navigate = useNavigate();
  const { inventory, lowStockItems } = useInventory();
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev[itemId]) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: lowStockItems.find(i => i.id === itemId)?.minStock || 10 };
    });
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty > 0) {
      setSelectedItems(prev => ({ ...prev, [itemId]: qty }));
    }
  };

  const totalItems = Object.keys(selectedItems).length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-6 pt-6 pb-32"
    >
      <button onClick={() => navigate('/app/inventory')} className="flex items-center gap-2 text-primary mb-6 hover:underline">
        <ArrowLeft size={20} />
        Back to Inventory
      </button>

      <div className="mb-6">
        <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-1 font-semibold">Supply Management</p>
        <h2 className="font-headline font-bold text-3xl tracking-tight text-on-surface">Restock Request</h2>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-6 mb-6 border-l-4 border-error">
        <div className="flex items-center gap-4">
          <div className="bg-error-container text-on-error-container p-3 rounded-full">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-on-surface text-lg">Low Stock Alert</h3>
            <p className="text-on-surface-variant">
              {lowStockItems.length} items are below critical threshold and need restocking.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {lowStockItems.map((item) => (
          <div 
            key={item.id}
            className={`bg-surface-container-lowest p-5 rounded-xl cursor-pointer transition-all border-2 ${
              selectedItems[item.id] ? 'border-primary' : 'border-transparent hover:border-outline-variant'
            }`}
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                  {item.category}
                </span>
                <h3 className="font-bold text-on-surface mt-2">{item.name}</h3>
                <p className="text-sm text-on-surface-variant">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-error">{item.stock}</p>
                <p className="text-xs text-on-surface-variant">{item.unit} in stock</p>
                <p className="text-xs text-on-surface-variant">Min: {item.minStock}</p>
              </div>
            </div>

            {selectedItems[item.id] && (
              <div className="mt-4 pt-4 border-t border-outline-variant/20" onClick={(e) => e.stopPropagation()}>
                <label className="text-sm text-on-surface-variant mb-2 block">Quantity to order:</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(item.id, (selectedItems[item.id] || 0) - 1)}
                    className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={selectedItems[item.id] || 0}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                    className="w-20 text-center py-2 bg-surface-container rounded-lg font-bold text-lg"
                    min="1"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, (selectedItems[item.id] || 0) + 1)}
                    className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-28 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-surface-container-lowest rounded-xl p-5 shadow-2xl border border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="text-primary" size={24} />
            <div>
              <p className="font-bold text-on-surface">{totalItems} items selected</p>
              <p className="text-sm text-on-surface-variant">
                Total: {Object.values(selectedItems).reduce((a, b) => a + b, 0)} units
              </p>
            </div>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity">
            Submit Restock Request
          </button>
        </div>
      )}
    </motion.div>
  );
}