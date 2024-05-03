import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  TEAM: "team",
};

const DraggableItem = ({ data, onUpdate }) => {
  const [cannotUpdate, setCannotUpdate] = useState();
  const [{ isDragging }, drag] = useDrag({
    item: { ...data },
    type: ItemTypes.TEAM,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TEAM,
    hover(item) {
      if (!dragRef.current) {
        return;
      }
      setCannotUpdate(item);
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
      className={`default-employeechart ${
        isOver && cannotUpdate?.data?.level !== data?.data?.level
          ? "employeechart"
          : ""
      }  `}
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
          <li className="card" key={item?.id}>
            <DraggableItem data={item} index={item?.id} onUpdate={onUpdate} />
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
