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
      console.error('VITE_VAPI_PUBLIC_KEY is not set');
      onError?.('Demo configuration error. Please try again later.');
      return;
    }

    if (!isInitialized.current) {
      const VapiConstructor: any = (Vapi as any)?.default ?? Vapi;

      if (typeof VapiConstructor !== 'function') {
        console.error('Vapi SDK not available or invalid export:', VapiConstructor);
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
            console.log('Vapi call started');
            onCallStart?.();
          });

          vapi.on('call-end', () => {
            console.log('Vapi call ended');
            onCallEnd?.();
          });

          vapi.on('error', (error) => {
            console.error('Vapi error:', error);
            onError?.(error?.message || "Demo couldn't start. Please refresh or try again.");
          });

          vapi.on('message', (message: any) => {
            console.log('Vapi message event:', message);
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
            console.log('Assistant started speaking');
          });

          vapi.on('speech-end', () => {
            console.log('Assistant stopped speaking');
          });

        } catch (err) {
          console.error('Failed to initialize Vapi:', err);
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
        console.error('Failed to start Vapi call:', err);
        onError?.("Demo couldn't start. Please refresh or try again.");
      }
    }, [assistantId, onError]);

    // Stop call
    const stop = useCallback(() => {
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (err) {
          console.error('Failed to stop Vapi call:', err);
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
