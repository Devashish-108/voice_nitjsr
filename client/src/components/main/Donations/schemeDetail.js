import "./donations.css"

const SchemeDetail = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="MakeBackgroundBlur" onClick={onClose}>
			<div className="schemeDetailBox">
				{children}
			</div>
		</div>
	);
};

export default SchemeDetail;
