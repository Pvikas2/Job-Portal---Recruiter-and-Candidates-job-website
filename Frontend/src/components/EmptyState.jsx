const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="text-center py-10 text-gray-500">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
