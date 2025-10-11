const axios = require("axios");

module.exports = {
    alias: ["roblook"],
    command: ["roblox"],
    tags: ["search"],
    desc: ["Get comprehensive Roblox user profile information"],
    owner: false,
    handler: async (m, { prefix, cmd, text }) => {
        if (!text) {
            return m.reply(
                `Roblox Profile Search\n\nUsage: !${cmd} <username/id/url>\nExample: !${cmd} Joy\nExample: !${cmd} https://www.roblox.com/users/9063881089/profile`
            );
        }

        try {
            m.reply(`Searching for Roblox user: ${text}`);

            const response = await axios.get(
                `https://altera-api.vercel.app/api/roblox?value=${encodeURIComponent(
                    text
                )}&key=A-CORE`
            );

            const { PrintToTerminal: user } = response.data;
            if (!user) {
                return m.reply("User not found or API returned no data");
            }

            const {
                id,
                username,
                displayName,
                description,
                created,
                isBanned,
                isPremium,
                isVerified,
                status,
                presence = {},
                isOnline,
                lastLocation,
                avatarHeadshotUrl,
                avatarBustUrl,
                avatarFullUrl,
                avatar3dUrl,
                avatarAssets = [],
                avatarType,
                scales = {},
                bodyColors = {},
                emotes = [],
                currentlyWearing = [],
                outfits = [],
                previousUsernames = [],
                friendList = [],
                followerCount,
                friendsCount,
                followingCount,
                badges = [],
                gameBadges = [],
                groups = [],
                primaryGroup,
                inventory = [],
                collectibles = [],
                robux,
                games = [],
                userGames = [],
                favoriteGames = [],
                universeInfo = [],
                developedUniverses = [],
                accountAgeYears,
            } = user;

            const formatNumber = (num) =>
                num != null ? num.toLocaleString() : "0";

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

            let caption = `PROFILE INFORMATION\n`;
            caption += `├─ User ID: ${id || "N/A"}\n`;
            caption += `├─ Display Name: ${displayName || "N/A"}\n`;
            caption += `├─ Username: ${username || "N/A"}\n`;
            caption += `├─ Status: ${status || "No status set"}\n`;
            caption += `├─ Description: ${
                description || "No description available"
            }\n`;
            caption += `├─ Created: ${
                created ? formatDate(created) : "Unknown"
            }\n`;
            caption += `├─ Account Age: ${
                accountAgeYears || "Unknown"
            } years\n`;
            caption += `├─ Banned: ${isBanned ? "Yes" : "No"}\n`;
            caption += `├─ Premium: ${isPremium ? "Yes" : "No"}\n`;
            caption += `├─ Verified: ${isVerified ? "Yes" : "No"}\n`;
            caption += `├─ Online: ${
                isOnline === true
                    ? "Yes"
                    : isOnline === false
                    ? "No"
                    : "Unknown"
            }\n`;
            caption += `├─ Presence: ${
                presence.userPresenceType === 0
                    ? "Offline"
                    : presence.userPresenceType === 1
                    ? "Online"
                    : presence.userPresenceType === 2
                    ? "In Game"
                    : "Unknown"
            }\n`;
            caption += `├─ Last Location: ${lastLocation || "Unknown"}\n`;
            caption += `└─ Robux Balance: ${formatNumber(robux)}\n\n`;

            caption += `SOCIAL STATISTICS\n`;
            caption += `├─ Followers: ${formatNumber(followerCount)}\n`;
            caption += `├─ Following: ${formatNumber(followingCount)}\n`;
            caption += `└─ Friends: ${formatNumber(friendsCount)}\n\n`;

            caption += `AVATAR INFORMATION\n`;
            caption += `├─ Type: ${avatarType || "Unknown"}\n`;
            caption += `├─ Assets: ${formatNumber(avatarAssets.length)}\n`;
            caption += `├─ Emotes: ${formatNumber(emotes.length)}\n`;
            caption += `├─ Currently Wearing: ${formatNumber(
                currentlyWearing.length
            )}\n`;
            caption += `└─ Outfits: ${formatNumber(outfits.length)}\n\n`;

            if (bodyColors && Object.keys(bodyColors).length > 0) {
                caption += `BODY COLORS\n`;
                Object.entries(bodyColors).forEach(
                    ([part, colorId], index, array) => {
                        const partName = part
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase());
                        const isLast = index === array.length - 1;
                        caption += `${
                            isLast ? "└─" : "├─"
                        } ${partName}: ${colorId}\n`;
                    }
                );
                caption += `\n`;
            }

            if (scales && Object.keys(scales).length > 0) {
                caption += `AVATAR SCALES\n`;
                Object.entries(scales).forEach(
                    ([scale, value], index, array) => {
                        const scaleName = scale
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase());
                        const isLast = index === array.length - 1;
                        caption += `${
                            isLast ? "└─" : "├─"
                        } ${scaleName}: ${value}\n`;
                    }
                );
                caption += `\n`;
            }

            if (avatarAssets.length > 0) {
                caption += `AVATAR ASSETS (${avatarAssets.length})\n`;
                avatarAssets.forEach((asset, index) => {
                    const isLast = index === avatarAssets.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        asset.name
                    } (${asset.assetType.name})\n`;
                });
                caption += `\n`;
            }

            if (emotes.length > 0) {
                caption += `EMOTES (${emotes.length})\n`;
                emotes.forEach((emote, index) => {
                    const isLast = index === emotes.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        emote.assetName
                    } (Position: ${emote.position})\n`;
                });
                caption += `\n`;
            }

            if (outfits.length > 0) {
                caption += `OUTFITS (${outfits.length})\n`;
                outfits.forEach((outfit, index) => {
                    const isLast = index === outfits.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        outfit.name
                    } ${outfit.isEditable ? "(Editable)" : "(Not Editable)"}\n`;
                });
                caption += `\n`;
            }

            if (groups.length > 0) {
                caption += `GROUPS (${groups.length})\n`;
                if (primaryGroup) {
                    caption += `├─ Primary Group: ${primaryGroup.group.name}\n`;
                    caption += `└─ Primary Role: ${primaryGroup.role.name}\n\n`;
                }

                groups.forEach((group, index) => {
                    const isLast = index === groups.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        group.group.name
                    }\n`;
                    if (!isLast) {
                        caption += `│   ├─ ID: ${group.group.id}\n`;
                        caption += `│   ├─ Members: ${formatNumber(
                            group.group.memberCount
                        )}\n`;
                        caption += `│   ├─ Role: ${group.role.name}\n`;
                        caption += `│   ├─ Rank: ${group.role.rank}\n`;
                        caption += `│   └─ Verified: ${
                            group.group.hasVerifiedBadge ? "Yes" : "No"
                        }\n`;
                    } else {
                        caption += `    ├─ ID: ${group.group.id}\n`;
                        caption += `    ├─ Members: ${formatNumber(
                            group.group.memberCount
                        )}\n`;
                        caption += `    ├─ Role: ${group.role.name}\n`;
                        caption += `    ├─ Rank: ${group.role.rank}\n`;
                        caption += `    └─ Verified: ${
                            group.group.hasVerifiedBadge ? "Yes" : "No"
                        }\n`;
                    }
                });
                caption += `\n`;
            }

            if (badges.length > 0) {
                caption += `OFFICIAL BADGES (${badges.length})\n`;
                badges.forEach((badge, index) => {
                    const isLast = index === badges.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        badge.name
                    }\n`;
                    if (!isLast) {
                        caption += `│   └─ ${badge.description}\n`;
                    } else {
                        caption += `    └─ ${badge.description}\n`;
                    }
                });
                caption += `\n`;
            }

            if (gameBadges.length > 0) {
                caption += `GAME BADGES (${gameBadges.length})\n`;
                gameBadges.forEach((badge, index) => {
                    const isLast = index === gameBadges.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        badge.name
                    }\n`;
                    if (!isLast) {
                        caption += `│   ├─ Description: ${badge.description}\n`;
                        caption += `│   ├─ Creator: ${badge.creator.name}\n`;
                        caption += `│   ├─ Awarded: ${formatNumber(
                            badge.statistics.awardedCount
                        )} times\n`;
                        caption += `│   └─ Created: ${formatDate(
                            badge.created
                        )}\n`;
                    } else {
                        caption += `    ├─ Description: ${badge.description}\n`;
                        caption += `    ├─ Creator: ${badge.creator.name}\n`;
                        caption += `    ├─ Awarded: ${formatNumber(
                            badge.statistics.awardedCount
                        )} times\n`;
                        caption += `    └─ Created: ${formatDate(
                            badge.created
                        )}\n`;
                    }
                });
                caption += `\n`;
            }

            caption += `GAMES & CREATIONS\n`;
            caption += `├─ Games Created: ${formatNumber(games.length)}\n`;
            caption += `├─ Published Games: ${formatNumber(
                userGames.length
            )}\n`;
            caption += `├─ Favorite Games: ${formatNumber(
                favoriteGames.length
            )}\n`;
            caption += `├─ Universes: ${formatNumber(universeInfo.length)}\n`;
            caption += `└─ Developed Universes: ${formatNumber(
                developedUniverses.length
            )}\n\n`;

            if (games.length > 0) {
                caption += `CREATED GAMES (${games.length})\n`;
                games.forEach((game, index) => {
                    const isLast = index === games.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        game.name
                    }\n`;
                    if (!isLast) {
                        caption += `│   ├─ Description: ${
                            game.description || "No description"
                        }\n`;
                        caption += `│   ├─ Visits: ${formatNumber(
                            game.placeVisits
                        )}\n`;
                        caption += `│   ├─ Created: ${
                            game.created ? formatDate(game.created) : "Unknown"
                        }\n`;
                        caption += `│   └─ Updated: ${
                            game.updated ? formatDate(game.updated) : "Unknown"
                        }\n`;
                    } else {
                        caption += `    ├─ Description: ${
                            game.description || "No description"
                        }\n`;
                        caption += `    ├─ Visits: ${formatNumber(
                            game.placeVisits
                        )}\n`;
                        caption += `    ├─ Created: ${
                            game.created ? formatDate(game.created) : "Unknown"
                        }\n`;
                        caption += `    └─ Updated: ${
                            game.updated ? formatDate(game.updated) : "Unknown"
                        }\n`;
                    }
                });
                caption += `\n`;
            }

            if (favoriteGames.length > 0) {
                caption += `FAVORITE GAMES (${favoriteGames.length})\n`;
                favoriteGames.forEach((game, index) => {
                    const isLast = index === favoriteGames.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        game.name
                    }\n`;
                    if (!isLast) {
                        caption += `│   ├─ Creator: ${game.creator.name}\n`;
                        caption += `│   ├─ Visits: ${formatNumber(
                            game.placeVisits
                        )}\n`;
                        caption += `│   └─ Created: ${
                            game.created ? formatDate(game.created) : "Unknown"
                        }\n`;
                    } else {
                        caption += `    ├─ Creator: ${game.creator.name}\n`;
                        caption += `    ├─ Visits: ${formatNumber(
                            game.placeVisits
                        )}\n`;
                        caption += `    └─ Created: ${
                            game.created ? formatDate(game.created) : "Unknown"
                        }\n`;
                    }
                });
                caption += `\n`;
            }

            if (friendList.length > 0) {
                const validFriends = friendList.filter(
                    (friend) => friend.id > 0 && friend.name
                );
                caption += `FRIENDS (${validFriends.length})\n`;
                validFriends.forEach((friend, index) => {
                    const isLast = index === validFriends.length - 1;
                    const displayName =
                        friend.displayName !== friend.name
                            ? ` (${friend.displayName})`
                            : "";
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        friend.name
                    }${displayName}\n`;
                    if (!isLast) {
                        caption += `│   └─ ID: ${friend.id}\n`;
                    } else {
                        caption += `    └─ ID: ${friend.id}\n`;
                    }
                });
                caption += `\n`;
            }

            if (previousUsernames.length > 0) {
                caption += `NAME HISTORY (${previousUsernames.length})\n`;
                previousUsernames.forEach((name, index) => {
                    const isLast = index === previousUsernames.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${
                        index + 1
                    }. ${name}\n`;
                });
                caption += `\n`;
            }

            if (inventory.length > 0) {
                caption += `INVENTORY ITEMS: ${formatNumber(
                    inventory.length
                )}\n\n`;
            }

            if (collectibles.length > 0) {
                caption += `COLLECTIBLES: ${formatNumber(
                    collectibles.length
                )}\n\n`;
            }

            if (universeInfo.length > 0) {
                caption += `UNIVERSE INFORMATION\n`;
                universeInfo.forEach((universe, index) => {
                    const isLast = index === universeInfo.length - 1;
                    caption += `${isLast ? "└─" : "├─"} ${index + 1}. ${
                        universe.name
                    }\n`;
                    if (!isLast) {
                        caption += `│   ├─ Creator: ${universe.creator.name}\n`;
                        caption += `│   ├─ Visits: ${formatNumber(
                            universe.visits
                        )}\n`;
                        caption += `│   ├─ Max Players: ${universe.maxPlayers}\n`;
                        caption += `│   └─ Created: ${formatDate(
                            universe.created
                        )}\n`;
                    } else {
                        caption += `    ├─ Creator: ${universe.creator.name}\n`;
                        caption += `    ├─ Visits: ${formatNumber(
                            universe.visits
                        )}\n`;
                        caption += `    ├─ Max Players: ${universe.maxPlayers}\n`;
                        caption += `    └─ Created: ${formatDate(
                            universe.created
                        )}\n`;
                    }
                });
                caption += `\n`;
            }

            caption += `ACCOUNT SUMMARY\n`;
            caption += `├─ Total Games Created: ${formatNumber(
                games.length
            )}\n`;
            caption += `├─ Total Published Games: ${formatNumber(
                userGames.length
            )}\n`;
            caption += `├─ Total Favorite Games: ${formatNumber(
                favoriteGames.length
            )}\n`;
            caption += `├─ Total Friends: ${formatNumber(
                friendsCount?.length || 0
            )}\n`;
            caption += `├─ Total Groups: ${formatNumber(groups.length)}\n`;
            caption += `├─ Total Badges: ${formatNumber(
                badges.length + gameBadges.length
            )}\n`;
            caption += `├─ Total Assets: ${formatNumber(
                avatarAssets.length
            )}\n`;
            caption += `└─ Total Outfits: ${formatNumber(outfits.length)}\n\n`;

            caption += `Made by Altera Family\n`;

            caption += `${new Date().toLocaleString()} - v0.1.0`;

            const avatarUrl =
                avatarHeadshotUrl ||
                avatarBustUrl ||
                avatarFullUrl ||
                avatar3dUrl;

            await clients.sendMessage(m.chat, {
                image: { url: avatarUrl },
                caption: caption,
                contextInfo: {
                    externalAdReply: {
                        title: `${displayName || username}`,
                        body: `@${username}`,
                        thumbnailUrl: avatarUrl,
                        sourceUrl: `https://www.roblox.com/users/${id}/profile`,
                        mediaType: 1,
                    },
                },
            });
        } catch (error) {
            console.error("Roblox API Error:", error);

            const errorMessage = `Failed to fetch Roblox profile\n\nError: ${error.message}\n\nPlease check the username and try again.`;

            m.reply(errorMessage);
        }
    },
};
