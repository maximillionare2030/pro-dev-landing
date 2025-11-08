import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const DonationSection = ({ showThankYou }) => {
  const [amount, setAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stripe, setStripe] = useState(null);

  const presetAmounts = [10, 25, 50, 100];

  useEffect(() => {
    // Initialize Stripe
    const initStripe = async () => {
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      if (stripePublicKey) {
        const stripeInstance = await loadStripe(stripePublicKey);
        setStripe(stripeInstance);
      } else {
        setError(
          "Stripe public key not configured. Please check your environment variables."
        );
      }
    };
    initStripe();
  }, []);

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
    setCustomAmount("");
    setError(null);
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && parseFloat(value) > 0)) {
      setCustomAmount(value);
      setAmount(null);
      setError(null);
    }
  };

  const handleDonate = async () => {
    const donationAmount = amount || parseFloat(customAmount);

    if (!donationAmount || donationAmount <= 0) {
      setError("Please select or enter a donation amount.");
      return;
    }

    if (!stripe) {
      setError("Stripe is not loaded. Please refresh the page.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(donationAmount * 100), // Convert to cents
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (redirectError) throw new Error(redirectError.message);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <section
      id="donation-section"
      className="relative py-20 px-6 text-white bg-center bg-cover bg-no-repeat md:bg-fixed"
      style={{
        backgroundImage: "url('/images/ClassPhoto.png')",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      <div className="relative max-w-4xl mx-auto z-10">
        {showThankYou ? (
          <div className="bg-green-500 rounded-lg p-8 mb-8 text-center fade-in">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-3xl font-bold mb-4">
              Thank You for Your Donation!
            </h2>
            <p className="text-lg">
              Your generous contribution will help students access professional
              development opportunities. We appreciate your support!
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center fade-in">
              Make a Donation
            </h2>
            <p className="text-xl text-gray-200 text-center mb-12 fade-in">
              Every contribution makes a difference in a student's professional
              journey.
            </p>
          </>
        )}

        <div className="bg-white rounded-lg p-8 md:p-12 text-gray-900 fade-in shadow-xl">
          <h3 className="text-2xl font-semibold mb-6 text-center text-uci-navy">
            Select Donation Amount
          </h3>

          {/* Preset Amount Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {presetAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                onClick={() => handleAmountSelect(presetAmount)}
                className={`py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  amount === presetAmount
                    ? "bg-uci-gold text-uci-navy shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ${presetAmount}
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="mb-8">
            <label
              htmlFor="custom-amount"
              className="block text-gray-700 font-semibold mb-2"
            >
              Or enter a custom amount:
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                $
              </span>
              <input
                id="custom-amount"
                type="number"
                min="1"
                step="0.01"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-uci-gold"
              />
            </div>
          </div>

          {/* Selected Amount Display */}
          {(amount || customAmount) && (
            <div className="mb-6 p-4 bg-uci-gold/10 rounded-lg text-center">
              <p className="text-gray-700">
                <span className="font-semibold">Donation Amount: </span>
                <span className="text-2xl font-bold text-uci-navy">
                  ${amount || parseFloat(customAmount).toFixed(2)}
                </span>
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            disabled={isLoading || (!amount && !customAmount)}
            className={`w-full py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 ${
              isLoading || (!amount && !customAmount)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-uci-gold hover:bg-yellow-400 text-uci-navy hover:shadow-lg transform hover:scale-105"
            }`}
          >
            {isLoading ? "Processing..." : "Donate Now"}
          </button>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Secure payment powered by Stripe. Your donation is processed safely
            and securely.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
