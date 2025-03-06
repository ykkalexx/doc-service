interface LabelProps {
  children: React.ReactNode;
  type: "document" | "image" | "spreadsheet" | "presentation";
  date?: string;
}

const labelStyles = {
  document: {
    border: "border-blue-900/60",
    background: "bg-blue-500/10",
    text: "text-blue-900",
  },
  image: {
    border: "border-green-900/60",
    background: "bg-green-500/10",
    text: "text-green-900",
  },
  spreadsheet: {
    border: "border-purple-900/60",
    background: "bg-purple-500/10",
    text: "text-purple-900",
  },
  presentation: {
    border: "border-amber-900/60",
    background: "bg-amber-500/10",
    text: "text-amber-900",
  },
};

export const Label = ({ children, type, date }: LabelProps) => {
  const styles = labelStyles[type];

  return (
    <div
      className={`
          flex flex-col items-center justify-center 
          font-light px-4 py-1 rounded-xl 
          border-[1px] ${styles.border} ${styles.background}
          transition-all duration-200
        `}
    >
      <h1 className={`text-xs font-medium ${styles.text}`}>{children}</h1>
      {date && <p className={`text-xs mt-1 ${styles.text}/80`}>{date}</p>}
    </div>
  );
};
