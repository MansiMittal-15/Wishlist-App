import React from 'react';

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 4c-4.418 0-8 3.582-8 8a8 8 0 0016 0c0-4.418-3.582-8-8-8z" /></svg>
    ),
    title: 'Collaborate Instantly',
    desc: 'Work together on wishlists in real time.',
    color: 'from-purple-400 to-pink-400',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" /></svg>
    ),
    title: 'Invite & Manage',
    desc: 'Easily invite others and manage access.',
    color: 'from-pink-400 to-yellow-300',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4a4 4 0 100-8 4 4 0 000 8z" /></svg>
    ),
    title: 'Personalized Experience',
    desc: 'See who added what, and customize your wishlist.',
    color: 'from-yellow-300 to-purple-400',
  }
];

const trustedLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_TV_2015.png',
];

const Home = () => (
  <>
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 overflow-hidden text-center">
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none animate-pulse-slow" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2" fill="#a78bfa" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-200 rounded-full filter blur-3xl opacity-40 animate-pulse-slow" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 rounded-full filter blur-3xl opacity-40 animate-pulse-slow" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 pt-24 pb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg mb-6 animate-fade-in">The Modern Way to Share Wishlists</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">Create, share, and manage wishlists with your group. Add products, invite people, and collaborate in real time—no more lost ideas or duplicate gifts!</p>
        <a href="/wishlist" className="px-10 py-4 bg-gradient-to-r from-purple-700 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform animate-bounce-slow">Get Started</a>
      </div>
    </section>
    <section className="max-w-4xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
      {features.map((f, i) => (
        <div key={i} className={`bg-gradient-to-br ${f.color} p-[2px] rounded-2xl shadow-lg hover:shadow-2xl transition`}>
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center h-full">
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold text-purple-700 mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        </div>
      ))}
    </section>
    <section className="max-w-2xl mx-auto px-4 pb-16">
      <div className="bg-white rounded-xl shadow p-10 flex flex-col items-center text-center border-4 border-transparent bg-clip-padding" style={{borderImage: 'linear-gradient(90deg, #a78bfa, #f472b6, #fde68a) 1'}}>
        <svg className="w-10 h-10 text-purple-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
        <blockquote className="text-lg italic text-purple-800 mb-2">“WishlistApp is the easiest way to plan group gifts. It's beautiful, simple, and collaborative.”</blockquote>
        <div className="text-purple-700 font-semibold">— A Happy User</div>
      </div>
    </section>
    <style>{`
      .animate-pulse-slow { animation: pulse 7s cubic-bezier(.4,0,.6,1) infinite; }
      @keyframes pulse { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.2; } }
      .animate-fade-in { animation: fadeIn 1s; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
      .animate-bounce-slow { animation: bounce 2.5s infinite; }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    `}</style>
  </>
);

export default Home; 