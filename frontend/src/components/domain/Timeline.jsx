import React from "react";

export const Timeline = ({ events }) => {
  return (
    <div className="relative pl-6 flex flex-col gap-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
      {events.map((event, idx) => (
        <div key={idx} className="relative flex flex-col">
          <span
            className={`absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
              event.active
                ? "bg-amber-500 animate-pulse"
                : event.highlight
                ? "bg-slate-900"
                : "bg-slate-300"
            }`}
          ></span>
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span
              className={`text-xs font-semibold ${
                event.active
                  ? "text-amber-600"
                  : event.highlight
                  ? "text-slate-900"
                  : "text-slate-800"
              }`}
            >
              {event.title}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">{event.time}</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Timeline;