import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { RootState } from '@/store'
import { removeFromCart, updateQuantity } from '@/store/cart-slice'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface CartProps {
  onOrderComplete: () => void
}

export default function Cart({ onOrderComplete }: CartProps) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ScrollArea className="flex-grow">
        <AnimatePresence>
          {cartItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-between items-center mb-2 p-2 border-b"
            >
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                >
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                >
                  +
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-2 text-red-500"
                >
                  Remove
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
      <div className="mt-4 pt-4 border-t">
        <div className="text-xl font-bold mb-4">
          Total: ${total.toFixed(2)}
        </div>
        <Button onClick={onOrderComplete} className="w-full">
          Place Order
        </Button>
      </div>
    </div>
  )
}

