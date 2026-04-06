interface Props {
  label: string
  value: string
  unit: string
  unitOptions: string[]
  onValueChange: (v: string) => void
  onUnitChange: (u: string) => void
}

export default function ValueInput({
  label,
  value,
  unit,
  unitOptions,
  onValueChange,
  onUnitChange,
}: Props) {
  return (
    <div className="value-box">
      <p>{label}</p>
      <input
        type="number"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
      <select value={unit} onChange={(e) => onUnitChange(e.target.value)}>
        {unitOptions.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>
    </div>
  )
}
