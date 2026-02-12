"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
  const faqs = [
    {
      question: "Who can participate?",
      answer:
        "VIAHACK is primarily open to software students at VIA University College. However, students from other programs with a passion for technology and innovation are also welcome to apply.",
    },
    {
      question: "Do I need a team?",
      answer:
        "You can sign up individually or as a team (2-5 members). If you register solo, we will help you find a team during the event. No one hacks alone at VIAHACK!",
    },
    {
      question: "What should I bring?",
      answer:
        "Bring your laptop, charger, and any tools you prefer to work with. We provide internet, food, drinks, and a workspace. A sleeping bag is optional but recommended for the overnight session.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes! VIAHACK is completely free to attend. Food, drinks, snacks, and all materials are provided throughout the event thanks to our sponsors.",
    },
    {
      question: "Do I need prior experience?",
      answer:
        "While some coding experience is helpful, we welcome all skill levels. The hackathon is about learning, collaborating, and pushing yourself. Mentors will be available to help throughout.",
    },
    {
      question: "What happens with our projects?",
      answer:
        "Your project is yours to keep. We encourage teams to continue developing their solutions after the event. Some past projects have turned into real products!",
    },
  ]

  return (
    <section id="faq" className="relative px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-pixel text-2xl md:text-3xl text-center text-neon-cyan glow-cyan mb-4">
          FAQ
        </h2>
        <p className="text-center text-muted-foreground mb-16 leading-relaxed">
          Got questions? We have answers.
        </p>

        <div className="rounded-xl border border-border bg-card p-6 glow-box-cyan">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/50"
              >
                <AccordionTrigger className="font-pixel text-[10px] leading-relaxed text-foreground hover:text-neon-cyan hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
