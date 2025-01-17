/* eslint-disable linebreak-style */
import React from 'react';
import './Filter.css';
interface FilterProps {
	searchName: string;
	setSearchName: React.Dispatch<React.SetStateAction<string>>;
	citySelected: string;
	setCitySelected: React.Dispatch<React.SetStateAction<string>>;
	selectOldest: boolean;
	setSelectOldest: React.Dispatch<React.SetStateAction<boolean>>;
	cityArray: string[];
}

const Filter: React.FC<FilterProps> = ({
	searchName,
	setSearchName,
	citySelected,
	setCitySelected,
	selectOldest,
	setSelectOldest,
	cityArray,
}) => {
	return (
		<div className="inner-card">
			<div>
				<label htmlFor="name">
					Name
					<div className="input-container">
						<input
							id="name"
							type="text"
							placeholder="search by name"
							value={searchName}
							onChange={(e) => {
								setSearchName(e.target.value);
							}}
						/>
						<button
							type="button"
							onClick={() => {
								setSearchName('');
							}}
						>
							X
						</button>
					</div>
				</label>
			</div>

			{/* city */}
			<div>
				<label htmlFor="city">
					City{' '}
					<select
						id="city"
						value={citySelected || ''}
						onChange={(e) => {
							setCitySelected(e.target.value || '');
						}}
					>
						<option value="">Choose City</option>
						{cityArray.map((customer) => (
							<option key={customer} value={customer}>
								{customer}
							</option>
						))}
					</select>
				</label>
			</div>
			{/* checkbox */}
			<div>
				<label htmlFor="oldest city">
					Highlight oldest per city{' '}
					<input
						id="oldestCity"
						type="checkbox"
						checked={selectOldest}
						onChange={(e) => setSelectOldest(e.target.checked)}
					/>
				</label>
			</div>
		</div>
	);
};

export default Filter;
