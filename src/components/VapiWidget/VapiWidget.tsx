import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

/**
 * VapiWidget Component
 * 
 * Environment Variables Required (add to .env file):
 * 
 * VITE_VAPI_PUBLIC_KEY - Your Vapi public API key (get from https://dashboard.vapi.ai)
 * VITE_VAPI_ASSISTANT_CLINIC - Assistant ID for Clinic/Spa/Health demo
 * VITE_VAPI_ASSISTANT_INSURANCE - Assistant ID for Insurance demo  
 * VITE_VAPI_ASSISTANT_TRADES - Assistant ID for Trades demo
 */

export interface VapiWidgetHandle {
  start: () => void;
  stop: () => void;
}

interface VapiWidgetProps {
  assistantId: string;
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onError?: (error: string) => void;
  onTranscript?: (message: {
    role: 'assistant' | 'user';
    transcript: string;
    transcriptType: 'partial' | 'final';
  }) => void;
}

const VapiWidget = forwardRef<VapiWidgetHandle, VapiWidgetProps>(
  ({ assistantId, onCallStart, onCallEnd, onError, onTranscript }, ref) => {
    const vapiRef = useRef<Vapi | null>(null);
    const isInitialized = useRef(false);

    // Initialize Vapi instance
  useEffect(() => {
    const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;

    if (!publicKey) {
      onError?.('Demo configuration error. Please try again later.');
      return;
    }

    if (!isInitialized.current) {
      const VapiConstructor: any = (Vapi as any)?.default ?? Vapi;

      if (typeof VapiConstructor !== 'function') {
        onError?.("Demo couldn't start. Please refresh or try again.");
        return;
      }

      try {
        vapiRef.current = new VapiConstructor(publicKey);
        isInitialized.current = true;

          // Set up event listeners
          const vapi = vapiRef.current;
          if (!vapi) return;

          vapi.on('call-start', () => {
            onCallStart?.();
          });

          vapi.on('call-end', () => {
            onCallEnd?.();
          });

          vapi.on('error', (error) => {
            onError?.(error?.message || "Demo couldn't start. Please refresh or try again.");
          });

          vapi.on('message', (message: any) => {
            const isTranscript =
              message?.type === 'transcript' ||
              message?.type === "transcript[transcriptType='final']";
            if (isTranscript && message?.transcript) {
              onTranscript?.({
                role: message.role === 'assistant' ? 'assistant' : 'user',
                transcript: message.transcript,
                transcriptType: message.transcriptType === 'final' ? 'final' : 'partial',
              });
            }
          });

          vapi.on('speech-start', () => {
            // Speech started
          });

          vapi.on('speech-end', () => {
            // Speech ended
          });

        } catch (err) {
          onError?.("Demo couldn't start. Please refresh or try again.");
        }
      }

      return () => {
        // Cleanup on unmount
        if (vapiRef.current) {
          vapiRef.current.stop();
        }
      };
  }, [onCallStart, onCallEnd, onError, onTranscript]);

    // Start call
    const start = useCallback(() => {
      if (!vapiRef.current) {
        onError?.("Demo couldn't start. Please refresh or try again.");
        return;
      }

      if (!assistantId) {
        onError?.('Demo configuration error. Please try again later.');
        return;
      }

      try {
        vapiRef.current.start(assistantId);
      } catch (err) {
        onError?.("Demo couldn't start. Please refresh or try again.");
      }
    }, [assistantId, onError]);

    // Stop call
    const stop = useCallback(() => {
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (err) {
          // Silent fail on stop
        }
      }
    }, []);

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      start,
      stop,
    }), [start, stop]);

    // This component doesn't render anything visible
    // The Vapi SDK handles audio through the browser's audio APIs
    return null;
  }
);

VapiWidget.displayName = 'VapiWidget';

export default VapiWidget;
