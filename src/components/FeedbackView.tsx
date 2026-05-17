import React, { useState, useEffect } from 'react';
import { Star, Send, History } from 'lucide-react';
import type { Feedback } from '../types';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export const FeedbackView: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [view, setView] = useState<'form' | 'history'>('form');

  useEffect(() => {
    const saved = localStorage.getItem('hintro_feedback');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFeedbacks(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error('Error parsing feedback from localStorage', e);
        setFeedbacks([]);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    const newFeedback: Feedback = {
      id: crypto.randomUUID(),
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('hintro_feedback', JSON.stringify(updated));
    
    // Reset form
    setRating(0);
    setComment('');
    alert('Thank you for your feedback!');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {view === 'form' ? 'Share your Feedback' : 'Feedback History'}
          </h1>
          <button 
            onClick={() => setView(view === 'form' ? 'history' : 'form')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {view === 'form' ? (
              <><History size={18} /> View History</>
            ) : (
              <><Star size={18} /> Give Feedback</>
            )}
          </button>
        </div>

        {view === 'form' ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">How would you rate your experience?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={cn(
                        "transition-colors",
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Tell us more (optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like? What can we improve?"
                className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={rating === 0}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
            >
              <Send size={18} />
              Submit Feedback
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {feedbacks.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500">
                No feedback history yet.
              </div>
            ) : (
              feedbacks.map((fb) => (
                <div key={fb.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={cn(
                            star <= fb.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      {format(new Date(fb.timestamp), 'MMM d, yyyy HH:mm')}
                    </span>
                  </div>
                  {fb.comment && <p className="text-gray-700 text-sm">{fb.comment}</p>}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
