import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <div className="bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6 mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">Last Updated: June 5, 2025</p>
          <Separator />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-base leading-relaxed">
              By accessing or using Smriti Lok ("Service"), you agree to be
              bound by these Terms of Service ("Terms"). If you disagree with
              any part, you may not access the Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">2. Service Description</h2>
            <p className="text-base leading-relaxed">
              Smriti Lok is a digital journaling platform that allows users to
              document, organize, and reflect on personal experiences. Features
              may evolve over time to improve user experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
            <p className="text-base leading-relaxed">You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Not use the Service for illegal activities</li>
              <li>
                Comply with all applicable laws (including data protection
                regulations)
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
            <p className="text-base leading-relaxed">
              You retain ownership of all content you create. By posting
              content, you grant Smriti Lok a worldwide, non-exclusive license
              to host, store, and display your content solely for the purpose of
              providing the Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">5. Privacy</h2>
            <p className="text-base leading-relaxed">
              Your privacy is important to us. Our Privacy Policy explains how
              we collect, use, and protect your information. By using the
              Service, you agree to our data practices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              6. Subscription Terms (2025 Updates)
            </h2>
            <p className="text-base leading-relaxed">
              As of January 2025, we offer:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free Tier: Basic features with 5GB storage</li>
              <li>
                Premium ($8/month): Unlimited entries, 50GB storage, AI features
              </li>
              <li>Family Plan ($15/month): Up to 5 users, shared memories</li>
            </ul>
            <p className="text-base leading-relaxed">
              Subscriptions auto-renew monthly. You may cancel anytime via your
              account settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">7. Termination</h2>
            <p className="text-base leading-relaxed">
              We may suspend or terminate your access to the Service for
              violation of these Terms. Upon termination, you may request export
              of your data within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">8. Disclaimers</h2>
            <p className="text-base leading-relaxed">
              The Service is provided "as-is" without warranties of any kind. We
              do not guarantee uninterrupted or error-free operation. Some
              jurisdictions don't allow certain disclaimers, so they may not
              apply to you.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              9. Limitation of Liability
            </h2>
            <p className="text-base leading-relaxed">
              To the maximum extent permitted by law, Smriti Lok shall not be
              liable for any indirect, incidental, or consequential damages
              arising from use of the Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">10. Governing Law</h2>
            <p className="text-base leading-relaxed">
              These Terms shall be governed by the laws of Delaware, USA,
              without regard to conflict of law provisions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">11. Changes to Terms</h2>
            <p className="text-base leading-relaxed">
              We may modify these Terms at any time. We'll notify users of
              significant changes via email or in-app notification. Continued
              use after changes constitutes acceptance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
