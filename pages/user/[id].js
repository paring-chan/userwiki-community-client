import React, {Component} from 'react';
import {withRouter} from "next/router";
import {CardContent, Grid, Typography} from "@material-ui/core";
import Axios from "axios";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ReactMarkdown from "react-markdown";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import Tooltip from "@material-ui/core/Tooltip";
import marked from 'marked'

class UserInfo extends Component {
    state = {
        user: null,
        isLoading: true,
        error: null
    }

    async update() {
        console.log('updating...')

        const router = this.props.router

        let data

        try {
            data = (await Axios.get('/api/user/' + router.query.id)).data
        } catch (e) {
            return this.setState({
                error: e.message,
                isLoading: false
            })
        }
        if (data.code !== '200' || !data.code)
            return this.setState({
                isLoading: false
            })
        this.setState({
            user: data,
            isLoading: false
        })
    }

    componentDidMount() {
        this.update.bind(this)()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.update()
        }
    }

    states = {
        online: '온라인',
        idle: '자리 비움',
        dnd: '다른 용무줌',
        offline: '오프라인'
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={6}>
                    {
                        this.state.error && `오류: ${this.state.error}`
                    }
                    {
                        this.state.isLoading ?
                            '로딩중...' :
                            <>
                                {
                                    this.state.user ?
                                        <>
                                            <Typography align="center" variant="h4">{this.state.user.name}</Typography>
                                            <Typography align="center" variant="h5">{this.state.user.shortinfo}</Typography>
                                            <Typography align="center" style={{paddingTop: 10}}>
                                                <img style={{borderRadius: '50%'}} src={this.state.user.img}
                                                     alt={`avatar of ${this.state.user.name}`} width={200}
                                                     height={200}/>
                                            </Typography>
                                            <Card>
                                                <CardContent>
                                                    <Typography align="center">ID: {this.state.user.id}</Typography>
                                                    <Typography align="center">가입일: {this.state.user.date}</Typography>
                                                    <Typography align="center">상태: {this.states[this.state.user.status]}</Typography>
                                                    <Typography align="center">활동: {this.state.user.activity}</Typography>
                                                    <CopyToClipboard text={window.location.href}>
                                                        <Tooltip title="클릭하면 이 페이지의 링크가 복사됩니다">
                                                            <Button variant="contained" color="secondary" style={{width: '100%', marginTop: 10}}>
                                                                링크 복사
                                                            </Button>
                                                        </Tooltip>
                                                    </CopyToClipboard>
                                                </CardContent>
                                            </Card>
                                            <Card style={{marginTop: 10}}>
                                                <CardContent>
                                                    <div dangerouslySetInnerHTML={{__html: marked(this.state.user.longinfo)}}/>
                                                </CardContent>
                                            </Card>
                                        </>
                                        : '유저를 찾을 수 없습니다'
                                }
                            </>
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(UserInfo);
