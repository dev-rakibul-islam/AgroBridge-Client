import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitle from "../../components/SectionTitle";
import CropCard from "../../components/CropCard";
import Loader from "../../components/Loader";
import { apiGet } from "../../lib/api";

const heroSlides = [
  {
    id: 1,
    title: "Bridge the Gap Between Fields and Markets",
    description:
      "Connect directly with agri buyers, suppliers, and fellow farmers to showcase your produce and build long-term partnerships.",
    image:
      "https://i.ibb.co.com/HLmKn206/A-vibrant-agricultural-marketplace-scene-showing-farmers-traders-and-suppliers-exchanging-fresh-prod.jpg",
  },
  {
    id: 2,
    title: "Plan Smarter Harvests with Real Insights",
    description:
      "Discover trending crops, track market demand, and align your harvest with the buyers who need it the most.",
    image:
      "https://i.ibb.co.com/9m73Yxgh/A-futuristic-smart-farming-scene-showing-a-farmer-using-a-tablet-to-monitor-crops-with-holographic-d.jpg",
  },
  {
    id: 3,
    title: "Collaborate with Trusted Partners",
    description:
      "Create meaningful collaborations, from seed to shelf, and grow together with the AgroBridge community.",
    image:
      "https://i.ibb.co.com/8D32rhJJ/A-vibrant-agricultural-marketplace-scene-showing-farmers-traders-and-suppliers-exchanging-fresh-prod.jpg",
  },
];

const howItWorks = [
  {
    title: "Create your profile",
    text: "Sign up to showcase your agri expertise, crops, or sourcing needs.",
    icon: "👤",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "List or discover crops",
    text: "Post your harvest plans or browse fresh produce across Bangladesh.",
    icon: "🌾",
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Connect instantly",
    text: "Send interests, negotiate quantities, and build reliable partnerships.",
    icon: "🤝",
    color: "from-amber-500 to-orange-500",
  },
];

const newsArticles = [
  {
    id: 1,
    title: "Smart Irrigation Drives Yield Growth in Northern Districts",
    excerpt:
      "Precision irrigation systems are helping farmers optimise water usage, saving up to 40% while boosting output.",
    link: "https://www.fao.org/innovation/en/",
    icon: "💧",
  },
  {
    id: 2,
    title: "Export Demand Rises for Organic Vegetables",
    excerpt:
      "Global buyers are showing renewed interest in organic agro produce from Bangladesh, opening new trade opportunities.",
    link: "https://www.imf.org/en/Topics/agriculture",
    icon: "📦",
  },
  {
    id: 3,
    title: "Digital Supply Chains Bring Farmers Closer to Consumers",
    excerpt:
      "Tech-enabled marketplaces are slashing middlemen costs and creating direct farm-to-fork experiences.",
    link: "https://agfundernews.com/",
    icon: "🚀",
  },
];

const extraSections = [
  {
    id: "community",
    title: "Community Impact",
    text: "Over 2,500 agri professionals already collaborate through AgroBridge to share resources and accelerate growth.",
    cta: "Meet the community",
    link: "/register",
    icon: "👥",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "resources",
    title: "Growth Resources",
    text: "Explore crop planning templates, seasonal market reports, and expert-led webinars curated for modern agripreneurs.",
    cta: "Browse resources",
    link: "/crops",
    icon: "📚",
    color: "from-indigo-500 to-blue-500",
  },
];

const Home = () => {
  const {
    data: latestCrops = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["crops", "latest"],
    queryFn: ({ signal }) => apiGet("/api/crops/latest", undefined, { signal }),
  });

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative mx-auto h-screen max-w-7xl overflow-hidden px-4 flex items-center">
        <div className="glass-premium soft-shadow overflow-hidden w-full h-96 md:h-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop
            className="h-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full w-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center px-4 py-10">
                    <div className=" max-w-2xl rounded-2xl p-8 md:p-12 text-center text-white animate-slide-up">
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                        {slide.title}
                      </h1>
                      <p className="mt-4 text-base md:text-lg text-white/90">
                        {slide.description}
                      </p>
                      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                          to="/crops"
                          className="px-8 py-3 rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-600 hover:to-cyan-600 shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
                        >
                          Explore Crops
                        </Link>
                        <Link
                          to="/register"
                          className="px-8 py-3 rounded-lg border-2 border-white text-white font-bold hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                        >
                          Join AgroBridge
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Latest Crops Section */}
      <section className="mx-auto max-w-7xl px-4">
        <SectionTitle
          eyebrow="🌟 Fresh Picks"
          title="Latest crop posts"
          description="Discover the most recent harvest updates shared by our community."
        />
        {isPending ? (
          <Loader />
        ) : isError ? (
          <p className="text-center text-red-500 font-semibold">
            {error.message}
          </p>
        ) : (
          <>
            {latestCrops.length === 0 ? (
              <div className="glass-premium rounded-xl p-12 text-center">
                <p className="text-slate-600 text-lg">
                  No crops posted yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestCrops.map((crop) => (
                  <CropCard key={crop._id} crop={crop} />
                ))}
              </div>
            )}
            <div className="mt-12 text-center">
              <Link
                to="/crops"
                className="px-8 py-3 rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-600 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all duration-300 inline-block hover:scale-105"
              >
                View all crops →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* How It Works Section */}
      <section className="">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionTitle
            eyebrow="⚡ Process"
            title="How AgroBridge works"
            description="We combine networking and trade to help agri professionals collaborate faster."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div
                key={item.title}
                className="glass-premium rounded-xl p-8 hover:shadow-glow transition-all duration-500 stagger-{idx+1}"
              >
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${item.color} text-3xl shadow-lg`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="mx-auto max-w-7xl px-4">
        <SectionTitle
          eyebrow="📰 Insights"
          title="Agro news & stories"
          description="Stay informed with curated stories shaping the future of agriculture."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="glass-premium rounded-2xl p-6 hover:shadow-glow transition-all duration-500 border border-white/50 stagger-{idx+1}"
            >
              <div className="text-4xl mb-3">{article.icon}</div>
              <h3 className="text-lg font-bold text-slate-900">
                {article.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {article.excerpt}
              </p>
              <a
                href={article.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Sections */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionTitle
            eyebrow="✨ Highlights"
            title="Grow with confidence"
            description="Designed to support every chapter of your agri journey."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {extraSections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="glass-premium rounded-xl p-8 hover:shadow-premium transition-all duration-500 border border-white/50 stagger-{idx+1}"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${section.color} text-2xl mb-4`}
                >
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {section.text}
                </p>
                <Link
                  to={section.link}
                  className="mt-5 inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold transition-colors duration-300"
                >
                  {section.cta} →
                </Link>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid gap-6 rounded-2xl glass-premium p-8 md:grid-cols-3 border border-white/50">
            <div className="text-center">
              <h4 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                12K+
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Active crop listings shared by the community
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                4.7/5
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Average collaboration rating from partner feedback
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                72hrs
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Median time to confirm interests on popular crops
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
