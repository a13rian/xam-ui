export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Quote Section */}
      <div className="relative hidden w-1/2 overflow-hidden bg-black lg:flex lg:flex-col lg:justify-between p-12">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-400 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500 via-transparent to-transparent opacity-60" />

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

        {/* Decorative corner gradient */}
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 opacity-40 blur-3xl" />
      </div>

      {/* Right Panel - Form Section */}
      <div className="flex w-full flex-col lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
