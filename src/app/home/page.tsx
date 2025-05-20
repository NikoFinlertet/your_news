'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    window.location.href = 'https://t.me/amogsu2ns2nc28bot';
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
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
