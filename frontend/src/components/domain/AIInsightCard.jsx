import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";

export const AIInsightCard = ({ insight }) => {
  return (
    <Card tier="base" className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container/15 flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-[22px]">psychology</span>
          </div>
          <div>
            <h3 className="text-headline-sm text-primary font-semibold">{insight.title}</h3>
            <p className="text-body-sm text-on-surface-variant">{insight.category}</p>
          </div>
        </div>
        <StatusBadge type="aiReady" label="AI Insight" pulse />
      </div>

      <p className="text-body-md text-on-surface mb-4 leading-relaxed">
        {insight.description}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-surface-container">
          <span className="text-label-sm text-on-surface-variant uppercase">Tickets</span>
          <p className="text-headline-md text-primary font-bold mt-1">{insight.ticketCount}</p>
        </div>
        <div className="p-3 rounded-lg bg-surface-container">
          <span className="text-label-sm text-on-surface-variant uppercase">Percentage</span>
          <p className="text-headline-md text-primary font-bold mt-1">{insight.percentage}%</p>
        </div>
        <div className="p-3 rounded-lg bg-surface-container">
          <span className="text-label-sm text-on-surface-variant uppercase">Trend</span>
          <p className="text-headline-md text-[#FFC048] font-bold mt-1">{insight.trend}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
        <span className="text-body-sm text-on-surface-variant">
          Produk terkait: <strong className="text-primary">{insight.relatedProduct}</strong>
        </span>
        <button className="text-primary-container hover:text-primary-fixed font-label-md flex items-center gap-1">
          Detail <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </Card>
  );
};

export default AIInsightCard;