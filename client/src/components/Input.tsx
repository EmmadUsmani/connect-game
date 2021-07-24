import styled from "styled-components"

interface InputProps {
  value: string
  autoFocus?: boolean
  disabled?: boolean
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
  onClick?(): void
}

interface StyledInputProps {
  clickable: boolean
}

const StyledInput = styled.input<StyledInputProps>`
  width: ${(props) => props.theme.sizes.button.width}px;
  height: ${(props) => props.theme.sizes.button.height}px;
  box-sizing: border-box;
  text-align: center;
  outline: none;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: ${(props) => props.theme.sizes.text.small}px;
  cursor: ${(props) => (props.clickable ? "pointer" : "auto")};
`

export function Input({
  value,
  autoFocus,
  disabled,
  onChange,
  onClick,
}: InputProps) {
  return (
    <div onClick={onClick}>
      <StyledInput
        autoFocus={autoFocus}
        clickable={onClick ? true : false}
        disabled={disabled}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
