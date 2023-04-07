import { useState } from 'react';
import classes from './Timeline.module.css';
import { TimelineBar } from './TimelineBar';
import { TimelinePeriodBox } from './TimelinePeriodBox';
import type { TimelineData, Groups } from './timeline.types';

interface ITimelineContent {
  timeline: { year: number; month: string }[];
  transformedData: Required<TimelineData>[];
  getFormattedDateString: (value: string) => string;
  colorMap: Map<Groups, string>;
}

export const TimelineContent = ({ timeline, transformedData, getFormattedDateString, colorMap }: ITimelineContent) => {
  const [activeBarIndex, setActiveBarIndex] = useState<number>(-1);

  const handleBarUpdate = (index?: number) => setActiveBarIndex(index ?? -1);

  return (
    <>
      <div className={classes.periods} style={{ gridTemplateRows: `repeat(${timeline.length}, 1fr)` }}>
        {transformedData.map((item, index) => (
          <TimelineBar
            key={item.title}
            item={item}
            index={index}
            isActive={activeBarIndex === index}
            onBarUpdate={handleBarUpdate}
            accentColor={colorMap.get(item.group)}
          />
        ))}
      </div>
      <div className={classes['periods-content']} style={{ gridTemplateRows: `repeat(${timeline.length}, 1fr)` }}>
        {transformedData.map((item, index) => (
          <TimelinePeriodBox
            key={item.title}
            item={item}
            isActive={activeBarIndex === index}
            getFormattedDateString={getFormattedDateString}
            accentColor={colorMap.get(item.group)}
          />
        ))}
      </div>
    </>
  );
};
