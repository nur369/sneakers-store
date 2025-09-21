"use client";
import { FaTruck } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    const emptyFields = Object.entries(formData).filter(
      ([_, value]) => value.trim() === ""
    );
    if (emptyFields.length > 0) {
      toast.error("Please fill in all fields before completing the order!");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // معالجة الطلب
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      dispatch(clearCart());
      toast.success("Order completed successfully!");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        router.push("/"); // Redirect to Home
      }, 3000);
    }, 2000);
  };

  return (
    <div className="container my-20 mx-auto px-4 py-10 relative">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Form */}
        <div className="space-y-6">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>City</Label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>State</Label>
              <Input
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Label>ZIP Code</Label>
            <Input
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Name on Card</Label>
            <Input
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Card Number</Label>
            <Input
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Expiry Date</Label>
              <Input
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>CVV</Label>
              <Input
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <Separator />
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between  font-semibold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <Button
                className="w-40 m-5 mt-4"
                onClick={handleSubmit}
                disabled={isProcessing || cartItems.length === 0}
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </Button>
              <Button variant="outline" onClick={() => router.push("/")}>
                Back to Home
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-96 text-center flex flex-col items-center">
            <FaTruck className="text-green-600 w-16 h-16 mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-2">Order Successful!</h2>
            <p className="mb-6 text-gray-700">
              Your products will arrive within 2 days.
            </p>
            <Button
              className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800"
              onClick={() => router.push("/")}
            >
              Go to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
