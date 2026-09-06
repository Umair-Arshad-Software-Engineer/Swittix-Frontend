import { Component } from 'react';

export class AdminErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Check your browser console for this — it'll show exactly what field/value broke.
    console.error('Admin dashboard render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#05070C] px-6 text-center">
          <p className="text-lg font-extrabold text-[#F3F6FB]">Something went wrong rendering this view.</p>
          <p className="max-w-md text-sm text-[#93A0B8]">
            {this.state.error.message || 'Unknown error.'}
          </p>
          <button
            onClick={() => this.setState({ error: null })}
            className="mt-2 rounded-lg border border-[#1A2233] px-4 py-2 text-sm font-semibold text-[#93A0B8] hover:text-[#F3F6FB]"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}