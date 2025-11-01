interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  testId?: string;
}

export default function FloatingActionButton({ icon, onClick, testId }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-card flex items-center justify-center hover-elevate active-elevate-2 transition-transform hover:scale-110"
      style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.20)' }}
      data-testid={testId}
    >
      <span className="text-primary-foreground">{icon}</span>
    </button>
  );
}
