import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Cart from "./cart";
import OrderConfirmation from "./order-confirmation";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed top-4 right-4 z-50"
          >
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 rounded-full"
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Cart onOrderComplete={() => setIsOrderComplete(true)} />
        </SheetContent>
      </Sheet>
      {children}
      <OrderConfirmation
        isOpen={isOrderComplete}
        onClose={() => setIsOrderComplete(false)}
      />
    </>
  );
}
