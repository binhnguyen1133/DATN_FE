import { id } from 'date-fns/locale';
import {
	Login,
	CreateJob,
	JobDetail,
	SearchResult,
	Home,
	About,
	SignUpComponent,
	UserProfile,
	CreateCV,
	ApplyJob,
	ListApplyJob,
	ApproveJob,
	MyJob
} from '../Barrel/index.js';

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/result-search/:id',
		component: SearchResult,
	},
	{
		path: '/create/job',
		component: CreateJob,
	},
	{
		path: '/job/',
		component: JobDetail,
	},
	{
		path: '/about',
		component: About,
	},
	{
		path: '/register',
		component: SignUpComponent,
	},
	{
		path: '/my-account',
		component: UserProfile,
	},
	{
		path: '/create-cv',
		component: CreateCV,
	},
	{
		path: '/apply-job/:id',
		component: ApplyJob,
	},
	{
		path: '/manage-job',
		component: ListApplyJob
	},
	{
		path: '/job/approve',
		component: ApproveJob
	},
	{
		path: '/myjob',
		component: MyJob
	}
];

export { routes };
