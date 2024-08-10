import { Label } from "../../types/interface";
import "./labels.scss";

export const Labels = ({ labels }: { labels: Label[] }) => {
  const _labels = labels.length
    ? labels.map(label => <li key={label.id}>{label.name}</li>)
    : "";

    if (labels) {
      return <ul className="labels">{_labels}</ul>
    }
    return <></>;
};
