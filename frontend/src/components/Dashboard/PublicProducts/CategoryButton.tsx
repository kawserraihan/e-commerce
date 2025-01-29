const CategoryButton = ({
    isActive,
    label,
    onClick,
  }: {
    isActive: boolean;
    label: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`font-medium px-2 pb-1 hover:text-green-500 transition ${
        isActive
          ? "text-green-500 border-b-2 border-green-500"
          : "text-gray-500"
      }`}
    >
      {label}
    </button>
  );
  