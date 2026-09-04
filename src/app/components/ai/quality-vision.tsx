import React, { useState } from 'react';
import { Camera, Upload, Sparkles, Check, AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { cn } from '../ui/utils';

interface QualityVisionProps {
  onClose?: () => void;
  productName?: string;
}

interface QualityAnalysis {
  score: number;
  freshness: number;
  defects: number;
  sizeUniformity: number;
  certified: boolean;
}

export const QualityVision: React.FC<QualityVisionProps> = ({ onClose, productName = 'Product' }) => {
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [analysis, setAnalysis] = useState<QualityAnalysis | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setHasImage(true);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: QualityAnalysis = {
        score: Math.floor(Math.random() * 15) + 85, // 85-100
        freshness: Math.floor(Math.random() * 10) + 90, // 90-100
        defects: Math.floor(Math.random() * 5), // 0-5
        sizeUniformity: Math.floor(Math.random() * 15) + 85, // 85-100
        certified: true,
      };
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 dark:bg-green-950/30';
    if (score >= 75) return 'bg-yellow-100 dark:bg-yellow-950/30';
    return 'bg-red-100 dark:bg-red-950/30';
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-xl p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('aiQualityVision')}</h2>
            <p className="text-sm text-muted-foreground">{t('qualityVisionDesc')}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Upload Area */}
      {!hasImage && (
        <div className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Camera className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('uploadPhoto')}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('qualityVisionDesc')}
              </p>
            </div>
            <div className="flex gap-3">
              <label className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-primary/20">
                <Upload className="w-5 h-5" />
                {t('uploadPhoto')}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <label className="px-6 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-accent transition-all cursor-pointer flex items-center gap-2">
                <Camera className="w-5 h-5" />
                {t('takePhoto')}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview & Analysis */}
      {hasImage && (
        <div className="space-y-6">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden bg-black">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Product"
                className="w-full h-64 object-cover"
              />
            )}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white font-semibold">{t('aiAnalyzing')}</p>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          {analysis && !isAnalyzing && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* AI Certificate Badge */}
              {analysis.certified && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {t('certifiedFresh')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('aiCertified')} • {productName}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={cn('text-3xl font-bold', getScoreColor(analysis.score))}>
                      {analysis.score}
                    </div>
                    <div className="text-xs text-muted-foreground">{t('qualityScore')}</div>
                  </div>
                </div>
              )}

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Freshness */}
                <div className={cn('rounded-xl p-4', getScoreBgColor(analysis.freshness))}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{t('freshnessLevel')}</span>
                    <span className={cn('text-xl font-bold', getScoreColor(analysis.freshness))}>
                      {analysis.freshness}%
                    </span>
                  </div>
                  <div className="w-full bg-background/50 rounded-full h-2">
                    <div
                      className={cn(
                        'h-2 rounded-full transition-all duration-500',
                        analysis.freshness >= 90 ? 'bg-green-600' : 'bg-yellow-600'
                      )}
                      style={{ width: `${analysis.freshness}%` }}
                    />
                  </div>
                </div>

                {/* Defects */}
                <div className={cn('rounded-xl p-4', getScoreBgColor(100 - analysis.defects * 10))}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{t('defectsDetected')}</span>
                    <span className={cn('text-xl font-bold', analysis.defects === 0 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400')}>
                      {analysis.defects}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {analysis.defects === 0 ? (
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {analysis.defects === 0 ? 'Excellent' : 'Minor issues'}
                    </span>
                  </div>
                </div>

                {/* Size Uniformity */}
                <div className={cn('rounded-xl p-4', getScoreBgColor(analysis.sizeUniformity))}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{t('sizeUniformity')}</span>
                    <span className={cn('text-xl font-bold', getScoreColor(analysis.sizeUniformity))}>
                      {analysis.sizeUniformity}%
                    </span>
                  </div>
                  <div className="w-full bg-background/50 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${analysis.sizeUniformity}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setHasImage(false);
                    setAnalysis(null);
                    setImagePreview('');
                  }}
                  className="flex-1 px-6 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-accent transition-all"
                >
                  {t('uploadPhoto')}
                </button>
                <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                  {t('confirm')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
