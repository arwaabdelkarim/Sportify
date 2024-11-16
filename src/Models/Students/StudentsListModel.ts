import Student from "@/types/Student";
import { PMStudentList } from "@/PMs/Students/StudentsListPM";
import { getSidebarModel, SidebarModel } from "../Components/SidebarModel";
import { getHeaderModel, HeaderModel } from "../Components/HeaderModel";
import { getStudents } from "@/libs/APICommunicator/Students/StudentsAPI";
import { StudentsListData } from "@/libs/APICommunicator/Students/StudentsDTO";

export interface StudentsListModel {
	sidebarModel: SidebarModel | null;
	headerModel: HeaderModel | null;

	fetchedParams: {
		page: number;
		records: number;
		searchQuery: string;
	};

	studentsData: Student[];
	setup: () => Promise<void>;

	fetchData: (isForceUpdate?: boolean) => Promise<void>;

	onPageChange: () => void;

	onRecordsPerPageChange: () => void;

	onSearch: () => void;
}

export function getStudentListModel(
	pm: () => PMStudentList,
	router: any
): StudentsListModel {
	const model: StudentsListModel = {
		studentsData: [],
		sidebarModel: null,
		headerModel: null,

		fetchedParams: {
			page: 0,
			records: 0,
			searchQuery: "",
		},
		setup: async () => {
			if (!model.sidebarModel)
				model.sidebarModel = getSidebarModel(pm, router, 1);
			model.sidebarModel.setup();

			if (!model.headerModel) model.headerModel = getHeaderModel(pm, model);
			model.headerModel.setup();

			model.fetchData();
		},
		fetchData: async function (isForceUpdate?: boolean): Promise<void> {
			const page = pm().pmHeader.currentPage;
			const recordsPerPage = pm().pmHeader.currentRecordsPerPage;
			const searchQuery = pm().pmHeader.currentSearchQuery;

			if (
				!isForceUpdate &&
				page == model.fetchedParams.page &&
				recordsPerPage == model.fetchedParams.records &&
				searchQuery == model.fetchedParams.searchQuery
			)
				return;

			const { studentsCount, studentsList }: StudentsListData =
				await getStudents({
					page: page,
					recordsPerPage: recordsPerPage,
					searchQuery: searchQuery,
				});
			model.studentsData = studentsList;
			pm().studentsList = model.studentsData;

			model.fetchedParams = {
				page: page,
				records: recordsPerPage,
				searchQuery: searchQuery,
			};

			const pagesCount =
				studentsCount > 0 ? Math.ceil(studentsCount / recordsPerPage) : 1;
			if (model.headerModel) model.headerModel.setPagesCount(pagesCount);
			if (model.headerModel) model.headerModel.setCurrentPage(page);

			//test
			// const dummyData = [
			// 	{
			// 		email: "alice.johnson@example.com",
			// 		firstName: "Alice",
			// 		lastName: "Johnson",
			// 		photoLink: null,
			// 		isTrainer: false,
			// 		phoneNumber: "123-456-7890",
			// 		passHash: "hashed_password_1",
			// 		isBanned: false,
			// 	},
			// 	{
			// 		email: "bob.smith@example.com",
			// 		firstName: "Bob",
			// 		lastName: "Smith",
			// 		photoLink: null,
			// 		isTrainer: true,
			// 		phoneNumber: "234-567-8901",
			// 		passHash: "hashed_password_2",
			// 		isBanned: false,
			// 	},
			// 	{
			// 		email: "charlie.brown@example.com",
			// 		firstName: "Charlie",
			// 		lastName: "Brown",
			// 		photoLink: null,
			// 		isTrainer: false,
			// 		phoneNumber: "345-678-9012",
			// 		passHash: "hashed_password_3",
			// 		isBanned: false,
			// 	},
			// 	{
			// 		email: "diana.prince@example.com",
			// 		firstName: "Diana",
			// 		lastName: "Prince",
			// 		photoLink: null,
			// 		isTrainer: true,
			// 		phoneNumber: "456-789-0123",
			// 		passHash: "hashed_password_4",
			// 		isBanned: true,
			// 	},
			// 	{
			// 		email: "ethan.hunt@example.com",
			// 		firstName: "Ethan",
			// 		lastName: "Hunt",
			// 		photoLink: null,
			// 		isTrainer: false,
			// 		phoneNumber: "567-890-1234",
			// 		passHash: "hashed_password_5",
			// 		isBanned: false,
			// 	},
			// ];
		},
		onPageChange: function (): void {
			model.fetchData();
		},
		onRecordsPerPageChange: function (): void {
			model.fetchData();
		},
		onSearch: function (): void {
			model.fetchData();
		},
	};

	return model;
}
