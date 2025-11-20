'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if user has already subscribed or dismissed
    const hasSubscribed = localStorage.getItem('newsletter_subscribed');
    const lastDismissed = localStorage.getItem('newsletter_dismissed');

    if (hasSubscribed) {
      return; // Don't show if already subscribed
    }

    // Show popup after 30 seconds if not dismissed in last 24 hours
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed);
      const hoursSinceDismiss = (Date.now() - dismissedTime) / (1000 * 60 * 60);

      if (hoursSinceDismiss < 24) {
        return; // Don't show if dismissed in last 24 hours
      }
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter_dismissed', Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        localStorage.setItem('newsletter_subscribed', 'true');

        // Close popup after 2 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-[420px]"
          >
            <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
                aria-label="Close popup"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="p-8 text-center">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.0345 0.220688C22.8292 0.711126 26.0475 2.32952 28.6896 5.07586C29.4208 5.93037 29.3289 6.68436 28.4138 7.33793C26.7436 8.10273 25.0516 8.80154 23.3379 9.43448C21.8871 10.0033 20.6916 10.9045 19.7517 12.1379C19.0744 13.5577 18.9641 15.029 19.4207 16.5517C19.7343 17.5101 20.1389 18.4297 20.6345 19.3103C21.5192 20.7857 22.5123 22.1833 23.6138 23.5034C24.896 24.9516 26.2018 26.3861 27.531 27.8069C25.2575 30.1207 22.4988 31.5 19.2551 31.9448C12.3302 32.1885 7.052 29.3747 3.42066 23.5034C1.3867 19.5627 0.945321 15.4431 2.09653 11.1448C4.18096 5.25396 8.28213 1.64932 14.4 0.331032C16.1655 0.0551716 17.4345 -0.16552 19.0345 0.220688Z"
                      fill="#1a1a1a"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27.4207 13.0759C28.9389 12.9242 29.9872 13.5496 30.5655 14.9517C30.6675 17.314 29.5456 18.3254 27.2 17.9862C25.3223 16.8227 25.0648 15.3882 26.4276 13.6828C26.7363 13.4285 27.0673 13.2262 27.4207 13.0759Z"
                      fill="#1a1a1a"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Times New Roman, serif' }}>
                  Ground Zero Newsletter
                </h3>
                <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: 'Times New Roman, serif' }}>
                  Subscribe our free newsletter and<br />
                  stay tuned with Ground Zero Updates
                </p>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-4"
                  >
                    <div className="text-green-600 text-lg font-semibold mb-2" style={{ fontFamily: 'Times New Roman, serif' }}>
                      Thanks for subscribing!
                    </div>
                    <p className="text-gray-500 text-sm" style={{ fontFamily: 'Times New Roman, serif' }}>
                      We'll keep you updated.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        disabled={status === 'loading'}
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all disabled:opacity-50 text-sm"
                        style={{ fontFamily: 'Times New Roman, serif' }}
                      />
                    </div>

                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-sm"
                        style={{ fontFamily: 'Times New Roman, serif' }}
                      >
                        {errorMessage}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full px-6 py-3 bg-[#5b6b8a] text-white font-medium rounded-md hover:bg-[#4a5a79] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      style={{ fontFamily: 'Times New Roman, serif' }}
                    >
                      {status === 'loading' ? 'Registering...' : 'Register Now'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
