import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../context/language-context';
import { motion } from 'motion/react';

interface SuccessOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const confettiCount = 50;
  const confettiElements = Array.from({ length: confettiCount }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    color: ['#00875A', '#10B981', '#8B5CF6', '#FFD700', '#06B6D4'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      {/* Confetti */}
      {confettiElements.map((confetti) => (
        <motion.div
          key={confetti.id}
          initial={{ y: -20, x: `${confetti.left}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: '100vh',
            rotate: confetti.rotation,
            opacity: 0,
          }}
          transition={{
            duration: confetti.duration,
            delay: confetti.delay,
            ease: 'linear',
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: confetti.color }}
        />
      ))}

      {/* Success Card */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-card rounded-2xl shadow-2xl p-8 max-w-md mx-4 relative border border-border"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-primary" />
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-foreground mb-2"
          >
            {t('orderSuccess')}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground"
          >
            {t('orderConfirmation')}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-primary/10 rounded-lg"
          >
            <p className="text-sm text-primary">
              {t('orderNumberPrefix')}: <span className="font-bold">PLN-2026-{Math.floor(Math.random() * 1000).toString().padStart(4, '0')}</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};