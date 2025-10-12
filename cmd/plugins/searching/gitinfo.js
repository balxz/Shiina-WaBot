const axios = require("axios");

module.exports = {
    alias: ["gitlook"],
    command: ["gitinfo"],
    tags: ["search"],
    desc: ["Get comprehensive GitHub user profile information"],
    owner: false,
    handler: async (m, { prefix, cmd, text }) => {
        if (!text) {
            return m.reply(
                `GitHub Profile Search\n\nUsage: !${cmd} <username>`
            );
        }

        try {
            m.reply(`Dive in to ${text}`);

            const response = await axios.get(
                `https://altera-api.vercel.app/api/github?user=${encodeURIComponent(
                    text
                )}&key=A-CORE`
            );

            const { PrintToTerminal: data } = response.data;
            if (!data || !data.profile) {
                return m.reply("User not found or API returned no data");
            }

            const {
                profile,
                companies,
                followers,
                following,
                repositories,
                organizations,
                gists,
                events,
            } = data;

            const formatDate = (dateString) => {
                if (!dateString) return "Unknown";
                const date = new Date(dateString);
                return date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });
            };

            const getAccountAge = (createdAt) => {
                if (!createdAt) return "Unknown";
                const created = new Date(createdAt);
                const now = new Date();
                const diffDays = Math.floor(
                    (now - created) / (1000 * 60 * 60 * 24)
                );
                const diffYears = Math.floor(diffDays / 365);
                if (diffYears > 0)
                    return `${diffYears} year${
                        diffYears > 1 ? "s" : ""
                    } (${diffDays} days)`;
                return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
            };

            const formatNumber = (num) => num?.toLocaleString() || "0";

            let caption = `PROFILE INFORMATION\n`;
            caption += `├─ User ID: ${profile.id}\n`;
            caption += `├─ Display Name: ${profile.name || "Not set"}\n`;
            caption += `├─ Username: @${profile.login}\n`;
            caption += `├─ Bio: ${profile.bio || "No biography"}\n`;
            caption += `├─ Company: ${profile.company || "Not specified"}\n`;
            caption += `├─ Location: ${profile.location || "Not specified"}\n`;
            caption += `├─ Email: ${profile.email || "Not public"}\n`;
            caption += `├─ Blog: ${profile.blog || "Not provided"}\n`;
            caption += `├─ Twitter: ${
                profile.twitter_username || "Not linked"
            }\n`;
            caption += `├─ Hireable: ${profile.hireable ? "Yes" : "No"}\n`;
            caption += `├─ Site Admin: ${profile.site_admin ? "Yes" : "No"}\n`;
            caption += `├─ Account Created: ${formatDate(
                profile.created_at
            )}\n`;
            caption += `└─ Account Age: ${getAccountAge(
                profile.created_at
            )}\n\n`;

            caption += `ACCOUNT STATISTICS\n`;
            caption += `├─ Public Repositories: ${formatNumber(
                profile.public_repos
            )}\n`;
            caption += `├─ Public Gists: ${formatNumber(
                profile.public_gists
            )}\n`;
            caption += `├─ Followers: ${formatNumber(profile.followers)}\n`;
            caption += `└─ Following: ${formatNumber(profile.following)}\n\n`;

            if (companies?.length > 0) {
                caption += `COMPANIES & ORGANIZATIONS (${companies.length})\n`;
                companies.forEach((company, index) => {
                    const isLast = index === companies.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        company.name || company.login
                    }\n`;
                    if (!isLast)
                        caption += `│   ├─ Bio: ${
                            company.bio || "No description"
                        }\n`;
                    else
                        caption += `    ├─ Bio: ${
                            company.bio || "No description"
                        }\n`;
                    if (!isLast)
                        caption += `│   ├─ Repos: ${formatNumber(
                            company.public_repos
                        )}\n`;
                    else
                        caption += `    ├─ Repos: ${formatNumber(
                            company.public_repos
                        )}\n`;
                    if (!isLast)
                        caption += `│   └─ Created: ${formatDate(
                            company.created_at
                        )}\n`;
                    else
                        caption += `    └─ Created: ${formatDate(
                            company.created_at
                        )}\n`;
                });
                caption += `\n`;
            }

            if (repositories?.length > 0) {
                caption += `REPOSITORIES (${repositories.length})\n`;
                const sortedRepos = repositories.sort(
                    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
                );

                sortedRepos.forEach((repo, index) => {
                    const isLast = index === repositories.length - 1;
                    const prefix = isLast ? "└─" : "├─";
                    const fork = repo.fork ? " (Fork)" : "";

                    caption += `${prefix} ${index + 1}. ${repo.name}${fork}\n`;
                    if (!isLast) {
                        caption += `│   ├─ Description: ${
                            repo.description || "No description"
                        }\n`;
                        caption += `│   ├─ Language: ${
                            repo.language || "Not specified"
                        }\n`;
                        caption += `│   ├─ Stars: ${formatNumber(
                            repo.stargazers_count
                        )} | Forks: ${formatNumber(repo.forks_count)}\n`;
                        caption += `│   └─ Updated: ${formatDate(
                            repo.updated_at
                        )}\n`;
                    } else {
                        caption += `    ├─ Description: ${
                            repo.description || "No description"
                        }\n`;
                        caption += `    ├─ Language: ${
                            repo.language || "Not specified"
                        }\n`;
                        caption += `    ├─ Stars: ${formatNumber(
                            repo.stargazers_count
                        )} | Forks: ${formatNumber(repo.forks_count)}\n`;
                        caption += `    └─ Updated: ${formatDate(
                            repo.updated_at
                        )}\n`;
                    }
                });
                caption += `\n`;
            }

            if (followers?.length > 0) {
                caption += `FOLLOWERS (${followers.length})\n`;
                followers.forEach((follower, index) => {
                    const isLast = index === followers.length - 1;
                    const type =
                        follower.type === "Organization"
                            ? " (Organization)"
                            : "";
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        follower.login
                    }${type}\n`;
                });
                caption += `\n`;
            }

            if (following?.length > 0) {
                caption += `FOLLOWING (${following.length})\n`;
                following.forEach((user, index) => {
                    const isLast = index === following.length - 1;
                    const type =
                        user.type === "Organization" ? " (Organization)" : "";
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        user.login
                    }${type}\n`;
                });
                caption += `\n`;
            }

            if (organizations?.length > 0) {
                caption += `ORGANIZATIONS (${organizations.length})\n`;
                organizations.forEach((org, index) => {
                    const isLast = index === organizations.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        org.login
                    }\n`;
                });
                caption += `\n`;
            }

            if (gists?.length > 0) {
                caption += `PUBLIC GISTS (${gists.length})\n`;
                gists.forEach((gist, index) => {
                    const isLast = index === gists.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        gist.id
                    }\n`;
                });
                caption += `\n`;
            }

            if (events?.length > 0) {
                caption += `RECENT ACTIVITY (${events.length} events)\n`;
                const recentEvents = events.slice(0, 15);
                recentEvents.forEach((event, index) => {
                    const isLast = index === recentEvents.length - 1;
                    let activity = "";

                    switch (event.type) {
                        case "WatchEvent":
                            activity = `Starred ${event.repo.name}`;
                            break;
                        case "ForkEvent":
                            activity = `Forked ${event.repo.name}`;
                            break;
                        case "PushEvent":
                            activity = `Pushed to ${event.repo.name}`;
                            break;
                        case "CreateEvent":
                            activity = `Created ${event.repo.name}`;
                            break;
                        case "IssueCommentEvent":
                            activity = `Commented on ${event.repo.name}`;
                            break;
                        default:
                            activity = `${event.type} ${event.repo.name}`;
                    }

                    caption += `${isLast ? "└─" : "├─"} ${formatDate(
                        event.created_at
                    )}\n`;
                    if (!isLast) caption += `│   └─ ${activity}\n`;
                    else caption += `    └─ ${activity}\n`;
                });
                if (events.length > 15)
                    caption += `└─ ... and ${
                        events.length - 15
                    } more activities\n`;
                caption += `\n`;
            }

            caption += `ACCOUNT SUMMARY\n`;
            caption += `├─ Total Repositories: ${formatNumber(
                profile.public_repos
            )}\n`;
            caption += `├─ Total Gists: ${formatNumber(
                profile.public_gists
            )}\n`;
            caption += `├─ Total Followers: ${formatNumber(
                profile.followers
            )}\n`;
            caption += `├─ Total Following: ${formatNumber(
                profile.following
            )}\n`;
            caption += `├─ Companies/Orgs: ${formatNumber(
                companies?.length || 0
            )}\n`;
            caption += `├─ Organizations: ${formatNumber(
                organizations?.length || 0
            )}\n`;
            caption += `└─ Recent Activities: ${formatNumber(
                events?.length || 0
            )}\n\n`;

            caption += `Made by Altera Family\n`;
            caption += `${new Date().toLocaleString()} - v0.1.0`;

            await clients.sendMessage(
                m.chat,
                {
                    image: { url: profile.avatar_url },
                    caption: caption,
                    contextInfo: {
                        externalAdReply: {
                            title: `${profile.name}`,
                            body: `@${profile.login}`,
                            thumbnailUrl: profile.avatar_url,
                            sourceUrl: profile.html_url,
                            mediaType: 1,
                        },
                    },
                },
                { quoted: m }
            );
        } catch (error) {
            console.error("GitHub API Error:", error);

            const errorMessage = `Failed to fetch GitHub profile\n\nError: ${error.message}\n\nPlease check the username and try again.`;

            m.reply(errorMessage);
        }
    },
};
