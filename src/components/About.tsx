import { IAppProps } from '@coglite/apphost';
import { DetailsList, IColumn, SelectionMode } from 'office-ui-fabric-react';
import { Link } from 'office-ui-fabric-react';
import * as React from 'react';



import {stylesheet} from 'typestyle'

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

const dependencyColumns : IColumn[] = [
    {
        key: "name",
        name: "Name",
        fieldName: "name",
        minWidth: 40,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: "version",
        name: "Version",
        fieldName: "version",
        minWidth: 40,
        isResizable: true
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





class DependenciesDetailsList extends React.Component<any, any> {
    private _onShouldVirtualize = () => {
        return false;
    }
    render() {
        return (
            <DetailsList items={dependencies} columns={dependencyColumns} selectionMode={SelectionMode.none} onShouldVirtualize={this._onShouldVirtualize} />
        );
    }
}

// interface IAboutProps {
//     styles?: IAboutStyles;
//     className?: string;
// }

class About extends React.Component<any, any> {
    render() {
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
                        <Link target="_blank" href={packageInfo.repository.url}>{packageInfo.repository.url}</Link>
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
        );
    }
}

class AboutApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.match.host.setTitle("About Coglite");
    }
    render() {
        return <About />;
    }
}

export { AboutApp, AboutApp as default, About }