import '../styles/globals.scss'
import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";

export default class UWApp extends App {
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }

    render() {
        const {Component, ...other} = this.props

        return (
            <>
                <Head>
                    <title>UserWiki</title>
                </Head>
                <Layout>
                    <Component {...other}/>
                </Layout>
            </>
        )
    }
}
