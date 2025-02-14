"use client"

import { ChevronDownIcon } from "lucide-react"

export default function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="pt-6">
      <dt className="text-lg">
        <button
          className="text-left w-full flex justify-between items-start text-gray-400"
          onClick={onClick}
          aria-expanded={isOpen}
        >
          <span className="font-medium text-gray-900">{question}</span>
          <span className="ml-6 h-7 flex items-center">
            <ChevronDownIcon
              className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? "-rotate-180" : "rotate-0"}`}
              aria-hidden="true"
            />
          </span>
        </button>
      </dt>
      <div
        className={`overflow-hidden transition-max-height duration-300 ${isOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <dd className="mt-2 pr-12">
          <p className="text-base text-black">{answer}</p>
        </dd>
      </div>
    </div>
  )
}

