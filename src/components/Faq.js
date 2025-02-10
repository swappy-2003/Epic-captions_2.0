'use client';
import { useState } from "react"
import {FAQItem} from "./FaqItem";

const faqData = [
    {
        question: "What is AutoSub?",
        answer:
            "AutoSub is a tool designed to help you create engaging and professional captions for your social media posts. It's designed to save you time and enhance your content.",
    },
    {
        question: "How do I get started with AutoSub?",
        answer:
            "Getting started is easy! Simply create an account on our website, choose a caption template, and customize it to fit your needs.",
    },
    {
        question: "Is there a free trial available?",
        answer:
            "Yes, we offer a 14-day free trial for new users. This allows you to explore all the features of Epic Captions before committing to a subscription.",
    },
    {
        question: "How do I create an account?",
        answer:
            "To create an account, visit our website at www.epiccaptions.com and click on the 'Sign Up' button. Follow the prompts to enter your information and set up your account.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept major credit cards (Visa, MasterCard, American Express) and PayPal. For business accounts, we also offer invoicing options.",
    },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 bg-gray-50/30  ">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-950 text-center mb-8">Frequently Asked Questions</h2>
        <dl className="space-y-6 divide-y divide-gray-200">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </dl>
      </div>
    </section>
  )
}

