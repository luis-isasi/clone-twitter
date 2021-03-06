import { colors } from '@styles/theme'

import { ButtonProps } from './type'

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  disabled,
  backgroundColor,
  colorText,
}) => {
  return (
    <>
      <button onClick={onClick} type={type} disabled={disabled}>
        {children}
      </button>
      <style jsx>{`
        button {
          background-color: ${backgroundColor
            ? `${backgroundColor}`
            : `${colors.primary}`};
          color: ${colorText || '#fff'};
          border-radius: 24px;
          border: none;
          cursor: pointer;
          padding: 8px 16px;
          font-weight: 600;
          box-shadow: 0px 0px 5px #d4cdcd;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        button > :global(svg) {
          margin-right: 8px;
        }

        button:hover {
          opacity: 0.8;
        }

        button:disabled {
          pointer-events: none;
          opacity: 0.6;
        }
      `}</style>
    </>
  )
}

export default Button
