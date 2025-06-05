import React from "react";
import "./searchInput.css";
interface Props {
	Label?: string;
	value: string;
	labelHorizontal?: boolean;
	onChange?: (value: string) => void;
	placeholder: string;
}

const SearchInput: React.FC<Props> = ({
	Label = "",
	labelHorizontal = false,
	value = "",
	onChange,
	placeholder = "",
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.target.value);
		}
	};

	return (
		<div
			className={`SearchContainer ${labelHorizontal ? "horizontal" : ""}`}
		>
			{Label && <label>{Label}</label>}

			<div className="searchInputWrapper">
				<input
					className="searchInput"
					placeholder={placeholder}
					type="text"
					onChange={handleInputChange}
				/>
				<button type="button">
					<img
						src="/search.svg"
						alt="Search"
						width={16}
						height={16}
					/>
				</button>
			</div>
		</div>
	);
};

export default SearchInput;
