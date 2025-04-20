import { components } from './components/custom';
import { createProcessor } from './utils/processor';
import '../style.scss';

interface TiptapRendererProps {
  children: string;
}

const TiptapRenderer = ({ children }: TiptapRendererProps) => {
  const processor = createProcessor({ components });
  const processed = processor.processSync(children);
  return processed.result;
};

export default TiptapRenderer;
