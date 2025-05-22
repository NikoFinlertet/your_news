'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          YourNews
        </Link>
        <div className="flex gap-6">
          <Link href="/docs" className="text-white hover:text-gray-300">Документация</Link>
          <Link href="https://t.me/yournews_bot" className="text-white hover:text-gray-300">Telegram бот</Link>
          <Link href="/contacts" className="text-white hover:text-gray-300">Контакты</Link>
          <Link href="https://t.me/yournews_support" className="text-white hover:text-gray-300">Поддержка</Link>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 flex items-center">
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-6xl font-bold text-white mb-6">
          Персонализированные новости для вас
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Получайте только те новости, которые действительно важны для вас. 
          Искусственный интеллект анализирует ваши интересы и формирует уникальную ленту.
        </p>
        <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors">
          Присоединиться к бета-тестированию
        </button>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    "🎯 Персонализированная лента новостей на основе ваших интересов",
    "🤖 ИИ анализирует ваши предпочтения и улучшает рекомендации",
    "📱 Раздача айфонов и пабаджи",
    "🔔 Набьем золотые колокола на спине",
    "📊 Аналитика ваших интересов и трендов",
    "🌐 Поддержка множества источников новостей",
    "🔒 Закроем вас в подвале",
    "📈 Красная палка летит вверх. Stonks!",
    "🇨🇳 +100500 рейтинга от партии Китая"
  ];

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[600px] w-full">
            <Image
              src="/ui-preview.png"
              alt="UI Preview"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-8">
              Что вас ждет в MVP
            </h2>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="text-gray-300 text-lg flex items-start gap-3">
                  <span className="text-2xl">{feature.split(' ')[0]}</span>
                  <span>{feature.split(' ').slice(1).join(' ')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    window.location.href = 'https://t.me/amogsu2ns2nc28bot';
  };

  return (
    <main className="bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Присоединяйтесь к YourNews
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Будьте первыми, кто узнает о запуске нашего сервиса
          </p>

          {!submitted ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={handleClick}
              className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium text-lg"
            >
              Присоединиться
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-2">Спасибо за регистрацию!</h2>
              <p className="text-gray-300">
                Мы свяжемся с вами, как только запустим сервис.
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Ранний доступ</h3>
              <p className="text-gray-400">Получите доступ к сервису до официального запуска</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Эксклюзивные возможности</h3>
              <p className="text-gray-400">Станьте первым, кто попробует передовой продукт</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Aboba</h3>
              <p className="text-gray-400">У автора текста не хватило фантазии на нечто, поистинне оригинальное</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
