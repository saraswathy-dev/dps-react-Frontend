import dpsLogo from '../../assets/DPS.svg';
import './Header.css';
const Header = () => {
	return (
		<div>
			<a href="https://www.digitalproductschool.io/" target="_blank">
				<img src={dpsLogo} className="logo" alt="DPS logo" />
			</a>
		</div>
	);
};
export default Header;
