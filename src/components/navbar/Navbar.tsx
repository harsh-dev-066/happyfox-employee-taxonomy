import "./style.scss";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <div className="navbar">
      <div className="title">{title}</div>
    </div>
  );
};

export default Header;
