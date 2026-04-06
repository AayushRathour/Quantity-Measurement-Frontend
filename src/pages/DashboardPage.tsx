import { useAuth } from '../hooks/useAuth'
import { useQuantity } from '../hooks/useQuantity'
import { UNIT_OPTIONS } from '../constants/units'
import TypeSelector from '../components/dashboard/TypeSelector'
import ActionButtons from '../components/dashboard/ActionButtons'
import ValueInput from '../components/dashboard/ValueInput'
import OperatorPanel from '../components/dashboard/OperatorPanel'
import ResultPanel from '../components/dashboard/ResultPanel'
import PageHeader from '../components/shared/PageHeader'
import '../styles/dashboard.css'

export default function DashboardPage() {
  const { logout } = useAuth()

  const {
    selectedType, changeType,
    action,       changeAction,
    value1,       setValue1,
    unit1,        setUnit1,
    value2,       setValue2,
    unit2,        setUnit2,
    resultUnit,   setResultUnit,
    operator,     setOperator,
    result,       loading, error,
    execute,
  } = useQuantity()

  const units = UNIT_OPTIONS[selectedType]

  const showOperator = action === 'arithmetic'

  // For conversion, VALUE 2 slot becomes "target unit" selector
  const showValue2   = action !== 'conversion'

  return (
    <div className="dash-body">
      <div className="dash-container">
        <PageHeader
          title="Welcome to Quantity Measurement"
          subtitle="Run conversions, compare values, or review saved results."
          actions={[
            { label: 'Home', to: '/', variant: 'secondary' },
            { label: 'History', to: '/history', variant: 'secondary' },
            { label: 'Logout', onClick: logout, variant: 'ghost' },
          ]}
        />

        {/* ── Type selector ── */}
        <TypeSelector selected={selectedType} onChange={changeType} />

        {/* ── Action buttons ── */}
        <ActionButtons selected={action} onChange={changeAction} />

        {/* ── Value inputs + operator ── */}
        <div className="values">
          {/* VALUE 1 */}
          <ValueInput
            label="VALUE 1"
            value={value1}
            unit={unit1}
            unitOptions={units}
            onValueChange={setValue1}
            onUnitChange={setUnit1}
          />

          {/* Middle: operator panel (arithmetic) or spacer (comparison/conversion) */}
          {showOperator ? (
            <OperatorPanel selected={operator} onChange={setOperator} />
          ) : (
            <div style={{ textAlign: 'center', fontSize: 24, color: 'var(--dash-primary)', fontWeight: 700 }}>
              {action === 'conversion' ? '→' : '≟'}
            </div>
          )}

          {/* VALUE 2 or Target Unit for conversion */}
          {showValue2 ? (
            <ValueInput
              label="VALUE 2"
              value={value2}
              unit={unit2}
              unitOptions={units}
              onValueChange={setValue2}
              onUnitChange={setUnit2}
            />
          ) : (
            /* Conversion: only pick target unit */
            <div className="value-box">
              <p>TARGET UNIT</p>
              <select
                value={resultUnit}
                onChange={(e) => setResultUnit(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: 4 }}
              >
                {units.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* ── Calculate button ── */}
        <button
          type="button"
          className="btn-calculate"
          onClick={execute}
          disabled={loading}
        >
          {loading ? 'Calculating…' : 'Calculate'}
        </button>

        {/* ── API error ── */}
        {error && <div className="api-error">{error}</div>}

        {/* ── Result ── */}
        <ResultPanel
          result={result}
          resultUnit={resultUnit}
          unitOptions={units}
          onResultUnitChange={setResultUnit}
        />

      </div>
    </div>
  )
}
