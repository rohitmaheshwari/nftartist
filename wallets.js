var account;

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    checkIfWCWalletIsConnect();
    checkIfWalletIsConnect();
});

//  Create WalletConnect Provider
var provider = new WalletConnectProvider.default({
    rpc: {
        1: "https://ethereum.mycustomnode.com",
        // // 3: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        4: "https://rinkeby.mycustomnode.com",
        100: "https://dai.poa.network",
        // // ...
        // infuraId: "27e484dcd9e3efcfd25a83a78777cdf1"
    },
});

connectWC = async () => {
    //  Enable session (triggers QR Code modal)
    await provider.enable();

    // Create Web3 instance
    const web3 = new Web3(provider);
    window.w3 = web3;

    var accounts = await web3.eth.getAccounts();
    // if (accounts.length) {
    document.getElementById("login").classList.add("hidden");
    account = accounts[0];
    showAccount.value = account;

    localStorage.setItem('flag', true);

    console.log(account);
    // }
}

const checkIfWCWalletIsConnect = async () => {
    // console.log(JSON.parse(localStorage.getItem('walletconnect')).connected);
    if (JSON.parse(localStorage.getItem('walletconnect')).connected) {
        await provider.enable();

        const web3 = new Web3(provider);
        window.w3 = web3;

        var accounts = await web3.eth.getAccounts();
        document.getElementById("login").classList.add("hidden");
        account = accounts[0];
        showAccount.value = account;

        console.log(account);
    }
}

disconnect = async () => {
    // Close provider session
    await provider.disconnect();

    await window.ethereum.disconnect();

    account = "";
    showAccount.value = account;
}

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('#field_3');

ethereumButton.addEventListener('click', () => {
    getAccount();
});

async function getAccount() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        document.getElementById("login").classList.add("hidden");
        const account = accounts[0];
        showAccount.value = account;
    }
}

const checkIfWalletIsConnect = async () => {
    try {
        if (!window.ethereum) return alert("Please install MetaMask.");

        const accounts = await ethereum.request({ method: "eth_accounts" });
        account = accounts[0];

        if (accounts.length) {
            // console.log(accounts[0].length);
            document.getElementById("login").classList.add("hidden");
            showAccount.value = accounts[0];
        }
        else {
            console.log("No accounts found");
            // document.getElementById("logout").classList.add("hidden");
        }
    } catch (error) {
        console.log(error);
    }
};