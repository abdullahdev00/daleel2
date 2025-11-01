import CategoryFilter from '../CategoryFilter';

export default function CategoryFilterExample() {
  return (
    <div className="bg-background p-4">
      <CategoryFilter onCategoryChange={(cat) => console.log('Category changed:', cat)} />
    </div>
  );
}
