/* eslint-disable linebreak-style */
import React from 'react';
import './Table.css';
import { Customer } from '../../App';

interface TableProps {
	customers: Customer[];
	selectOldest: boolean;
	oldestAge: string;
}
function formatDate(input: string): string {
	const [year, month, day] = input.split('-');
	const padMonth = month.padStart(2, '0');
	const padDay = day.padStart(2, '0');
	return `${padDay}-${padMonth}-${year}`;
}

const Table: React.FC<TableProps> = ({
	customers,
	selectOldest,
	oldestAge,
}) => {
	return (
		<div className="center">
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>City</th>
						<th>Birthday</th>
					</tr>
				</thead>

				<tbody>
					{customers.length > 0 ? (
						customers.map((customer) => (
							<tr
								key={customer.id}
								style={{
									backgroundColor:
										selectOldest &&
										oldestAge === customer.birthDate
											? 'skyblue'
											: 'white',
								}}
							>
								<td>{customer.firstName}</td>
								<td>{customer.address.city}</td>
								<td>{formatDate(customer.birthDate)}</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={0}
								style={{
									textAlign: 'center',
									backgroundColor: 'rgb(218, 163, 60)',
								}}
							></td>
							Record not found!
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
export default Table;
