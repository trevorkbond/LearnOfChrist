export interface ScriptureItem {
  verse: number;
  content: string;
  id: number;
}

export default function Scripture(props: ScriptureItem) {
  return (
    <p>
      <strong>{props.verse}</strong> {props.content}
    </p>
  );
}
