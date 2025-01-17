import { useState, useEffect, useMemo } from 'react';
import dpsLogo from './assets/DPS.svg';
import './App.css';

interface Customer {
	id: number;
	firstName: string;
	address: {
		city: string;
	};
	age: number;
	birthDate: string;
}

function App() {
	const [customers, setCustomer] = useState<Customer[]>([]);
	const [citySelected, setCitySelected] = useState<string>('');
	const [filteredUser, setFilteredUser] = useState<Customer[]>([]);
	const [searchName, setSearchName] = useState<string>('');
	const [debounceSearchName, setDebounceSearchName] = useState<string>('');
	const [selectOldest, setSelectOldest] = useState<boolean>(false);
	const [oldestAge, setOldestAge] = useState<string>('');

	//Data fetch
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(' https://dummyjson.com/users');
				const data = await response.json();

				if (data) {
					setCustomer(data.users);
					setFilteredUser(data.users);
				} else {
					console.error('unexpected data format', data);
				}
			} catch (error) {
				console.log('Error in fetching the data ');
			}
		};
		fetchData();
	}, []);

	//filter duplicate city
	const cityArray = useMemo(() => {
		return Array.from(
			new Set(customers.map((customer) => customer.address.city))
		);
	}, [customers]);

	//debounceSearchName

	useEffect(() => {
		const delayHandler = setTimeout(() => {
			setDebounceSearchName(searchName);
		}, 1000);
		return () => {
			clearTimeout(delayHandler);
		};
	}, [searchName]);

	//Name and city filter
	useEffect(() => {
		const filteredUser = customers.filter((customer) => {
			const filteredCity = citySelected
				? customer.address.city === citySelected
				: true;

			const filteredName = searchName
				? customer.firstName
						.toLowerCase()
						.includes(debounceSearchName.toLowerCase())
				: true;
			return filteredCity && filteredName;
		});
		setFilteredUser(filteredUser);
	}, [citySelected, customers, debounceSearchName, searchName]);

	//Highlight oldest per city

	useEffect(() => {
		if (filteredUser && filteredUser.length > 0) {
			const oldestBirthDate = filteredUser.filter(
				(user) =>
					user.age === Math.max(...filteredUser.map((u) => u.age))
			)[0].birthDate;
			setOldestAge(oldestBirthDate);
		}
	}, [filteredUser]);

	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>

			<div className="home-card">
				{/* Input */}
				<div className="inner-card">
					<div>
						<label htmlFor="name">
							Name{' '}
							<input
								id="name"
								type="text"
								placeholder="search by name"
								onChange={(e) => {
									setSearchName(e.target.value);
								}}
							/>
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
									console.log(e.target.value);
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
								value=""
								onChange={(e) =>
									setSelectOldest(e.target.checked)
								}
							/>
						</label>
					</div>
				</div>
				{/* Table */}
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
							{filteredUser.map((customer) => (
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
									<td>{customer.birthDate}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default App;
