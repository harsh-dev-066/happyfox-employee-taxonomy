import { useRef } from "react";
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from "react-dnd";
import { EmployeeNode as EmployeeNodeType } from "../../types/types";

interface DraggableElementProps {
  data: EmployeeNodeType;
  onUpdate: (item: EmployeeNodeType, data: EmployeeNodeType) => void;
}

const ITEM_TYPES = {
  TEAM: "team",
};

const DraggableElement: React.FC<DraggableElementProps> = ({
  data,
  onUpdate,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...data },
    type: ITEM_TYPES.TEAM,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPES.TEAM,
    hover() {
      if (!dragRef.current) {
        return;
      }
    },
    drop(item: EmployeeNodeType) {
      onUpdate(item, data);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const dragRef = useRef<HTMLDivElement>(null);
  drag(drop(dragRef));

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      <div className="node">
        <div>
          <div className="image">
            <img alt={data?.id} src={data?.image} />
          </div>
          <div>
            <div className="name"> {data?.name} </div>
            <div className="designation"> {data?.designation} </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EmployeeNodeProps {
  data: EmployeeNodeType[];
  onUpdate: (item: EmployeeNodeType, data: EmployeeNodeType) => void;
}

const EmployeeNode: React.FC<EmployeeNodeProps> = ({ data, onUpdate }) => {
  return (
    <ul>
      {data?.map((item) => (
        <li key={item.id}>
          <DraggableElement data={item} onUpdate={onUpdate} />
          {item.children && item.children.length > 0 && (
            <EmployeeNode data={item.children} onUpdate={onUpdate} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default EmployeeNode;
