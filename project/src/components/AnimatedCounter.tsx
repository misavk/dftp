import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ end, suffix = '', duration = 2.5 }: AnimatedCounterProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <CountUp
          end={end}
          duration={duration}
          separator="."
          suffix={suffix}
          enableScrollSpy
        />
      ) : (
        '0'
      )}
    </div>
  );
};

export default AnimatedCounter;