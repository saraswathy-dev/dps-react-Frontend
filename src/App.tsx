import React,{useState,useEffect,useMemo} from 'react';
import dpsLogo from './assets/DPS.svg';
import './App.css';

interface Customer{
	id:number;
	firstName:string;
	address:{
		city:string
	}
		birthDate:string
	
}

function App() {
	const [Customer,setCustomer]=useState<Customer[]>([]);
	const [CitySelected,setCitySelected]=useState<string>('');
	const [filteredUser,setfilteredUser]=useState<Customer[]>([]);
	const [searchName,setSearchName]=useState<string>('');

	//Data fetch
	useEffect(()=>{
		const fetchData=async()=>{
			try{
				const response=await fetch(' https://dummyjson.com/users');
				const data=await response.json();

				if(data){
					setCustomer(data.users);
					setfilteredUser(data.users);}
				else{
					console.error('unexpected data format',data);
				}
			}
			catch(error){
				console.log('Error in fetching the data ');
			}
		};
		fetchData();
	},[]);

	//city filter
	const filteredCityUser=useMemo(()=>{
		console.log('city:',CitySelected);
		if(CitySelected)return setfilteredUser(Customer.filter((cus)=>cus.address.city===CitySelected));
	
	},[CitySelected,Customer]);
	console.log('setfilteredUser is',filteredCityUser);

	//name filter
	const filteredName=useMemo(()=>{
		return   setfilteredUser( Customer.filter((cus)=>cus.firstName.toLowerCase().includes(searchName.toLowerCase())));
	},[searchName,Customer]);
	console.log(filteredName);
	
	
	
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			
			<div className="home-card">
				{/* Input */}
				<div className='inner-card'>
					<div>	
						<label htmlFor='name'>Name <input id='name' type='text' placeholder='search by name' onChange={(e)=>{setSearchName(e.target.value)}}/></label>
					</div>
					
					{/* city */}
					<div>
				
						<label htmlFor='city'>City <select id='city' value={CitySelected ||''} 
							onChange={(e)=>{setCitySelected(e.target.value ||''); console.log(e.target.value);}}>
							<option value="">Choose City</option>
							{Customer.map((Cus)=>(
								<option key={Cus.id} value={Cus.address.city}>{Cus.address.city}</option>))}

						</select></label>
					</div>
					{/* checkbox */}
					<div>
						<label htmlFor='oldest city'>Highlight oldest per city <input id='oldestCity' type='checkbox' /></label>
					</div>
					
				</div>
				{/* Table */}
				<div className='center'>
					<table>
						<thead><tr><th>Name</th><th>City</th><th>Birthday</th></tr>
						</thead>
						<tbody>
							{
								filteredUser.map((Cus)=>(
									<tr key={Cus.id}>
										<td>{Cus.firstName}</td>
										<td>{Cus.address.city}</td>
										<td>{Cus.birthDate}</td>
									</tr>
								))
							}
							
							
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default App;
