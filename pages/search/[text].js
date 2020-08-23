import React, {Component} from 'react';
import {withRouter} from "next/router";
import {Avatar, Grid, List, Typography} from "@material-ui/core";
import Axios from "axios";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from 'next/link'

class SearchUser extends Component {
    state = {
        results: [],
        isLoading: true
    }

    async update() {
        const router = this.props.router

        const data = (await Axios.get('/api/search/' + encodeURI(router.query.text))).data
        data.pop()
        this.setState({
            results: data,
            isLoading: false
        })
    }

    componentDidMount() {
        this.update.bind(this)()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.update.bind(this)()
        }
    }

    render() {
        const router = this.props.router
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                        "{router.query.text}"에 대한 검색 결과
                    </Typography>
                    {
                        this.state.isLoading ?
                            '로딩중...' :
                            <List>
                                {this.state.results.map((result, i) => (
                                    <Link key={i} href="/user/[id]" as={`/user/${result.id}`}>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <Avatar src={result.img}/>
                                            </ListItemIcon>
                                            <ListItemText primary={result.name}/>
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(SearchUser);
