import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Quote Section */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gray-900 lg:flex lg:flex-col lg:justify-between p-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=1600&fit=crop"
            alt="Beautiful travel destination"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gray-900/50 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <p className="text-sm tracking-[0.3em] text-white/80 uppercase">
            A Wise Quote
            <span className="ml-4 inline-block w-12 h-px bg-white/60 align-middle" />
          </p>
        </div>

        <div className="relative z-10">
          <h1 className="font-[family-name:var(--font-playfair)] text-6xl font-normal leading-tight text-white">
            Get
            <br />
            Everything
            <br />
            You Want
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            You can get everything you want if you work hard, trust the process, and stick to the plan.
          </p>
        </div>
      </div>

      {/* Right Panel - Form Section */}
      <div className="flex w-full flex-col lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
