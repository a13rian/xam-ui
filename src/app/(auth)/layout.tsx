import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Brand Section */}
      <div className="relative hidden w-1/2 overflow-hidden bg-foreground lg:flex lg:flex-col lg:justify-between p-12">
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
          {/* Premium overlay with terracotta tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/90 via-foreground/70 to-foreground/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-terracotta/20 via-transparent to-transparent" />
        </div>

        {/* Top - Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-display text-xl tracking-tight text-background">
              Cogie
            </span>
          </Link>
        </div>

        {/* Bottom - Quote */}
        <div className="relative z-10">
          <p className="mb-6 inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-background/60">
            Câu nói hay
            <span className="h-px w-12 bg-terracotta/60" />
          </p>
          <h1 className="font-display text-5xl leading-tight tracking-tight text-background xl:text-6xl">
            Kết Nối
            <br />
            Những Tâm Hồn
            <br />
            <span className="text-terracotta">Đồng Điệu</span>
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/60">
            Cogie là nơi những cuộc trò chuyện ý nghĩa bắt đầu. Chia sẻ, lắng nghe, và tìm thấy sự đồng cảm.
          </p>

          {/* Trust indicators */}
          <div className="mt-10 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-display text-2xl text-terracotta">10,000+</span>
              <span className="text-xs text-background/50">Cuộc trò chuyện</span>
            </div>
            <div className="h-8 w-px bg-background/20" />
            <div className="flex flex-col">
              <span className="font-display text-2xl text-terracotta">500+</span>
              <span className="text-xs text-background/50">Partners</span>
            </div>
            <div className="h-8 w-px bg-background/20" />
            <div className="flex flex-col">
              <span className="font-display text-2xl text-terracotta">4.9/5</span>
              <span className="text-xs text-background/50">Đánh giá</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Section */}
      <div className="flex w-full flex-col bg-cream lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
