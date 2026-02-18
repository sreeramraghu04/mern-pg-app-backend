import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const referenceId = searchParams.get("reference");

  return (
    <div className="min-h-screen p-8 bg-blue-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        Payment Page
      </h1>
      <div className="flex items-center justify-center">
        <div className="bg-green-100 p-10 rounded-xl shadow-md max-w-md w-full text-center">
          <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />

          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Payment Success
          </h1>

          <p className="text-gray-500 mb-4">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>

          <div className="bg-green-500 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-500">Reference ID</p>
            <p className="font-mono text-gray-800 break-all">{referenceId}</p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition text-white cursor-pointer"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
