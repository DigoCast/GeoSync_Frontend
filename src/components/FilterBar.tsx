import type { ReactNode } from "react";

interface FilterBarProps {
  filters?: ReactNode;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onAdd?: () => void;
  addLabel?: string;
}

export const FilterBar = ({
  filters,
  searchPlaceholder = "Buscar...",
  onSearchChange,
  onAdd,
  addLabel = "Adicionar",
}: FilterBarProps) => {
  const hasFilters = Boolean(filters);
  return (
    <div className="flex flex-wrap items-center bg-card-background p-4 rounded-lg shadow-sm border border-border gap-3">
      {hasFilters && <div className="flex gap-3 flex-wrap shrink-0 w-full sm:w-auto">{filters}</div>}
      <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full ${hasFilters ? "sm:flex-1" : "flex-1"}`}>
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className={`
            px-3 py-2 rounded-lg border border-border text-text-primary
            focus:outline-none focus:ring-2 focus:ring-primary transition
            w-full ${hasFilters ? "sm:flex-1" : "flex-1"}
          `}
        />
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-primary hover:gradient-dynamic text-white px-4 py-2 rounded-lg cursor-pointer w-full sm:w-auto shrink-0"
        >
          <i className="fa-solid fa-plus"></i>
          {addLabel}
        </button>
      </div>
    </div>
  );
};