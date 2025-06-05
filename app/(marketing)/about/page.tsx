import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Rocket, Users, Shield, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { value: "10M+", label: "Memories Preserved" },
    { value: "150+", label: "Countries" },
    { value: "98%", label: "Customer Satisfaction" },
    { value: "24/7", label: "Support" },
  ];

  const team = [
    {
      name: "Aarav Patel",
      role: "Founder & CEO",
      bio: "Former neuroscientist passionate about memory preservation",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format",
    },
    {
      name: "Sophie Zhang",
      role: "Head of Design",
      bio: "Creates intuitive experiences that spark joy",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format",
    },
    {
      name: "Jamal Williams",
      role: "CTO",
      bio: "Security expert building robust infrastructure",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format",
    },
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description: "Your memories are encrypted and belong only to you",
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: "Human-Centered",
      description: "Designed for real people's emotional needs",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Continuous Innovation",
      description: "Always improving to serve you better",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Connecting people through shared experiences",
    },
  ];

  return (
    <div className="bg-background p-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Your Story Matters
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Smriti Lok was founded in 2023 to revolutionize how humans preserve
            their most precious memories.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="border rounded-lg p-6 text-center">
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Smriti Lok began when our founder lost access to a decade of
                digital journals. This personal tragedy sparked a mission to
                create the most reliable, beautiful platform for life
                storytelling.
              </p>
              <p>
                Today, we're a diverse team of technologists, designers, and
                storytellers united by one belief: Your life's journey deserves
                to be remembered in its full richness.
              </p>
              <p>
                In 2025, we introduced AI-assisted reflection tools that help
                users discover meaningful patterns in their personal growth.
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border aspect-video relative">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format"
              alt="Smriti Lok team working together"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-12 text-center">
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-4 relative">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join millions documenting their life stories with Smriti Lok.
          </p>
          <Button size="lg" asChild>
            <Link href="/journeys">Start Preserving Memories</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
