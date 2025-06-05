import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I start logging my journey?",
      answer:
        "Simply sign up for an account and click 'New Entry' to begin documenting your experiences. You can add text, photos, videos, and more to each entry.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "Absolutely. We use end-to-end encryption for all your entries. Only you can access your private journey logs unless you choose to share them.",
    },
    {
      question: "Can I access Smriti Lok on multiple devices?",
      answer:
        "Yes, your journey syncs seamlessly across all your devices. Our apps are available for web, iOS, and Android.",
    },
    {
      question: "How much does Smriti Lok cost?",
      answer:
        "We offer a free plan with basic features. Premium plans start at $5/month for advanced features like unlimited storage, custom themes, and AI-assisted journaling.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes, you can export your entire journey at any time in multiple formats (PDF, JSON, or Markdown).",
    },
  ];

  return (
    <div className="bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6 text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Smriti Lok. Can't find what
            you're looking for? Contact our support team.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
              {index < faqs.length - 1 && <Separator className="my-2" />}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
