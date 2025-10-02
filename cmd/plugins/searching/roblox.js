const axios = require("axios");

module.exports = {
    alias: [],
    command: ["roblox"],
    tags: ["search"],
    desc: [
        "Get Roblox user profile information by username or ID or even URL.",
    ],
    owner: false,
    handler: async (m, { prefix, cmd, text }) => {
        if (!text) {
            return m.reply(
                `[ 🪷 ] Where username?\n> Example: ${prefix + cmd} shedletsky`
            );
        }

        try {
            const {
                data: { PrintToTerminal: user },
            } = await axios.get(
                `https://altera-api.vercel.app/api/roblox?value=${text.trim()}&key=A-CORE`
            );

            const {
                id,
                username,
                displayName,
                description,
                created,
                isBanned,
                isPremium,
                isVerified,
                previousUsernames,
                isOnline,
                lastLocation,
                avatarHeadshotUrl,
                avatarAssets,
                outfits,
                followerCount,
                friendsCount,
                friendList,
                badges,
                groups,
                inventory,
                games,
                userGames,
                universeInfo,
            } = user;

            const formatStatus = {
                premium: isPremium ? "✅ Premium User" : "❌ Not Premium",
                verified: isVerified ? "✅ Verified" : "❌ Not Verified",
                banned: isBanned ? "🚫 Banned" : "✅ Active",
                online:
                    isOnline == null
                        ? "-"
                        : isOnline
                        ? "🟢 Online"
                        : "🔴 Offline",
            };

            const formatList = (arr, formatter, maxItems = 10) => {
                if (!Array.isArray(arr) || !arr.length) return "-";
                const items = arr
                    .slice(0, maxItems)
                    .map((item, i) => `- ${i + 1}. ${formatter(item)}`)
                    .join("\n");
                return (
                    items +
                    (arr.length > maxItems
                        ? `\n_...and ${arr.length - maxItems} more_`
                        : "")
                );
            };

            const locationText = isOnline
                ? `Currently online${lastLocation ? ` in ${lastLocation}` : ""}`
                : lastLocation
                ? `Last seen in ${lastLocation}`
                : "Last seen time unavailable";

            const caption = `
🎮 *Roblox Profile*  

📛 *Name:* ${displayName || "-"}  
👤 *Username:* @${username || "-"}  
🆔 *User ID:* ${id || "-"}  
📝 *Bio:* ${description || "-"}  

📆 *Joined:* ${created ? new Date(created).toLocaleDateString() : "-"}  
📣 *Followers:* ${followerCount != null ? followerCount : "-"}  

🚦 *Status:* ${formatStatus.online}  
📍 *${locationText}*  

⚙️ *Account:* ${formatStatus.banned}  
💎 *Premium:* ${formatStatus.premium}  
🛡️ *Verified:* ${formatStatus.verified}  

🏷️ *Previous Names - (${previousUsernames?.length || 0}):*  
${formatList(previousUsernames, (name) => `*${name}*`)}  

📦 *Inventory - (${inventory?.length || 0}):*  
${formatList(inventory, (item) => `*${item.name || item.assetId}*`)}  

👥 *Friends - (${
                friendsCount != null ? friendsCount : friendList?.length || 0
            }):*  
${formatList(friendList, (friend) => `*${friend.name}*`)}  

🏅 *Badges - (${badges?.length || 0}):*  
${formatList(badges, (badge) => `*${badge.name}*`)}  

🗺️ *Universe - (${universeInfo?.length || 0}):*  
${formatList(universeInfo, (universe) => `*${universe.name || universe.id}*`)}  

🎭 *Avatar Assets - (${avatarAssets?.length || 0}):*  
${formatList(
    avatarAssets,
    (asset) => `*${asset.name}* - (${asset.assetType?.name || "-"})`
)}  

👗 *Outfits - (${outfits?.length || 0}):*  
${formatList(outfits, (outfit) => `*${outfit.name}*`)}  

🕹️ *Games Created - (${games?.length || 0}):*  
${formatList(games, (game) => `*${game.name}*`)}  

📂 *Published Games - (${userGames?.length || 0}):*  
${formatList(userGames, (game) => `*${game.name}*`)}  

👪 *Groups - (${groups?.length || 0}):*  
${formatList(
    groups,
    (group) =>
        `*${group.group.name}* - (${
            group.group.memberCount?.toLocaleString() || 0
        } members)\n- Role: *${group.role.name}*`
)}`.trim();

            await clients.sendMessage(
                m.chat,
                {
                    image: { url: avatarHeadshotUrl },
                    caption,
                },
                { quoted: m }
            );
        } catch (error) {
            console.error("Roblox API Error:", error);
            m.reply(
                "Failed to retrieve Roblox profile. Please check if the username/ID/URL is valid."
            );
        }
    },
};
