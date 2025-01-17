/* eslint-disable indent */
import { useState, useEffect, useMemo } from 'react';
import './App.css';
import Header from './component/Header/Header';
import Filter from './component/Filters/Filter';
import Table from './component/Table/Table';
import Spinner from './component/Spinner/Spinner';

export interface Customer {
	id: number;
	firstName: string;
	address: {
		city: string;
	};
	age: number;
	birthDate: string;
}

interface ApiResponse {
	users: Customer[];
}

function App() {
	const [customers, setCustomer] = useState<Customer[]>([]);
	const [citySelected, setCitySelected] = useState<string>('');
	const [filteredUser, setFilteredUser] = useState<Customer[]>([]);
	const [searchName, setSearchName] = useState<string>('');
	const [debounceSearchName, setDebounceSearchName] = useState<string>('');
	const [selectOldest, setSelectOldest] = useState<boolean>(false);
	const [oldestAge, setOldestAge] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	//Data fetch
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch('https://dummyjson.com/users');
				if (!response.ok) {
					throw new Error(
						`HTTP error occured! Status:${response.status}`
					);
				}
				const data: ApiResponse = await response.json();

				if (data && data.users) {
					setCustomer(data.users);
					setFilteredUser(data.users);
				} else {
					throw new Error('unexpected data format');
				}
			} catch (error) {
				const errorMessage =
					(error as Error).message || 'Error in fetching the data';
				setError(errorMessage);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	//error handling
	useEffect(() => {
		if (error) {
			window.alert(error);
		}
	}, [error]);

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
			<Header></Header>
			<div className="home-card">
				<Filter
					searchName={searchName}
					setSearchName={setSearchName}
					citySelected={citySelected}
					setCitySelected={setCitySelected}
					selectOldest={selectOldest}
					setSelectOldest={setSelectOldest}
					cityArray={cityArray}
				></Filter>
				{loading ? (
					<Spinner></Spinner>
				) : (
					<Table
						customers={filteredUser}
						selectOldest={selectOldest}
						oldestAge={oldestAge}
					></Table>
				)}
			</div>
		</>
	);
}

export default App;
