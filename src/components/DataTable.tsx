interface DataTableProps {
    columns: string[];
    rows: (string | React.ReactNode)[][];
}

const DataTable = ({columns, rows}: DataTableProps) => {
  return (
    <div className="w-full bg-card-background rounded-lg shadow-md border border-border overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-surface text-text-secondary">
                <tr>
                    {columns.map((col) => (
                        <th key={col} className="px-4 py-3">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="text-text-primary">
                {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-hover transition-colors">
                        {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 border-t border-border">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default DataTable