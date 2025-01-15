import dpsLogo from './assets/DPS.svg';
import './App.css';

function App() {
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
						<label htmlFor='name'>Name <input id='name' type='text' placeholder='search by name'/></label>
					</div>
					
					{/* city */}
					<div>
				
						<label htmlFor='city'>City <select id='city'><option value=''>--choose City--</option>
						</select></label>
					</div>
					{/* checkbox */}
					<div>
						<label htmlFor='oldest city'>Highlight oldest per city <input id='oldestCity' type='checkbox' /></label>
					</div>
					
				</div>

				<div className='center'>
					<table>
						<thead><tr><th>Name</th><th>City</th><th>Birthday</th></tr>
						</thead>
						<tbody>
							<tr>
								<td>sara</td>
								<td>munich</td>
								<td>28-11-1998</td>
							</tr>
							<tr>
								<td>sara</td>
								<td>munich</td>
								<td>28-11-1998</td>
							</tr>
							<tr>
								<td>sara</td>
								<td>munich</td>
								<td>28-11-1998</td>
							</tr>
							
						</tbody>
					</table>
				</div>
			</div>
			
			
		</>
	);
}

export default App;
