import Checkbox from "../Checkbox/Checkbox";
import ListItemComponent, { ListItem } from "./ListItem";

interface Props {
  items: ListItem[];
  prevUrl: string;
  listTitle: string;
  isCheckboxList?: boolean;
}

export default function List(props: Props) {
  return (
    <>
      <div className="text-center">
        <p className="text-2xl font-bold">{props.listTitle}</p>
      </div>
      <div className="mt-3 border-t border-t-gray-700">
        {props.items.map((item) => (
          <div
            className="flex w-full px-10 justify-between align-middle border-b border-b-gray-700"
            key={item.itemId}
          >
            <ListItemComponent
              prevUrl={props.prevUrl}
              itemId={item.itemId}
              content={item.content}
            />
            {props.isCheckboxList && <Checkbox reference_id={item.itemId} />}
          </div>
        ))}
      </div>
    </>
  );
}
