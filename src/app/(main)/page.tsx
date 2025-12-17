import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-white">
        {/* Background decorative blob */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full bg-linear-to-br from-orange-200 via-orange-300 to-orange-400 opacity-60 blur-3xl"></div>
        <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-linear-to-br from-orange-300 to-orange-500 opacity-40"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[calc(100vh-64px)] items-center gap-12 py-12 lg:grid-cols-2 lg:gap-8 lg:py-24">
            {/* Left Side - Content */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Headline */}
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Gặp Gỡ{" "}
                <span className="text-orange-500">Cogie</span>
                <br />
                Người Bạn Tâm Giao
              </h1>

              {/* Subheadline */}
              <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-600">
                Kết nối với những người sẵn sàng lắng nghe, chia sẻ và đồng hành cùng bạn.
                Đặt lịch gặp mặt trực tiếp dễ dàng.
              </p>

              {/* CTA Buttons */}
              <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/search"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-8 text-sm font-medium text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600 hover:shadow-xl"
                >
                  Bắt đầu ngay
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Tìm hiểu thêm
                </Link>
                <Link
                  href="/become-partner"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-orange-500 bg-white px-8 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50"
                >
                  Trở thành Partner
                </Link>
              </div>

              {/* Stats with avatars */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full bg-orange-200 ring-2 ring-white"></div>
                  <div className="h-10 w-10 rounded-full bg-blue-200 ring-2 ring-white"></div>
                  <div className="h-10 w-10 rounded-full bg-green-200 ring-2 ring-white"></div>
                  <div className="h-10 w-10 rounded-full bg-purple-200 ring-2 ring-white"></div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">10,000+</div>
                  <div className="text-sm text-gray-500">Đã kết nối qua Cogie</div>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Visual with floating cards */}
            <div className="relative hidden lg:block">
              <div className="relative mx-auto w-full max-w-lg">
                {/* Main hero image */}
                <div className="relative z-10 aspect-4/5 overflow-hidden rounded-4xl shadow-2xl">
                  <Image
                    src="/hero.jpg"
                    alt="Hai người đang trò chuyện vui vẻ tại quán cafe"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating card - Top right - Stats */}
                <div className="absolute -right-4 top-8 z-20 rounded-2xl bg-white p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                      <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">1K+</p>
                      <p className="text-xs text-gray-500">Cuộc hẹn mỗi tháng</p>
                    </div>
                  </div>
                </div>

                {/* Floating card - Middle right - Rating */}
                <div className="absolute -right-8 top-1/2 z-20 -translate-y-1/2 rounded-2xl bg-white p-4 shadow-xl">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">98%</p>
                    <p className="text-xs text-gray-500">Hài lòng</p>
                  </div>
                  <div className="mt-2 flex justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating card - Bottom left - Verified */}
                <div className="absolute -left-8 bottom-16 z-20 rounded-2xl bg-white p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Đã xác minh</p>
                      <p className="text-xs text-gray-500">100% an toàn</p>
                    </div>
                  </div>
                </div>

                {/* Floating card - Bottom - Users online */}
                <div className="absolute -bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-2xl bg-white px-5 py-3 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full bg-orange-300 ring-2 ring-white"></div>
                      <div className="h-8 w-8 rounded-full bg-blue-300 ring-2 ring-white"></div>
                      <div className="h-8 w-8 rounded-full bg-pink-300 ring-2 ring-white"></div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600 ring-2 ring-white">
                        +50
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">500+</p>
                      <p className="text-xs text-gray-500">Đang online</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - Image */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-linear-to-br from-orange-100 to-orange-50">
                <Image
                  src="/hero.jpg"
                  alt="Người dùng Cogie"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Avatar row */}
              <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                <div className="h-14 w-14 overflow-hidden rounded-2xl bg-orange-200 shadow-lg"></div>
                <div className="h-14 w-14 overflow-hidden rounded-2xl bg-blue-200 shadow-lg"></div>
                <div className="h-14 w-14 overflow-hidden rounded-2xl bg-green-200 shadow-lg"></div>
                <div className="h-14 w-14 overflow-hidden rounded-2xl bg-purple-200 shadow-lg"></div>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                Về chúng tôi
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                Được Tạo Ra Để Giúp Bạn Kết Nối Chân Thật Hơn
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Cogie được thiết kế để giúp bạn tìm kiếm những người bạn tâm giao,
                sẵn sàng lắng nghe và chia sẻ. Chúng tôi tin rằng mỗi cuộc trò chuyện
                đều có thể mang lại giá trị và ý nghĩa.
              </p>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full bg-orange-500 px-8 text-sm font-medium text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                Tính năng
              </div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Trải Nghiệm Kết Nối<br />Hoàn Toàn Mới
              </h2>
            </div>
            <p className="max-w-md text-gray-600">
              Cogie cung cấp những tính năng thông minh giúp bạn kết nối dễ dàng,
              an toàn và hiệu quả.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Kết Nối Thông Minh</h3>
              <p className="text-gray-600">
                Hệ thống matching thông minh giúp bạn tìm được người phù hợp dựa trên
                sở thích, chủ đề quan tâm và vị trí.
              </p>
            </div>

            {/* Feature 2 - Highlighted */}
            <div className="rounded-2xl bg-orange-500 p-6 text-white shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Đặt Lịch Linh Hoạt</h3>
              <p className="text-white/90">
                Dễ dàng đặt lịch hẹn gặp mặt trực tiếp với lịch trình linh hoạt,
                phù hợp với thời gian của cả hai bên.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">An Toàn & Tin Cậy</h3>
              <p className="text-gray-600">
                Tất cả Partner đều được xác minh danh tính. Hệ thống đánh giá
                giúp bạn an tâm khi kết nối.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - Content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                Cách thức hoạt động
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                Bắt Đầu Sử Dụng Cogie Thật Dễ Dàng
              </h2>
              <p className="mb-8 text-gray-600">
                Chỉ với vài bước đơn giản, bạn đã có thể bắt đầu hành trình kết nối
                với những người bạn tâm giao.
              </p>
            </div>

            {/* Right - Steps */}
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-orange-200 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                    01
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Đăng Ký Tài Khoản</h3>
                    <p className="text-sm text-gray-500">Tạo tài khoản miễn phí chỉ trong 1 phút</p>
                  </div>
                </div>
              </div>

              {/* Step 2 - Active */}
              <div className="rounded-2xl bg-orange-500 p-5 text-white shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
                    02
                  </div>
                  <div>
                    <h3 className="font-semibold">Tìm Kiếm Partner</h3>
                    <p className="text-sm text-white/80">Duyệt qua các hồ sơ và tìm người phù hợp với bạn</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-orange-200 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                    03
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Đặt Lịch Hẹn</h3>
                    <p className="text-sm text-gray-500">Chọn thời gian và địa điểm phù hợp</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-orange-200 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                    04
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Gặp Gỡ & Chia Sẻ</h3>
                    <p className="text-sm text-gray-500">Tận hưởng cuộc trò chuyện ý nghĩa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - Header */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                FAQ
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                Cần Trợ Giúp?<br />Bắt Đầu Với Những Câu Hỏi Này
              </h2>
              <p className="mb-8 text-gray-600">
                Cần thêm hỗ trợ?
              </p>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Liên hệ chúng tôi
              </Link>
            </div>

            {/* Right - FAQ Items */}
            <div className="space-y-4">
              {/* FAQ 1 */}
              <details className="group rounded-2xl border border-gray-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-gray-900">
                  <span>1. Cogie là gì?</span>
                  <svg className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600">
                  Cogie là nền tảng kết nối những người cần trò chuyện, chia sẻ với những người sẵn sàng lắng nghe - gặp mặt trực tiếp (face-to-face).
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group rounded-2xl border border-gray-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-gray-900">
                  <span>2. Làm sao để trở thành Partner?</span>
                  <svg className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600">
                  Bạn có thể đăng ký trở thành Partner bằng cách tạo tài khoản và hoàn thành quy trình xác minh danh tính. Sau khi được duyệt, bạn có thể bắt đầu nhận booking.
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group rounded-2xl border border-gray-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-gray-900">
                  <span>3. Cogie có an toàn không?</span>
                  <svg className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600">
                  Có! Tất cả Partner đều được xác minh danh tính. Chúng tôi có hệ thống đánh giá và review để đảm bảo chất lượng dịch vụ.
                </div>
              </details>

              {/* FAQ 4 */}
              <details className="group rounded-2xl border border-gray-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-gray-900">
                  <span>4. Chi phí sử dụng Cogie như thế nào?</span>
                  <svg className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600">
                  Đăng ký tài khoản hoàn toàn miễn phí. Chi phí mỗi cuộc hẹn sẽ tùy thuộc vào Partner bạn chọn, được hiển thị rõ ràng trên hồ sơ của họ.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-500 to-orange-600 px-8 py-16 text-center text-white shadow-2xl sm:px-16">
            {/* Decorative elements */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10"></div>
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10"></div>

            <h2 className="relative mb-4 text-3xl font-bold sm:text-4xl">
              Sẵn Sàng <span className="text-orange-200">Kết Nối</span>?<br />
              Trải Nghiệm Cogie Ngay
            </h2>
            <p className="relative mb-8 text-lg text-white/90">
              Hàng ngàn người đang chờ để lắng nghe câu chuyện của bạn.
            </p>
            <Link
              href="/sign-up"
              className="relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-medium text-orange-600 shadow-lg transition-all hover:bg-orange-50"
            >
              Bắt đầu ngay
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
