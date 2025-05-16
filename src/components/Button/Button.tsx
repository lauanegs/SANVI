
import React from "react"
import styles from "./button.module.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante do botão que define seu estilo visual
   */
  variant?: "primary" | "secondary" | "ghost" | "outline"
  /**
   * Tamanho do botão
   */
  size?: "sm" | "md" | "lg" | "icon"
  /**
   * Se o botão deve ocupar toda a largura disponível
   */
  fullWidth?: boolean
  /**
   * Se o botão está em estado de carregamento
   */
  isLoading?: boolean
  /**
   * Ícone a ser exibido antes do texto do botão
   */
  startIcon?: React.ReactNode
  /**
   * Ícone a ser exibido depois do texto do botão
   */
  endIcon?: React.ReactNode
}

/**
 * Componente Button customizável para ações na interface
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      startIcon,
      endIcon,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    // Determinar as classes CSS com base nas props
    const buttonClasses = [
      styles.button,
      styles[`button-${variant}`],
      styles[`button-${size}`],
      fullWidth ? styles.fullWidth : "",
      isLoading ? styles.loading : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <button ref={ref} className={buttonClasses} disabled={disabled || isLoading} {...props}>
        {isLoading && (
          <span className={styles.spinner}>
            <span className={styles.spinnerDot}></span>
            <span className={styles.spinnerDot}></span>
            <span className={styles.spinnerDot}></span>
          </span>
        )}

        {!isLoading && startIcon && <span className={styles.startIcon}>{startIcon}</span>}

        {children && <span className={styles.content}>{children}</span>}

        {!isLoading && endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button


// import styles from "./Button.module.css";

// type ButtonProps = {
//     value: string,
//     color: "normal" | "contraste" | "escuro",
//     onClick: any

// }

// function Button(props : ButtonProps ) {
//   return (
//     <button className={styles.button} 
//             style={{
//                     backgroundColor: style(props.color).bg,
//                     color: style(props.color).font
//                 }}
//             onClick={props.onClick}
//     >
//         {props.value}
//     </button>
//   )
// }

// const style = (cor : string) => {
//     switch (cor){
//         case 'normal':
//             return {bg: '#1E87F0', font: '#FFFFFF'};
//             break;
        
//         case 'contraste':
//             return {bg: '#FFFFFF', font: '#1E87F0'};
//             break;

//         case 'escuro':
//             return {bg: '#0060C0', font: '#FFFFFF'};
//             break;
        
//         default:
//             return {bg: '#FFFFFF', font: '#FFFFFF'};
//             break;
//     }
// }

// export default Button

