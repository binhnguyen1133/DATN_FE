import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import { getApproveList, approveJob } from '../../services/api.js';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

export function ApproveJob(props) {
	const classes = useStyles();
	const [openList, setopenList] = React.useState([]);
	const [requestedList, setrequestedList] = React.useState([]);
	const [error, seterror] = React.useState(null);

	useEffect(async () => {
		console.log('Alo');
		const requestedJobs = await getApproveList();
		let expandList = [];
		if (requestedJobs['success']) {
			setrequestedList(requestedJobs['data']);
			requestedJobs['data'].map((item, idx) => {
				expandList.push(false);
			});
			setopenList(expandList);
		} else {
			seterror('Some error coccur when get reuqested jobs');
		}
	}, []);

	const handleClick = (idx) => {
		let newListOpen = [...openList];
		newListOpen[idx] = !newListOpen[idx];
		setopenList(newListOpen);
	};

	const handleApprove = async (request_id, idx) => {
		const res = await approveJob(request_id);
		if (!res['success']) {
			seterror('Some error coccur when approve this job');
		} else {
			let newRequestedList = [...requestedList];
			console.log('new request list');
			newRequestedList.splice(idx, 1);
			console.log(newRequestedList);
			setrequestedList(newRequestedList);
		}
	};

	return (
		<div className="list-job">
			<div className="container">
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader
							component="div"
							id="nested-list-subheader"
							className="text-center"
						>
							<h3>
								There {requestedList.length} jobs need to be
								approved
							</h3>
						</ListSubheader>
					}
					className={classes.root}
				>
					{requestedList.map((item, idx) => {
						return (
							<div key={idx}>
								<ListItem
									button
									onClick={() => {
										handleClick(idx);
									}}
								>
									<ListItemText
										primary={item['ten_cong_viec']}
									/>

									{openList[idx] ? (
										<ExpandLess />
									) : (
										<ExpandMore />
									)}
								</ListItem>
								<Collapse
									in={openList[idx]}
									timeout="auto"
									unmountOnExit
								>
									<ListItem component="div">
										<div
											className="card"
											style={{ width: '100%' }}
										>
											<div className="card-body">
												<Button
													size="small"
													style={{ float: 'right' }}
													variant="outlined"
													color="primary"
													onClick={() => {
														handleApprove(
															item['request_id'],
															idx
														);
													}}
												>
													Approve
												</Button>

												<h5 className="card-title">
													{item['ten_doanh_nghiep']}
												</h5>

												<h6>
													Start date:&ensp;
													{item['ngay_bat_dau']}
												</h6>
												<h6>
													End date:&ensp;
													{item['ngay_ket_thuc']}
												</h6>
												<h6>
													Salary:&ensp;
													{item['luong_toi_thieu']}
													{item['don_vi_tien_te']}
													&ensp; -&ensp;
													{item['luong_toi_da']}
													{item['don_vi_tien_te']}
												</h6>
												<h6>
													Required skills:&ensp;
													{item['danh_sach_skill']} {}
												</h6>
												<h6>Description</h6>
												<p className="card-text">
													{item['mo_ta_cong_viec']}
												</p>
											</div>
										</div>
									</ListItem>
								</Collapse>
							</div>
						);
					})}
				</List>
			</div>
		</div>
	);
}

export default ApproveJob;
