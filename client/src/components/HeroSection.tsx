export default function HeroSection() {
  return (
    <div className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: '#1F2A2B',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 15L30 30L15 15L30 0zM30 30L45 45L30 60L15 45L30 30z' fill='%23C9A96E' fill-opacity='0.05'/%3E%3C/svg%6E")`,
        }}
      />
      
      <div className="relative z-10 text-center px-4 animate-in fade-in duration-700" data-testid="hero-content">
        <h1 
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Your journey
          <br />
          begins here
        </h1>
        <p className="text-lg text-secondary-foreground max-w-md mx-auto">
          Explore the treasures of Islamic knowledge
        </p>
      </div>
    </div>
  );
}
