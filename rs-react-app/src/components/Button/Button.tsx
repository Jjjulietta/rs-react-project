import { Component } from 'react';

interface ButtonProps {
  className: CSSModuleClasses[string];
  type: 'submit' | 'reset' | 'button' | undefined;
  name: string;
  onClick: () => void;
}
export default class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        type={this.props.type}
        className={this.props.className}
        onClick={this.props.onClick}
      >
        {this.props.name}
      </button>
    );
  }
}
