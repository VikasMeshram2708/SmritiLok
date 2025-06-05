import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <div className="bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6 mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">Effective Date: June 5, 2025</p>
          <Separator />
        </div>

        <div className="space-y-8 text-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p className="text-muted-foreground">
              Smriti Lok ({"we"}, {"us"}, or {"our"}) respects your privacy.
              This policy explains how we collect, use, disclose, and safeguard
              your information when you use our journaling platform.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Information We Collect</h2>
            <p className="text-muted-foreground">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <span className="font-medium">Account Data:</span> Name, email,
                profile picture when you register
              </li>
              <li>
                <span className="font-medium">Journal Content:</span> Entries,
                media, and metadata you create
              </li>
              <li>
                <span className="font-medium">Usage Data:</span> How you
                interact with our services (pages visited, features used)
              </li>
              <li>
                <span className="font-medium">Technical Data:</span> IP address,
                device type, browser information
              </li>
            </ul>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide and maintain our service</li>
              <li>Improve and personalize your experience</li>
              <li>Develop new features</li>
              <li>Communicate with you (service updates, security alerts)</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              We <span className="font-medium">never</span> sell your personal
              data or journal content to third parties.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              4. Data Security (2025 Standards)
            </h2>
            <p className="text-muted-foreground">
              We implement industry-leading security measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>End-to-end encryption for all journal entries</li>
              <li>Regular security audits and penetration testing</li>
              <li>Biometric authentication options</li>
              <li>GDPR and CCPA compliance frameworks</li>
              <li>Quantum-resistant encryption protocols</li>
            </ul>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your data until you request deletion. Deactivated
              accounts are automatically deleted after 12 months of inactivity.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Your Rights</h2>
            <p className="text-muted-foreground">
              Under privacy laws, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Object to processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              To exercise these rights, contact us at privacy@smritilok.com.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We use these trusted providers:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>AWS (Cloud hosting with US-East-2 region)</li>
              <li>Stripe (Payment processing)</li>
              <li>Sentry (Error monitoring)</li>
            </ul>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">8. {"Children's"} Privacy</h2>
            <p className="text-muted-foreground">
              Our service is not intended for users under 16. We {"don't"}{" "}
              knowingly collect data from children.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">9. Policy Updates</h2>
            <p className="text-muted-foreground">
              We may update this policy periodically. {"We'll"} notify users of
              significant changes via email at least 30 days before changes take
              effect.
            </p>
          </section>

          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Smriti Lok. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <a href="/terms">View Terms of Service</a>
              </Button>
              <Button asChild>
                <a href="mailto:privacy@smritilok.com">Contact Privacy Team</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
