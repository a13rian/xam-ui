export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-6 lg:py-16">
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-gray-900 mb-8">
        Terms of Service
      </h1>

      <p className="text-muted-foreground mb-8">
        Last updated: December 9, 2024
      </p>

      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing and using Cogie (&quot;the Service&quot;), you agree to be bound by these
            Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not
            use the Service. We reserve the right to modify these Terms at any time, and your
            continued use of the Service constitutes acceptance of any modifications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. Description of Service
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Cogie provides an AI-powered platform for conversation and assistance. The Service
            may include various features, tools, and functionalities that may be updated,
            modified, or discontinued at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. User Accounts
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To access certain features of the Service, you may be required to create an account.
            You agree to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain and promptly update your account information</li>
            <li>Keep your password secure and confidential</li>
            <li>Be responsible for all activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Acceptable Use
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You agree not to use the Service to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Transmit harmful, offensive, or inappropriate content</li>
            <li>Attempt to gain unauthorized access to the Service or its systems</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Collect or harvest user data without consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Intellectual Property
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The Service and its original content, features, and functionality are owned by Cogie
            and are protected by international copyright, trademark, patent, trade secret, and
            other intellectual property laws. You may not copy, modify, distribute, sell, or
            lease any part of our Service without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. User Content
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You retain ownership of any content you submit to the Service. By submitting content,
            you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce,
            modify, and display such content in connection with providing the Service. You are
            solely responsible for the content you submit and must ensure it does not violate
            any third-party rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Disclaimer of Warranties
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
            KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE
            UNINTERRUPTED, SECURE, OR ERROR-FREE. YOUR USE OF THE SERVICE IS AT YOUR OWN RISK.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8. Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, COGIE SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR
            REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
            GOODWILL, OR OTHER INTANGIBLE LOSSES.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            9. Termination
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate or suspend your account and access to the Service immediately,
            without prior notice or liability, for any reason, including if you breach these
            Terms. Upon termination, your right to use the Service will immediately cease.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            10. Governing Law
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the
            jurisdiction in which Cogie operates, without regard to its conflict of law
            provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            11. Contact Us
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@cogie.com" className="text-foreground font-medium hover:underline">
              legal@cogie.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
