import { CreateJob } from "../Components/create-job/createJob";

async function request(url, method, params, headers) {
	if (method === 'POST') {
		const res = await fetch(url, {
			method: method,
			headers: headers,
			body: JSON.stringify(params),
		});

		const resJson = await res.json();
		return resJson;
	}
	if (method === 'GET') {
		const res = await fetch(url, {
			method: method,
			headers: headers,
		});

		const resJson = await res.json();
		return resJson;
	}
	if (method === 'DELETE') {
		const res = await fetch(url, {
			method: method,
			headers: headers,
		});

		const resJson = await res.json();
		return resJson;
	}
}

async function loginToken(token) {
	const url = process.env.REACT_APP_API_LOGIN_TOKEN;
	const headers = {
		authorization: token,
		'Content-type': 'application/json',
	};

	const res = await request(url, 'POST', null, headers);
	return res;
}

async function getSkillSuggestion(skill) {
	const url = `${process.env.REACT_APP_API_SUGGESTION}${encodeURIComponent(
		skill
	)}`;
	const method = 'GET';
	const headers = {
		'Content-type': 'application/json',
	};

	const res = await request(url, method, null, headers);
	return res;
}

function getToken() {
	return localStorage.getItem('token');
}

async function addJob(job, cpId) {
	const url = process.env.REACT_APP_API_ADD_JOB;
	const method = 'POST';
	const headers = {
		'Content-type': 'application/json',
	};
	const res = await request(url, method, { job, cpId }, headers);
	return res;
}

async function requestJob(job, token) {
	const url = process.env.REACT_APP_API_REQUEST_JOB;
	const method = 'POST';
	const headers = {
		'Content-type': 'application/json',
		authorization: token,
	};
	const res = await request(url, method, job, headers);
	return res;
}

async function register(userInfo) {
	const url = process.env.REACT_APP_API_REGISTER;
	const method = 'POST';
	const headers = {
		'Content-type': 'application/json',
	};
	const res = await request(url, method, userInfo, headers);
	return res;
}

async function getApproveList() {
	const url = process.env.REACT_APP_API_REQUEST_JOB;
	const method = 'GET';
	const token = getToken();
	const headers = {
		'Content-type': 'application/json',
		authorization: token,
	};
	const res = await request(url, method, null, headers);
	return res;
}

async function approveJob(request_id) {
	const url = `${
		process.env.REACT_APP_API_APPROVE_JOB
	}/?request_id=${request_id}`;
	const method = 'GET';
	const token = getToken();
	const headers = {
		'Content-type': 'application/json',
		authorization: token,
	};
	const res = await request(url, method, null, headers);
	return res;
}

async function addMyJob(job) {
	const url = process.env.REACT_APP_API_ADD_MY_JOB;
	const method = 'POST';
	const token = getToken();
	const headers = {
		'Content-type': 'application/json',
		authorization: token,
	};
	const res = await request(url, method, job, headers);
	return res;
}

async function getMyJob(page) {
	const url = `${process.env.REACT_APP_API_ADD_MY_JOB}?pageIndex=${page}`;
	const method = 'GET';
	const token = getToken();
	const headers = {
		'Content-type': 'application/json',
		authorization: token,
	};
	const res = await request(url, method, null, headers);
	return res;
}

async function CheckJobExistInMyJob(macv) {
	const url = `${process.env.REACT_APP_API_ADD_MY_JOB}/check?ma_cv=${macv}`;
	const method = 'GET';
	const token = getToken();
	const headers = {
		'Content-type': 'application/json',
		authorization: token,
	};
	const res = await request(url, method, null, headers);
	return res;
}

async function deteleFavoriteJob(macv) {
	const url = `${process.env.REACT_APP_API_ADD_MY_JOB}?ma_cong_viec=${macv}`;
	const method = 'DELETE';
	const token = getToken();
	const headers = {
		'Content-type': 'application/json',
		authorization: token,
	};
	const res = await request(url, method, null, headers);
	return res;
}

export {
	loginToken,
	addJob,
	requestJob,
	getSkillSuggestion,
	getToken,
	register,
	getApproveList,
	approveJob,
	addMyJob,
	getMyJob,
	CheckJobExistInMyJob,
	deteleFavoriteJob
};
