import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../tokenABI'; // Import your token ABI
import contractABI from '../contractABI'; // Import your staking contract ABI
import moment from 'moment';
import Image from 'next/image';
import { data, contractInfo } from '../data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTwitter, FaTelegram, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";


function Staking() {
    const tokenDecimalPlaces = 18;
    const stakingContractAddress = contractInfo.contractAddress;
    const tokenAddress = contractInfo.tokenAddress;



    const [tokenBalance, setTokenBalance] = useState("...");
    const [rewardBalances, setRewardBalances] = useState("...");
    const [stakeCount, setStakeCount] = useState("...");
    const [selectedAccount, setSelectedAccount] = useState();
    const [stakingInput, setStakingInput] = useState("");
    // const [APY, setAPY] = useState()
    const [dailyPercentage, setDailyPercentage] = useState("2.5%");
    const [duration, setDuration] = useState(0);
    const [withdrawBalance, setWithdrawBalance] = useState();
    const [totalStakedAmount, setTotalStakedAmount] = useState();
    const [remainingStakingDurations, setRemainingStakingDurations] = useState([]);
    const [minInvest, setMinInvest] = useState();
    const [maxInvest, setMaxInvest] = useState();
    const [isStakeButtonDisabled, setIsStakeButtonDisabled] = useState(false);






    useEffect(() => {
        const connectToMetaMask = async () => {
            try {
                if (typeof window.ethereum !== "undefined") {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const accounts = await provider.listAccounts();
                    const selectedAddress = accounts[0];
                    setSelectedAccount(selectedAddress);

                    // Create contract instances
                    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
                    const stakingContract = new ethers.Contract(stakingContractAddress, contractABI, signer);



                    // Fetch and display token balance
                    const balance = await tokenContract.balanceOf(selectedAddress);
                    const tokenBalanceFormatted = ethers.utils.formatUnits(balance, tokenDecimalPlaces);
                    const tokenBalanceFormattedWithDecimal = parseFloat(tokenBalanceFormatted).toFixed(2); // Format to 3 decimal places
                    setTokenBalance(tokenBalanceFormattedWithDecimal);



                    // Fetch Available Withdraw Balance
                    const availableWithdrawals = await stakingContract.getTotalMaturedBalance(selectedAccount);
                    const formattedWithdrawBalance = ethers.utils.formatUnits(availableWithdrawals, tokenDecimalPlaces);
                    const formattedWithdrawBalanceWithDecimal = parseFloat(formattedWithdrawBalance).toFixed(2); // Format to 4 decimal places
                    setWithdrawBalance(formattedWithdrawBalanceWithDecimal);



                    //Fetch duration
                    const getStakeduration = await stakingContract.getDuration();
                    setDuration(getStakeduration.toString());

                    //Fetch available reward rates
                    const rewardRates = await stakingContract.getDailyPercentageBalance(selectedAddress);
                    const formattedRewardRate = ethers.utils.formatUnits(rewardRates, tokenDecimalPlaces);
                    const formattedRewardRateWith4Decimals = parseFloat(formattedRewardRate).toFixed(2);
                    setRewardBalances(formattedRewardRateWith4Decimals);


                    // Fetch and display stake count
                    const stakeCount = await stakingContract.userStakeCount(selectedAddress);
                    setStakeCount(stakeCount.toString());

                    // Fetch total stake amount
                    const stakeAmount = await stakingContract.stakedAmount(selectedAccount);
                    const formattedTotalStakedAmount = ethers.utils.formatUnits(stakeAmount, tokenDecimalPlaces);
                    setTotalStakedAmount(formattedTotalStakedAmount);


                    // Fetch remaining staking durations
                    const remainingDurations = await stakingContract.totalRemainingStakingDuration(selectedAccount);
                    setRemainingStakingDurations(remainingDurations);

                    // Fetch Minimum Investment
                    const minimumInvestment = await stakingContract.getMinInvestment();
                    const formattedMinimumInvestment = ethers.utils.formatUnits(minimumInvestment, tokenDecimalPlaces);
                    const minimumInvestmentWithCommas = parseFloat(formattedMinimumInvestment).toLocaleString();
                    setMinInvest(minimumInvestmentWithCommas);

                    // Fetch Maximum Investment
                    const maximumInvestment = await stakingContract.getMaxInvestment();
                    const formattedMaximumInvestment = ethers.utils.formatUnits(maximumInvestment, tokenDecimalPlaces);
                    const maximumInvestmentWithCommas = parseFloat(formattedMaximumInvestment).toLocaleString();
                    setMaxInvest(maximumInvestmentWithCommas);





                }
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        };

        connectToMetaMask();
    }, [selectedAccount]);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setStakingInput(inputValue);

        // Check if users entered a valid amount greater than or equal to the minimum investment (100)
        setIsStakeButtonDisabled(isNaN(inputValue) || parseFloat(inputValue) < minInvest || inputValue === '');
    }

    const handleStaking = async (e) => {
        e.preventDefault();
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const parsedInputValue = parseFloat(stakingInput.replace(/,/g, '').trim());
            if (!isNaN(parsedInputValue)) {
                const stakingAmount = ethers.utils.parseUnits(parsedInputValue.toString(), tokenDecimalPlaces);
                const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
                const stakingContract = new ethers.Contract(stakingContractAddress, contractABI, signer);

                // Approve the staking contract to spend tokens
                const approveTx = await tokenContract.approve(stakingContract.address, stakingAmount, { gasLimit: 800000 });
                await approveTx.wait();

                // Stake the tokens
                const stakeTx = await stakingContract.stake(stakingAmount, { gasLimit: 800000 });
                await stakeTx.wait();

                // Update user information after staking
                const balance = await tokenContract.balanceOf(selectedAccount);
                const tokenBalanceFormatted = ethers.utils.formatUnits(balance, tokenDecimalPlaces);
                setTokenBalance(tokenBalanceFormatted);

                // Show success message
                toast.success("Staking successful");

                const rewardBalances = await stakingContract.getAvailableRewards(selectedAccount);
                const formattedRewardBalance = ethers.utils.formatUnits(rewardBalances);
                setRewardBalances(formattedRewardBalance);

                const stakeCount = await stakingContract.userStakeCount(selectedAccount);
                setStakeCount(stakeCount.toString());

                // Clear the input field
                setStakingInput("");
            } else {
                console.log('Invalid input value. Please enter a valid number.');
            }
        } catch (error) {
            console.error('Error staking tokens:', error);
            toast.error("Staking failed. Please try again.");
        }
    }





    const handleClaimReward = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const stakingContract = new ethers.Contract(stakingContractAddress, contractABI, signer);

            // Call the claimReward function
            const claimRewardTx = await stakingContract.claimReward({ gasLimit: 800000 });
            await claimRewardTx.wait();

            // Update the user's reward balance and other relevant information
            const rewardBalances = await stakingContract.getAvailableRewards(selectedAccount);
            const formattedRewardBalance = ethers.utils.formatUnits(rewardBalances);
            setRewardBalances(formattedRewardBalance);

            // Show success message
            toast.success("Reward claimed successfully");

            console.log('Reward claimed successfully');
        } catch (error) {
            console.error('Error claiming reward:', error);
            toast.error("Reward claim failed. Please try again.");
        }
    }


    return (
        <div className='container-fluid parent-layout d-flex'>

            <div className='col-2 side-bar d-none d-md-block'>
                <h5 className='p-2'>Dashboard</h5>
                <ul>
                    <li> <Image src="/newage.jpeg"
                        className='m-2'
                        alt="newwageNation"
                        width={32}
                        height={32} />
                        <a href="http://newagenations.network/">NewageNation</a>
                    </li>
                    <li> <Image src="/forgedmoney.png"
                        className='m-2'
                        alt="forgedMoney"
                        width={32}
                        height={32} />
                        <a href="http://www.forged.money/">ForgedMoney</a>
                    </li>
                    <li><Image src="/sommoney.png"
                        className='m-2'
                        alt="sommoney"
                        width={32}
                        height={32} />SomMoney </li>
                    <li><Image
                        src="/protocol.png"
                        className='m-2'
                        alt="protocol"
                        width={32}
                        height={32} /> <a href="http://protocolbank.money/">ProtocolBank</a>
                    </li>
                    <li><Image
                        src="/ht.png"
                        className='m-2'
                        alt="protocol"
                        width={32}
                        height={32} /> <a href="http://www.hvts.network/">HVTS Network</a>
                    </li>
                </ul>

                <div className="bottom-icon-container">
                    <a href="https://twitter.com/newagenations" target='_blank'><FaTwitter className="bottom-icon text-white" /></a>
                    <a href="https://t.me/newagenations" target='_blank'><FaTelegram className="bottom-icon text-white" /></a>
                    <a href="https://facebook.com/newagenations" target='_blank'><FaFacebook className="bottom-icon text-white" /></a>
                    <a href="https://instagram.com/newagenations" target='_blank'><FaInstagram className="bottom-icon text-white" /></a>
                    <a href="https://www.youtube.com/@NewAgeNations-fe8vg" target='_blank'><FaYoutube className="bottom-icon text-white" /></a>





                </div>
            </div>

            <div className='container col-md-10'>
                <header className='text-white d-flex p-3 align-items-center'>
                    <p>
                        Earn passively with Newage staking Dapp <br /> stake your token for
                        a period of 10 months and get 2.5% daily returns{' '}
                    </p>
                </header>

                <div className='mt-2 price-action'>
                    <p className='text-center text-danger'>{data.betaInfo}</p>
                    <div className='d-flex flex-wrap '>
                        <div className='flex-grow-1 p-2 border-style'>
                            NAC Balance
                            <p className='text-center'>{tokenBalance}</p>
                        </div>
                        <div className='flex-grow-1 p-2 border-style'>
                            Daily Reward
                            <p className='text-center'>{dailyPercentage}</p>
                        </div>
                        <div className='flex-grow-1 p-2 border-style'>
                            Stake count
                            <p className='text-center'>{stakeCount}</p>
                            <a href="http://">Transaction history</a>
                        </div>

                    </div>

                </div>

                <div className='row mt-4' >
                    <div className='col-md-6 tx-area' >
                        <p>Min: {minInvest} NAC</p>
                        <p>Max: {maxInvest} NAC</p>

                        <input onChange={handleChange} className='staking-input col-12' type='text' inputmode='numeric' placeholder='Amount' />
                        <button
                            onClick={handleStaking}
                            className='staking-btn btn btn-primary col-12'
                            disabled={isStakeButtonDisabled}
                        >
                            {isStakeButtonDisabled ? 'Pls enter Min Amount' : 'STAKE'}
                        </button>



                        <div className='mt-5'>
                            <p className='col-12'>Available Rewards: {rewardBalances} NAC</p>
                            <button onClick={handleClaimReward} className='btn btn-success'>CLAIM REWARD</button>
                        </div>
                    </div>

                    <div className='col-md-6 d-flex flex-column align-items-center'>
                        <div className='card d-flex w-100 w-md-auto'>
                            <p>Stake amount:</p>
                            <p>{totalStakedAmount} NAC</p>
                        </div>
                        <div className='card d-flex w-100 w-md-auto'>
                            <p>Lock Period:</p>
                            <p>{moment.duration(duration, 'seconds').humanize()}</p>
                        </div>
                        <div className='card d-flex w-100 w-md-auto'>
                            <p>Available Reward:</p>
                            <p>{rewardBalances} NAC</p>
                        </div>
                    </div>
                    <div className='mt-4 table-container'>
                        <h4>Running Staking</h4>
                        <div className='table-responsive'>
                            <table className="table table-striped custom-table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Start</th>
                                        <th scope="col">End</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {remainingStakingDurations.length === 0 ? (
                                        <tr>
                                            <td colSpan="4">No running stakiing</td>
                                        </tr>
                                    ) : (
                                        remainingStakingDurations
                                            .filter(stakeInfo => parseInt(stakeInfo.remainingDuration._hex, 16) !== 0)
                                            .map((stakeInfo, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{parseFloat(ethers.utils.formatUnits(stakeInfo.amount, tokenDecimalPlaces)).toFixed(0)}</td>
                                                    <td>{moment.unix(parseInt(stakeInfo.startTime._hex, 16)).fromNow(true)}</td>
                                                    <td>{moment.duration(parseInt(stakeInfo.remainingDuration._hex, 16), 'seconds').humanize()}</td>
                                                </tr>
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>




            </div>

            <ToastContainer />
        </div>
    );
}

export default Staking;
