export default function Loading() {
  return (
    <main className="w-full min-h-screen" style={{ backgroundColor: 'var(--kp-bg-base)' }}>
      {/* NAVBAR SKELETON */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm" style={{ backgroundColor: 'rgba(250,247,242,0.94)', borderBottom: '1px solid var(--kp-border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="h-6 w-32 animate-pulse rounded" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-pulse rounded" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
            <div className="h-8 w-8 animate-pulse rounded" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
          </div>
        </div>
      </nav>

      {/* HERO SKELETON */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* COVER SKELETON */}
            <div className="aspect-[4/3] rounded-lg animate-pulse" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />

            {/* CONTENT SKELETON */}
            <div className="space-y-6">
              <div className="h-6 w-24 animate-pulse rounded-full" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
              <div className="h-10 w-3/4 animate-pulse rounded" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
              <div className="h-6 w-1/2 animate-pulse rounded" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
              <div className="h-4 w-full animate-pulse rounded" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
              <div className="h-4 w-5/6 animate-pulse rounded" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
              <div className="h-20 w-full animate-pulse rounded-lg" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
              <div className="flex gap-3">
                <div className="h-12 w-40 animate-pulse rounded-lg" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
                <div className="h-12 w-40 animate-pulse rounded-lg" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
