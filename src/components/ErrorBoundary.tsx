'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Coffee, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-[#1a1816] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <Coffee className="w-16 h-16 mx-auto mb-6 text-[#8b7355] opacity-40" />
            <h2 className="font-serif text-2xl mb-4 opacity-90">Ada yang salah</h2>
            <p className="text-sm opacity-60 mb-6">
              Seperti kopi yang tumpah, ada yang tidak beres. Coba refresh halaman.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 
                       bg-[#8b7355] text-white rounded-full
                       hover:bg-[#6b5635] transition-colors text-sm"
            >
              <RefreshCw size={18} />
              <span>Refresh Halaman</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
