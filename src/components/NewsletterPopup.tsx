'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed
    const lastDismissed = localStorage.getItem('newsletter_dismissed');

    // Show popup after 5 seconds if not dismissed in last 24 hours
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-[500px]"
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

              {/* Substack Embed */}
              <iframe
                src="https://groundzero1.substack.com/embed"
                width="100%"
                height="320"
                style={{ border: 'none', background: 'white', overflow: 'hidden' }}
                title="Subscribe to Ground Zero Newsletter"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
