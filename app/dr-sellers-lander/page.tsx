'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'

// Navbar Component
function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navActive = isScrolled || isHovered;

  const handleDropdownEnter = (dropdown: string) => setActiveDropdown(dropdown);
  const handleDropdownLeave = () => setActiveDropdown(null);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        navActive ? 'bg-white shadow' : 'bg-transparent'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3">
          <img 
            src={navActive ? "/X logo white background.png" : "/X logo.png"}
            alt="Dealbase Logo"
            className="h-6 w-6"
          />
          <span 
            className={`font-semibold text-xl md:text-2xl tracking-tight ${navActive ? 'text-[#23235B]' : 'text-white'}`}
            style={{ 
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
              fontWeight: 600
            }}
          >
            Dealbase
          </span>
        </Link>
        {/* Menu */}
        <div className="flex items-center gap-8">
          <Link href="/sellers" className={`font-medium hover:text-blue-700 transition-colors ${navActive ? 'text-[#18194A]' : 'text-white'}`}>
            Sellers
          </Link>
          <Link href="/buyers" className={`font-medium hover:text-blue-700 transition-colors ${navActive ? 'text-[#18194A]' : 'text-white'}`}>
            Buyers
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className={`p-2 rounded transition-colors ${navActive ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}>
            <HiMenu className={`w-6 h-6 ${navActive ? 'text-[#18194A]' : 'text-white'}`} />
          </button>
          <button className={`p-2 rounded transition-colors ${navActive ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}>
            <FaUserCircle className={`w-6 h-6 ${navActive ? 'text-[#18194A]' : 'text-white'}`} />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default function DRSellersLanderPage() {
  return (
    <div className="relative min-h-screen bg-[#18194A] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section
        className="w-full transition-all duration-300 flex flex-col items-center justify-center pt-32 pb-20 px-4"
        style={{
          backgroundImage: "url('/dark_background_option_5.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '70vh',
        }}
      >
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Most Business Owners Sell for Less Than They Could Have — Simply Because They Never Knew What Was Dragging Their Value Down.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The DealBase Valuation Tool shows you more than just a number — it reveals the hidden factors limiting your sale price and what to improve to increase it.
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Built by brokers and analysts behind $500M+ in Australian business sales, this data-driven valuation model gives you instant clarity — no broker fees, no guesswork, and no pressure to sell.
            </p>
            <div className="bg-[#23235B]/90 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-2xl mx-auto border border-white/20">
              <p className="text-white font-semibold text-lg mb-4">Normally $497 — Free for a Limited Time.</p>
              <p className="text-gray-300 mb-6">Get your confidential valuation and report instantly.</p>
              <button className="bg-[#FFA736] hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg transition-colors w-full md:w-auto">
                Get My Free Valuation & Report →
              </button>
              <p className="text-gray-400 text-sm mt-4">100% Private. No obligation. No commissions.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Why Most Owners Leave Money on the Table */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-6">Why Most Owners Leave Money on the Table</h2>
            <p className="text-lg text-[#23235B] mb-4">
              You've spent years building your business.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              You know it's worth something — but how much? And what's holding it back?
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              Every week in Australia, good businesses sell for far less than they could have.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              Why? Because owners rely on brokers throwing out "ballpark" figures… or they wait until revenue drops before making a move.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              That's not you — you want to know your true value now.
            </p>
            <p className="text-lg text-[#23235B] mb-6">
              Because when the time comes to cash out, you want to walk away with confidence — not regret.
            </p>
            <div className="bg-[#F5F7FB] rounded-2xl p-6 border-l-4 border-[#4F5DFF]">
              <p className="text-xl font-semibold text-[#23235B] italic">
                "You don't want to find out what your business was worth after you've already sold it."
              </p>
            </div>
            <p className="text-lg text-[#23235B] mt-6 font-semibold">
              DealBase exists so you never have to.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: The Core Desire: Control & Clarity */}
      <section className="w-full bg-[#F5F7FB] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-6">The Core Desire: Control & Clarity</h2>
            <p className="text-lg text-[#23235B] mb-4">
              Let's be real — selling a business can feel like walking blindfolded through a minefield.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              There's jargon. There's pressure. And there's always someone who "knows better."
            </p>
            <p className="text-lg text-[#23235B] mb-6">
              You've built something real. You deserve to be in control of what happens next.
            </p>
            <p className="text-xl font-semibold text-[#23235B] mb-6">
              DealBase gives you clarity and control — in one simple tool.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg width="24" height="24" fill="none" className="mt-1 flex-shrink-0"><circle cx="12" cy="12" r="12" fill="#4F5DFF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-[#23235B] font-semibold text-lg">Know your business's real market value.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="24" height="24" fill="none" className="mt-1 flex-shrink-0"><circle cx="12" cy="12" r="12" fill="#4F5DFF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-[#23235B] font-semibold text-lg">See what's driving that number — good and bad.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="24" height="24" fill="none" className="mt-1 flex-shrink-0"><circle cx="12" cy="12" r="12" fill="#4F5DFF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-[#23235B] font-semibold text-lg">Identify exactly what to fix to increase your price.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="24" height="24" fill="none" className="mt-1 flex-shrink-0"><circle cx="12" cy="12" r="12" fill="#4F5DFF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-[#23235B] font-semibold text-lg">Stay 100% anonymous until you choose to share.</span>
                </li>
              </ul>
            </div>
            <p className="text-lg text-[#23235B] mt-6">
              Think of it as a business health check that could put tens (or hundreds) of thousands more in your pocket.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3: How DealBase Works */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-6">How DealBase Works (And Why It's Different)</h2>
            <p className="text-lg text-[#23235B] mb-4">
              Most "valuation tools" just spit out a random number based on turnover.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              That's not insight — that's guesswork.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              DealBase was built by licensed brokers and data analysts who've priced over $500M+ in Australian business transactions.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              We use real sales data and industry benchmarks — not templates — to calculate what your business could sell for today.
            </p>
            <p className="text-lg text-[#23235B] mb-6">
              Then, we go further.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              We show you your top 3 improvement opportunities — the levers that, if improved, can lift your valuation dramatically.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              Owners who focus on these improvement areas often see significant gains — sometimes 40%+ in perceived market value before they sell.
            </p>
            <p className="text-sm text-gray-600 mb-6 italic">
              (Results vary by business; this is what real data shows is possible.)
            </p>
            <div className="bg-[#F5F7FB] rounded-2xl p-6 border-l-4 border-[#4F5DFF]">
              <p className="text-xl font-semibold text-[#23235B] italic">
                "Most valuations stop at the number. DealBase shows you how to raise it."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: But I'm Not Ready to Sell Yet */}
      <section className="w-full bg-[#F5F7FB] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-6">"But I'm Not Ready to Sell Yet..."</h2>
            <p className="text-xl font-semibold text-[#23235B] mb-4">
              Good.
            </p>
            <p className="text-xl font-semibold text-[#23235B] mb-6">
              You're exactly who this tool was made for.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              This isn't about rushing you into a sale — it's about helping you make smart decisions early.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              In fact, most owners who use DealBase aren't selling at all (yet).
            </p>
            <p className="text-lg text-[#23235B] mb-6">
              They just want to understand where they stand — and what to improve so they're ready when opportunity knocks.
            </p>
            <div className="bg-white rounded-2xl p-6 border-l-4 border-[#4F5DFF]">
              <p className="text-xl font-semibold text-[#23235B] italic">
                "You don't need to be ready to sell — you just need to be ready to know."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Is It Really Free? */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-6">"Is It Really Free?"</h2>
            <p className="text-xl font-semibold text-[#23235B] mb-4">
              Yep. And here's why.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              Normally, this service would cost around $497 through a broker or consultant.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              We're offering it free right now because DealBase is launching nationwide — and we're using early user data to refine our accuracy model.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              You get clarity and a valuation report.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              We get better insights into what drives small business value.
            </p>
            <p className="text-xl font-semibold text-[#23235B] mb-6">
              Win-win.
            </p>
            <p className="text-lg text-[#23235B]">
              There's no hidden catch, no commitment, and no spam — just your confidential report, instantly delivered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 6: The Privacy Promise */}
      <section className="w-full bg-[#F5F7FB] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-6">The Privacy Promise</h2>
            <p className="text-lg text-[#23235B] mb-6">
              We know what you're thinking:
            </p>
            <p className="text-xl font-semibold text-[#23235B] mb-6 italic">
              "What if someone finds out I'm thinking of selling?"
            </p>
            <p className="text-lg text-[#23235B] mb-6">
              That's why DealBase is built with total discretion in mind.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔒</span>
                  <span className="text-[#23235B] font-semibold text-lg">Your business name stays private.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔒</span>
                  <span className="text-[#23235B] font-semibold text-lg">Only verified buyers under NDA can ever view your details.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔒</span>
                  <span className="text-[#23235B] font-semibold text-lg">You control every step of the process.</span>
                </li>
              </ul>
            </div>
            <p className="text-lg text-[#23235B] mt-6">
              You stay anonymous until you decide otherwise.
            </p>
            <p className="text-lg text-[#23235B] font-semibold">
              Your data is encrypted, protected, and never sold. Period.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Social Proof & Credibility */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] text-center mb-4">Social Proof & Credibility</h2>
            <p className="text-xl font-semibold text-[#23235B] text-center mb-12">
              Built by brokers. Backed by data. Trusted by business owners.
            </p>
            
            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-[#E6E9F8] rounded-2xl shadow p-8 flex flex-col">
                <p className="text-[#23235B] text-base mb-6 flex-1 italic">
                  "The valuation made me realise I was underselling my café by nearly 100K."
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <span className="font-bold text-[#23235B] text-base">— Sarah T., VIC</span>
                </div>
              </div>
              <div className="bg-[#E6E9F8] rounded-2xl shadow p-8 flex flex-col">
                <p className="text-[#23235B] text-base mb-6 flex-1 italic">
                  "Simple, fast, and surprisingly accurate."
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <span className="font-bold text-[#23235B] text-base">— Michael P., SA</span>
                </div>
              </div>
              <div className="bg-[#E6E9F8] rounded-2xl shadow p-8 flex flex-col">
                <p className="text-[#23235B] text-base mb-6 flex-1 italic">
                  "Better than the guess my broker gave me."
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <span className="font-bold text-[#23235B] text-base">— James L., NSW</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-[#23235B] text-center mb-4">
              Used by business owners across Australia — from eCommerce to cafés, trades to tech.
            </p>
            <p className="text-2xl font-bold text-[#23235B] text-center mb-12">
              $27,400,000+ in business value analysed (and counting).
            </p>

            <div className="bg-[#F5F7FB] rounded-2xl p-8 mb-8">
              <p className="text-lg font-semibold text-[#23235B] mb-2">Endorsed by Industry Professionals:</p>
              <p className="text-lg text-[#23235B] italic">
                "This kind of clarity is exactly what most small business owners need before engaging a broker."
              </p>
              <p className="text-base text-[#23235B] mt-2">— John Reynolds, CPA</p>
            </div>

            <div className="text-center">
              <p className="text-lg text-[#23235B] mb-4">As featured in</p>
              <div className="flex justify-center gap-8 items-center opacity-60">
                <div className="bg-gray-200 h-12 w-32 rounded"></div>
                <div className="bg-gray-200 h-12 w-32 rounded"></div>
                <div className="bg-gray-200 h-12 w-32 rounded"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 8: Comparison Table */}
      <section className="w-full bg-[#F5F7FB] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] text-center mb-12">
              Comparison Table: Why DealBase Beats Traditional Brokers
            </h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#23235B] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Feature</th>
                      <th className="px-6 py-4 text-center font-semibold">DealBase</th>
                      <th className="px-6 py-4 text-center font-semibold">Traditional Broker</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#23235B]">Valuation</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">Instant, data-backed</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">Slow, manual estimate</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#23235B]">Cost</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">Free (normally $497)</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">8–12% commission</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#23235B]">Privacy</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">100% confidential</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">Often public listings</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#23235B]">Buyer Access</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">Verified, NDA-only</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">Anyone can enquire</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#23235B]">Control</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">You're in charge</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">Broker runs the process</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#23235B]">Improvement Insights</td>
                      <td className="px-6 py-4 text-center text-[#4F5DFF] font-bold">Yes</td>
                      <td className="px-6 py-4 text-center text-[#23235B]">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 9: Future Value & Analytics */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-6">Future Value & Analytics</h2>
            <p className="text-lg text-[#23235B] mb-4">
              Your business data shouldn't just sit there. It should work for you.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              DealBase is building a live analytics dashboard that syncs directly with your business accounts (Shopify, Xero, bank data) to give you real-time valuation tracking.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              You'll be able to monitor how your business value changes month by month — like a fitness tracker for your business performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 10: Logic + Emotion Wrap-Up */}
      <section className="w-full bg-[#F5F7FB] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-6">Logic + Emotion Wrap-Up</h2>
            <p className="text-lg text-[#23235B] mb-4">
              You've put your life into your business.
            </p>
            <p className="text-lg text-[#23235B] mb-4">
              The long nights. The hard calls. The sacrifices.
            </p>
            <p className="text-lg text-[#23235B] mb-6">
              You deserve to know what it's really worth — and how to make it worth more.
            </p>
            <p className="text-xl font-semibold text-[#23235B] mb-4">
              DealBase isn't a broker.
            </p>
            <p className="text-xl font-semibold text-[#23235B] mb-6">
              It's your inside advantage.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-[#23235B] font-semibold">Get clarity now.</p>
              <p className="text-lg text-[#23235B] font-semibold">Make confident decisions later.</p>
              <p className="text-lg text-[#23235B] font-semibold">And when you're ready to sell — sell smarter.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full bg-[#18194A] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Normally $497 — Free for a Limited Time.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Find out what your business is worth and what's holding it back.
            </p>
            <button className="bg-[#FFA736] hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg transition-colors mb-6">
              Get My Free Valuation & Report →
            </button>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
              <span className="flex items-center gap-2">
                <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#4F5DFF"/><path d="M6 10.5l2.5 2.5L14 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                100% confidential
              </span>
              <span className="flex items-center gap-2">
                <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#4F5DFF"/><path d="M6 10.5l2.5 2.5L14 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                No obligation
              </span>
              <span className="flex items-center gap-2">
                <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#4F5DFF"/><path d="M6 10.5l2.5 2.5L14 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Built by licensed brokers
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#23235B] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2025 DealBase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
