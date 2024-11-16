import Admin from "@/types/Admin";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

interface AdminListItemProps {
	admin: Admin;
	selectionValue: boolean;
	onSelectionChange: (val: boolean) => void;
	onDeleteChange: () => void;
}

export default function AdminListItem({
	admin,
	selectionValue,
	onSelectionChange,
	onDeleteChange,
}: AdminListItemProps) {
	return (
		<tr key={admin.email}>
			<td>
				<input
					type="checkbox"
					checked={Boolean(selectionValue)}
					onChange={(e) => {
						onSelectionChange(e.target.checked);
					}}
				/>
			</td>
			<td>{`${admin.firstName} ${admin.lastName}`}</td>
			<td>{admin.email}</td>
			<td>
				<button className="edit-btn">
					<BiEdit />
				</button>
				<button className="delete-btn" onClick={onDeleteChange}>
					<MdDelete />
				</button>
			</td>
		</tr>
	);
}
