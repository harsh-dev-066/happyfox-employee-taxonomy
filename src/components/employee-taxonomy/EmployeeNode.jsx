import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ITEM_TYPES = {
  TEAM: "team",
};

const DraggableElement = ({ data, onUpdate }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...data },
    type: ITEM_TYPES.TEAM,
    collect: (monitor) => ({
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
    drop(item) {
      onUpdate(item, data);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const dragRef = useRef(null);
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

const EmployeeNode = ({ data, onUpdate }) => {
  return (
    <ul>
      {data?.map((item) => {
        return (
          <li key={item?.id}>
            <DraggableElement
              data={item}
              index={item?.id}
              onUpdate={onUpdate}
            />
            {item?.children?.length > 0 && (
              <EmployeeNode data={item.children} onUpdate={onUpdate} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default EmployeeNode;
