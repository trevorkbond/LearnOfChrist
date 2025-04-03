import Link from "next/link";

export interface ListItem {
  itemId: number;
  content: string | null;
}

interface Props extends ListItem {
  prevUrl: string;
}

export default function ListItemComponent(props: Props) {
  return (
    <Link href={`${props.prevUrl}/${props.itemId}`} className="py-5">
      {props.content}
    </Link>
  );
}
