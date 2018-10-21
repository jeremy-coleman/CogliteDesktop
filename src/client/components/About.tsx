import { IAppProps } from '@coglite/apphost';
import MaterialTable from 'material-table';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import {observer} from 'mobx-react'

//import packageInfo from 'package.json';
//@ts-ignore
var packageInfo = pkgInfo

const dependencies = Object.keys(packageInfo.dependencies || {}).map(key => {
    return {
        name: key,
        version: packageInfo.dependencies[key]
    };
}).sort((l, r) => {
    return String(l.name).localeCompare(String(r.name));
});


const aboutTableOptions = {
    filtering: false,
    paging: false
}


const dependencyColumns = [
    {
        field: "name",
        title: "Name",
    },
    {
        field: "version",
        title: "Version",
    }
]

const aboutStyles = stylesheet({
        root: {},
        section: {},
        sectionTitle: {
            margin: 0,
            paddingTop: 16,
            paddingBottom: 8,
            fontSize: '14px'
        },
        sectionBody: {},
        config: {
            fontSize: '12px',
            fontWeight: 300
        }
})





let DependenciesDetailsList = observer(() =>
    <MaterialTable title='dependencies' data={dependencies} columns={dependencyColumns} options={aboutTableOptions}/>
)

// interface IAboutProps {
//     styles?: IAboutStyles;
//     className?: string;
// }

let About = observer(() => {
    return (
            <div className={aboutStyles.root}>
                <section className={aboutStyles.section}>
                    <h5 className={aboutStyles.sectionTitle}>Build Version</h5>
                    <div className={aboutStyles.sectionBody}>
                        {AppConfig.buildVersion}
                    </div>
                </section>
                <section className={aboutStyles.section}>
                    <h5 className={aboutStyles.sectionTitle}>Build Date</h5>
                    <div className={aboutStyles.sectionBody}>
                        {AppConfig.buildDate}
                    </div>
                </section>
                <section className={aboutStyles.section}>
                    <h5 className={aboutStyles.sectionTitle}>Repository</h5>
                    <div className={aboutStyles.sectionBody}>
                        <a style={{color: 'orange'}} target="_blank" href={packageInfo.repository.url}>{packageInfo.repository.url}</a>
                    </div>
                </section>
                <section className={aboutStyles.section}>
                    <h5 className={aboutStyles.sectionTitle}>Configuration</h5>
                    <div className={aboutStyles.sectionBody}>
                        <pre className={aboutStyles.config}>{JSON.stringify(AppConfig, null, "\t")}</pre>
                    </div>
                </section>
                <section className={aboutStyles.section}>
                    <h5 className={aboutStyles.sectionTitle}>Dependencies</h5>
                    <div className={aboutStyles.sectionBody}>
                        <DependenciesDetailsList />
                    </div>
                </section>
            </div>
)})

export let AboutApp = observer((props: IAppProps) => {
    props.match.host.setTitle("About Coglite");
    return (<About />)
})

export default AboutApp

// class AboutApp extends React.Component<IAppProps, any> {
//     componentWillMount() {
//         this.props.match.host.setTitle("About Coglite");
//     }
//     render() {
//         return 
//     }
// }

//export { AboutApp, AboutApp as default, About }