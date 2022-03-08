import Head from "next/head";

const MetaTags = (props) => {
    return (
        <Head>
            <title>{props.meta.map((title) => title.url === props.url ? title.title : "")}</title>
            <meta name="description"
                  content={props.meta.map((content) => content.url === props.url ? content.content : "")}
                  key="description"/>
            <link rel="canonical" href="https://bodegonasusalud.com/"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
    )
}

export default MetaTags;
