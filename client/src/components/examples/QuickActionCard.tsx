import QuickActionCard from '../QuickActionCard';

export default function QuickActionCardExample() {
  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-background">
      <QuickActionCard
        title="Hajj"
        subtitle="Reserve your journey"
        gradient="linear-gradient(135deg, #3A4748 0%, #2C3E3F 100%)"
        onClick={() => console.log('Hajj clicked')}
      />
      <QuickActionCard
        title="Umrah"
        subtitle="Book permit"
        gradient="linear-gradient(135deg, #6B5D4F 0%, #5A4A3A 100%)"
        onClick={() => console.log('Umrah clicked')}
      />
      <QuickActionCard
        title="Noble Rawdah"
        subtitle="Book permit"
        gradient="linear-gradient(135deg, #3D5556 0%, #2F4445 100%)"
        onClick={() => console.log('Rawdah clicked')}
      />
    </div>
  );
}
