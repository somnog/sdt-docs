import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "SD Track: Day One",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
          Get started with the basics of software development, including setting up your environment and key methodologies.
      </>
    ),
  },
  {
    title: "SD Track: Day Two",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
          Students will explore advanced topics in software development and begin working on their projects. Key concepts will include system design, architecture, and best practices for project development.
      </>
    ),
  },
  {
    title: "SD Track: Day Three",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
          Learn about Docker, its containerization features, and how to use it for development. We'll also dive into Continuous Deployment (CD) pipelines.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
