import {themes as prismThemes} from "prism-react-renderer";
import type {Config} from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
    title: "SomNOG",
    tagline: "Dinosaurs are cool",
    favicon: "img/icon.jpg",


    url: "https://somnog.so/",

    baseUrl: "/",

    organizationName: "SomNOG",
    projectName: "sdt-docs",

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/somnog/sdt-docs/edit/main/",
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true,
                    },
                    editUrl:
                        "https://github.com/somnog/sdt-docs/edit/main/blgo",
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: "img/docusaurus-social-card.jpg",
        navbar: {
            title: "",
            logo: {
                alt: "SomNOG Logo",
                src: "img/somnog.png",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Tracks",
                },
                // { to: "/blog", label: "Blog", position: "left" },
                {
                    href: "https://github.com/somnog",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Tracks",
                            to: "/docs/SomNOG8/intro",
                        },
                    ],
                },
                {
                    title: "Community",
                    items: [
                        {
                            label: "Facebook",
                            href: "https://www.facebook.com/SomaliNOG/",
                        },
                        {
                            label: "Flickr",
                            href: "https://www.flickr.com/photos/somalinog/albums/",
                        },
                        {
                            label: "X",
                            href: "https://x.com/somnog?lang=bn",
                        },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Visit our Website",
                            to: "https://somnog.so",
                        },
                        {
                            label: "GitHub",
                            href: "https://github.com/somnog",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} SomNOG, All Rights Reserved. This Site is Designed & Maintained By SomNOG`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
