interface ButtonProps {
  className: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  onClick?: () => void;
}
export const Button = ({ className, type, name, onClick }: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {name}
    </button>
  );
};
