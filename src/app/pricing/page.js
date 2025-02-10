import PageHeaders from "@/components/PageHeaders";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

export default function PricingPage() {
  return (
    <div>
      <PageHeaders
        h1Text={'Check out our pricing'}
        h2Text={'Our pricing is very simple'} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto p-4">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-4 text-center">
          <h3 className="font-bold text-3xl">Free</h3>
          <h4>Free forever</h4>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 text-white mr-2" />
              Basic Features
            </li>
            <li className="flex items-center justify-center">
              <XCircleIcon className="h-5 w-5 text-white mr-2" />
              Limited Support
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg p-4 text-center">
          <h3 className="font-bold text-3xl">Pro</h3>
          <h4>$9.99/month</h4>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 text-white mr-2" />
              All Free Features
            </li>
            <li className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 text-white mr-2" />
              Priority Support
            </li>
            <li className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 text-white mr-2" />
              Advanced Analytics
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-lg p-4 text-center">
          <h3 className="font-bold text-3xl">Enterprise</h3>
          <h4>Contact Us</h4>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 text-white mr-2" />
              All Pro Features
            </li>
            <li className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 text-white mr-2" />
              Dedicated Account Manager
            </li>
            <li className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 text-white mr-2" />
              Custom Integrations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}