import React from "react";
import PropTypes from 'prop-types';

const defaultProps = {
	color: "#bebebe"
}
const propTypes = {
	color: PropTypes.string
}

const Heart = ({ color }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className="heart_icon" width="32" height="29" viewBox="0 0 32 29" style={{ fill: color ? color : "" }} >
			<path fill={color ? color : "none"} fillRule="nonzero" stroke={color ? color : "#202022"} strokeWidth="2" d="M28.62 3.642a8.025 8.025 0 0 0-6-2.642c-1.732 0-3.318.554-4.714 1.646A9.708 9.708 0 0 0 16 4.659a9.702 9.702 0 0 0-1.906-2.013C12.698 1.554 11.112 1 9.381 1A8.025 8.025 0 0 0 3.38 3.642C1.845 5.326 1 7.627 1 10.12c0 2.567.946 4.916 2.975 7.394 1.816 2.217 4.426 4.467 7.449 7.072 1.032.89 2.202 1.899 3.416 2.973a1.748 1.748 0 0 0 2.32 0c1.214-1.074 2.384-2.083 3.417-2.973 3.022-2.605 5.632-4.855 7.448-7.072C30.055 15.036 31 12.687 31 10.12c0-2.493-.845-4.794-2.38-6.478z" />
		</svg>
	)
};

const RightPagination = ({ color }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="10" height="10" viewBox="0 0 284.936 284.936" style={{ fill: color ? color : "" }} space="preserve">
			<g> <g> <g>
				<path d="M277.515,135.9L144.464,2.857C142.565,0.955,140.375,0,137.9,0c-2.472,0-4.659,0.955-6.562,2.857l-14.277,14.275    c-1.903,1.903-2.853,4.089-2.853,6.567c0,2.478,0.95,4.664,2.853,6.567l112.207,112.204L117.062,254.677    c-1.903,1.903-2.853,4.093-2.853,6.564c0,2.477,0.95,4.667,2.853,6.57l14.277,14.271c1.902,1.905,4.089,2.854,6.562,2.854    c2.478,0,4.665-0.951,6.563-2.854l133.051-133.044c1.902-1.902,2.851-4.093,2.851-6.567S279.417,137.807,277.515,135.9z" data-original="#000000" className="active-path" data-old_color="#000000" style={{ fill: color ? color : "" }} />
				<path d="M170.732,142.471c0-2.474-0.947-4.665-2.857-6.571L34.833,2.857C32.931,0.955,30.741,0,28.267,0s-4.665,0.955-6.567,2.857    L7.426,17.133C5.52,19.036,4.57,21.222,4.57,23.7c0,2.478,0.95,4.664,2.856,6.567L119.63,142.471L7.426,254.677    c-1.906,1.903-2.856,4.093-2.856,6.564c0,2.477,0.95,4.667,2.856,6.57l14.273,14.271c1.903,1.905,4.093,2.854,6.567,2.854    s4.664-0.951,6.567-2.854l133.042-133.044C169.785,147.136,170.732,144.945,170.732,142.471z" data-original="#000000" className="active-path" data-old_color="#000000" style={{ fill: color ? color : "" }} />
			</g> </g> </g>
		</svg>
	)
}


const LeftPagination = ({ color }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="10" height="10" viewBox="0 0 284.929 284.929" style={{ fill: color ? color : "" }} ><g><g>
			<g>
				<path d="M165.304,142.468L277.517,30.267c1.902-1.903,2.847-4.093,2.847-6.567c0-2.475-0.951-4.665-2.847-6.567L263.239,2.857    C261.337,0.955,259.146,0,256.676,0c-2.478,0-4.665,0.955-6.571,2.857L117.057,135.9c-1.903,1.903-2.853,4.093-2.853,6.567    c0,2.475,0.95,4.664,2.853,6.567l133.048,133.043c1.903,1.906,4.086,2.851,6.564,2.851c2.478,0,4.66-0.947,6.563-2.851    l14.277-14.267c1.902-1.903,2.851-4.094,2.851-6.57c0-2.472-0.948-4.661-2.851-6.564L165.304,142.468z" data-original="#000000" className="active-path" data-old_color="#000000" style={{ fill: color ? color : "" }} />
				<path d="M55.668,142.468L167.87,30.267c1.903-1.903,2.851-4.093,2.851-6.567c0-2.475-0.947-4.665-2.851-6.567L153.6,2.857    C151.697,0.955,149.507,0,147.036,0c-2.478,0-4.668,0.955-6.57,2.857L7.417,135.9c-1.903,1.903-2.853,4.093-2.853,6.567    c0,2.475,0.95,4.664,2.853,6.567l133.048,133.043c1.902,1.906,4.09,2.851,6.57,2.851c2.471,0,4.661-0.947,6.563-2.851    l14.271-14.267c1.903-1.903,2.851-4.094,2.851-6.57c0-2.472-0.947-4.661-2.851-6.564L55.668,142.468z" data-original="#000000" className="active-path" data-old_color="#000000" style={{ fill: color ? color : "" }} />
			</g>
		</g></g> </svg>
	)
}

Heart.defaultProps = defaultProps;
Heart.propTypes = propTypes;

RightPagination.defaultProps = defaultProps;
RightPagination.propTypes = propTypes;

LeftPagination.defaultProps = defaultProps;
LeftPagination.propTypes = propTypes;

export {
	Heart,
	RightPagination,
	LeftPagination
}