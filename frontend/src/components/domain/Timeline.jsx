export const Timeline = ({ events }) => {
  return (
    <div className="relative pl-6 flex flex-col gap-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-highest">
      {events.map((event, idx) => (
        <div key={idx} className="relative flex flex-col">
          <span
            className={`absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full ${
              event.active
                ? "bg-[#FFC048] animate-pulse"
                : event.highlight
                ? "bg-primary-container shadow-cyan-glow"
                : "bg-surface-container-highest"
            }`}
          ></span>
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span
              className={`text-label-md font-semibold ${
                event.active
                  ? "text-[#FFC048]"
                  : event.highlight
                  ? "text-brand-cyan"
                  : "text-on-surface"
              }`}
            >
              {event.title}
            </span>
            <span className="text-code-sm text-on-surface-variant">{event.time}</span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-0.5">{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Timeline;