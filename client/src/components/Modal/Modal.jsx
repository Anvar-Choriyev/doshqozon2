import { Modal as AntModal } from "antd";

const Modal = ({ children, width }) => {
	const setting = {
		visible: true,
		centered: true,
		closable: false,
		footer: null,
		mask: true,
		width: width
	};
	return (
		<section>
			<AntModal {...setting}>
				{children}
			</AntModal>
		</section>
	);
};

export default Modal;
