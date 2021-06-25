import React 		from 'react';
import { Nav } 		from '../../components';
import 				'./template.css';

const Template = props => {
	return (
		<div className="bg-layer">
			<div className="fg-layer">
				<label className="logo">Bruce's Diner</label>
				{/* display nav component */}
				<Nav />
				{ props.children }
			</div>
		</div>
	);
}

export default Template;