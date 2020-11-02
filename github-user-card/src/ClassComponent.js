import React, { Component } from 'react';
import axios from 'axios';
import {
	Container,
	Card,
	CardContent,
	Box,
	CardMedia,
	Typography,
	makeStyles,
} from '@material-ui/core';
import 'fontsource-roboto';

class ClassComponent extends Component {
	constructor() {
		super();
		this.state = {
			main_user: {
				avatar_url:
					'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
				name: '',
				bio: '',
				html_url: '',
				location: '',
			},
			followers: [],
		};
	}

	componentDidMount() {
		axios.get('https://api.github.com/users/evllz').then((response) => {
			console.log(response);
			this.setState({ main_user: response.data });
		});
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.main_user !== this.state.main_user) {
			axios.get(this.state.main_user.followers_url).then((response) => {
				this.setState({ followers: response.data });
				console.log(this.state.followers);
			});
		}
	}
	render() {
		const styles = {
			root: {
				maxWidth: 345,
			},
			media: {
				height: 250,
			},
			root2: {
				display: 'flex',
				margin: '5px',
				height: 250,
				maxWidth: 410,
				justifyContent: 'center',
			},
			details: {
				display: 'flex',
				flexDirection: 'column',
			},
			content: {
				flex: '1 0 auto',
			},
			cover: {
				width: 151,
			},
		};
		return (
			<div>
				<Container
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Card style={styles.root}>
						<CardMedia
							image={this.state.main_user.avatar_url}
							style={styles.media}
						/>
						<CardContent>
							<Typography variant='h6'>{this.state.main_user.name}</Typography>
							<Typography variant='body2'>
								Location: {this.state.main_user.location}
							</Typography>
							<Typography variant='body2'>
								Bio: {this.state.main_user.bio}
							</Typography>
							<Typography variant='body2'>
								URL: {this.state.main_user.html_url}
							</Typography>
						</CardContent>
					</Card>
				</Container>
				<Box>
					<Typography variant='h5'>Followers:</Typography>
				</Box>
				{this.state.followers.map((user) => {
					return (
						<Container
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Card style={styles.root2}>
								<div style={styles.details}>
									<CardContent style={styles.content}>
										<Typography component='h5' variant='h5'>
											{user.login}
										</Typography>
										<Typography variant='subtitle1' color='textSecondary'>
											{user.html_url}
										</Typography>
									</CardContent>
								</div>

								<CardMedia style={styles.cover} image={user.avatar_url} />
							</Card>
						</Container>
					);
				})}
			</div>
		);
	}
}

export default ClassComponent;
