import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/cart-context';

interface QuantityControllerProps {
  productId: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact';
  onStopPropagation?: boolean;
}

export const QuantityController: React.FC<QuantityControllerProps> = ({
  productId,
  size = 'md',
  variant = 'default',
  onStopPropagation = true,
}) => {
  const { cart, addToCart, updateQuantity, getCartItemQuantity } = useCart();
  
  const quantity = getCartItemQuantity(productId);
  const isInCart = quantity > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (onStopPropagation) {
      e.stopPropagation();
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    handleClick(e);
    if (isInCart) {
      updateQuantity(productId, quantity + 1);
    } else {
      addToCart(productId);
    }
  };

  const handleSubtract = (e: React.MouseEvent) => {
    handleClick(e);
    updateQuantity(productId, quantity - 1);
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      button: 'w-6 h-6 text-xs',
      text: 'w-8 text-xs',
      padding: 'p-0.5',
    },
    md: {
      button: 'w-8 h-8 text-sm',
      text: 'w-10 text-sm',
      padding: 'p-1',
    },
    lg: {
      button: 'w-10 h-10 text-base',
      text: 'w-12 text-base',
      padding: 'p-1.5',
    },
  };

  const config = sizeConfig[size];

  if (!isInCart) {
    // Show Add button when not in cart
    return (
      <button
        onClick={handleAdd}
        className={`${config.button} ${config.padding} rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center font-semibold`}
      >
        <Plus className="w-4 h-4" />
      </button>
    );
  }

  // Show quantity controller when in cart
  if (variant === 'compact') {
    return (
      <div 
        className={`flex items-center gap-1 bg-primary/10 rounded-lg ${config.padding}`}
        onClick={handleClick}
      >
        <button
          onClick={handleSubtract}
          className={`${config.button} rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center font-semibold`}
        >
          -
        </button>
        <span className={`${config.text} text-center font-semibold text-foreground`}>
          {quantity}
        </span>
        <button
          onClick={handleAdd}
          className={`${config.button} rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center font-semibold`}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center gap-2 bg-primary/10 rounded-lg ${config.padding}`}
      onClick={handleClick}
    >
      <button
        onClick={handleSubtract}
        className={`${config.button} rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center font-semibold`}
      >
        -
      </button>
      <span className={`${config.text} text-center font-semibold text-foreground`}>
        {quantity}
      </span>
      <button
        onClick={handleAdd}
        className={`${config.button} rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center font-semibold`}
      >
        +
      </button>
    </div>
  );
};
