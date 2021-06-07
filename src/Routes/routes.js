import {
	Login,
	CreateJob,
	JobDetail,
	SearchResult,
	Home,
	About,
	SignUpComponent,
	UserProfile,
	CreateCV
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
	}
];

export { routes };
