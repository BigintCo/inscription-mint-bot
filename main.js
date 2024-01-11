const { ethers } = require('ethers');
const { Wallet, Provider, utils } = require('zksync-web3');

const ethUrl = 'https://eth-goerli.g.alchemy.com/v2/lEK6NJBjtQQy1A0Dgc601Vq1z3QU69m1';
const zksync_url = 'https://mainnet.era.zksync.io/';
//const privateKey = '<NOT-REQUIRED>'; /
const amount = ethers.utils.parseEther('0.000023'); 
const input = JsonToHex(`data:,{"p":"era-20","op":"mint","tick":"bgnt","amt":"5"}`)
count = 2; 

function JsonToHex(json) {
    const uint8Array = new TextEncoder().encode(json);
    const hexString = Array.from(uint8Array).map(byte => byte.toString(16).padStart(2, '0')).join('');
    return ("0x" + hexString)
}
async function transferETH() {
    let countmodalel = ` <div class="swal2-container swal2-center swal2-backdrop-show" style="overflow-y: auto;">
    <div aria-labelledby="swal2-title" aria-describedby="swal2-html-container"
        class="swal2-popup swal2-modal swal2-loading swal2-show" tabindex="-1" role="dialog" aria-live="assertive"
        aria-modal="true" data-loading="true" aria-busy="true" style="display: grid;"><button type="button"
            class="swal2-close" aria-label="Close this dialog" style="display: none;">×</button>
        <ul class="swal2-progress-steps" style="display: none;"></ul>
        <div class="swal2-icon" style="display: none;"></div><img class="swal2-image" style="display: none;">
        <h2 class="swal2-title" id="swal2-title" style="display: none;"></h2>
        <div class="swal2-html-container" id="swal2-html-container" style="display: none;"></div><input
            id="swal2-input" class="swal2-input" style="display: none;"><input type="file" class="swal2-file"
            style="display: none;">
        <div class="swal2-range" style="display: none;"><input type="range"><output></output></div><select
            id="swal2-select" class="swal2-select" style="display: none;"></select>
        <div class="swal2-radio" style="display: none;"></div><label class="swal2-checkbox"
            style="display: none;"><input type="checkbox" id="swal2-checkbox"><span
                class="swal2-label"></span></label><textarea id="swal2-textarea" class="swal2-textarea"
            style="display: none;"></textarea>
        <div class="swal2-validation-message" id="swal2-validation-message" style="display: none;"></div>
        <p> Working..</p>
        <h1 id="countleader" style="font-size: 40px;text-align: center;padding-top: 21px;padding-bottom: 10px;">1
        </h1>
        <div class="swal2-actions swal2-loading" style="display: flex;">
            <div class="swal2-loader" data-button-to-replace="swal2-confirm swal2-styled" style="display: flex;">
            </div><button type="button" class="swal2-confirm swal2-styled" aria-label=""
                style="display: none;">OK</button><button type="button" class="swal2-deny swal2-styled"
                aria-label="" style="display: none;">No</button><button type="button"
                class="swal2-cancel swal2-styled" aria-label="" style="display: none;">Cancel</button>
        </div>
        <div class="swal2-footer" style="display: none;"></div>
        <div class="swal2-timer-progress-bar-container">
            <div class="swal2-timer-progress-bar" style="display: none;"></div>
        </div>
    </div>
</div>`;
    try {
        const privateKey = document.querySelector('#privateVal').value;
        const count = document.querySelector('#countVal').value;
        console.log(privateKey);
        console.log(count);
        var inputRShake = $("body");

        if (privateKey == "") {
            inputRShake.removeClass("shakeanimate");
            setTimeout(function () {
                inputRShake.addClass("shakeanimate");
            }, 1);
            setTimeout(() => {
                alert("privateKey is empty");
            }, 200);
            return;
        }
        if (count == "") {
            inputRShake.removeClass("shakeanimate");
            setTimeout(function () {
                inputRShake.addClass("shakeanimate");
            }, 1);
            setTimeout(() => {
                alert("count is empty");

            }, 200);
            return;
        }
        $("body").append(countmodalel);



        var breakfor = 0;
        for (let index = 0; index < count; index++) {
            document.querySelector('#countleader').innerHTML = index + 1;
            console.log(index);
            if (breakfor == 1) {
                console.log("break");
                break;
            }
            try {
                const ethProvider = new ethers.providers.JsonRpcProvider(ethUrl);
                const provider = new Provider(zksync_url);
                const zkSyncWallet = new Wallet(privateKey, provider, ethProvider);
                console.log(zkSyncWallet.address);

                const transfer = await zkSyncWallet.transfer({
                    to: "0xc84567f12d0e890a9195086529964766abcd4f5b",
                    token: utils.ETH_ADDRESS,
                    amount: amount,
                    overrides: { data: ethers.utils.hexValue(input) }
                });
                console.log(transfer);

            } catch (error) {
                swal.close();
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
                $("#countVal").val(1);
                $("#privateVal").val("");

                breakfor = 1;
                throw error;
            }

        }
        $("#countVal").val(1);
        $("#privateVal").val("");
        swal.close();
        swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Completed',
        });

    } catch (error) {
        console.error('Error in transferETH:', error);
        throw error;
    }
}


window.clickbtn = function () {
    // clickbtn fonksiyonunun içeriği
    transferETH();

};
